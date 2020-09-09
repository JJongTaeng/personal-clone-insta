const checkLog = console.log;
const express = require('express');
const path = require('path');
const mysql = require('mysql');
const fs = require('fs').promises;
const session = require('express-session');
const { response } = require('express');
const FileStore = require('session-file-store')(session);
const app = new express();
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(session({
  secret: 'akdfhasdjflj!@#!@@@', // 노출되어서 안되는 꼭 넣어야하는 옵션
  resave: false, // false로 두기
  saveUninitialized: true,  // 세션이 필요하기 전까지 구동하지 않는다! (기본적으로 true)
  store: new FileStore(),
}));

const db = mysql.createConnection({
  hosts: 'localhost',
  user: 'root',
  password: '',
  database: 'instagram'
});
// DB연결
db.connect();



app.get('/', async (req, res)=>{
  const data = await fs.readFile('./public/html/login.html');
  req.session.is_logined = false;
  res.end(data);
});
app.get('/signup', async (req, res)=>{
  const data = await fs.readFile('./public/html/signup.html');
  res.end(data);
})
app.get('/main', async (req, res, next)=>{
  try{
    if(req.session.idname){
      const data = await fs.readFile('./public/html/main.html');
      return res.end(data);
    } else{
      res.redirect('/');
    }
  } catch(err) {
    console.error(err);
    res.redirect('/')
  }
});
app.get('/main_data', async (req, res)=>{
  const user_data = {
    id: req.session.idname,
    name: req.session.realname,
    nick: req.session.nickname,
    images: {},
  };
  let index;
  db.query(`select * from post where id = '${user_data.id}'`,async (err, data)=>{
    if(data.length===0){
      return res.end(JSON.stringify(user_data));
    }
    for(let i=0; i<data.length; i++) {
      // console.log(i);
      const imageLink = await fs.readdir(`./public/${data[i].post_id}`);
      user_data.profile = await fs.readdir(`./public/${user_data.id}`);
      console.log(user_data.profile);
      index = data[i].post_id;
      console.log(index);
      user_data.images[index] = Array.from(imageLink);
      if(i === data.length-1){
        user_data.post = data;
        return res.end(JSON.stringify(user_data));
      }
    }
  })
})
app.get('/logout', async (req, res)=>{
  await req.session.destroy((err)=>{
    return res.end('logout');
  });
})

app.post('/login', async (req, res)=>{
  const user = req.body;
  db.query(`select * from user`, (err, data)=> {
    for(let i =0; i<data.length; i++){
      if(data[i].id === user.id && data[i].password === user.password){
        req.session.is_logined = true;
        req.session.idname = user.id;
        req.session.nickname = data[i].nickname;
        req.session.realname = data[i].name;   
        req.session.save(()=>{
          return res.end('success');
        })
      }
    }
    console.log(req.session.is_logined);
    if(!req.session.is_logined) {
      console.log('fail')
      return res.end('fail');
    }
  });

});
app.post('/signup_process', (req, res)=> {
  const user = req.body;
  db.query(`insert into user (id, password, nickname, name) values ('${user.id}', '${user.password}', '${user.nickname}', '${user.name}');`,(err, data)=>{
    if(err){
      res.send('회원가입 실패 - 다시해주십시오');
    }
    res.redirect('/');
  })

})
app.listen(3000,()=>console.log('3000 포트 대기'))
