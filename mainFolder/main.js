const checkLog = console.log;
const express = require('express');
const path = require('path');
const mysql = require('mysql');
var multer  = require('multer')
const fs = require('fs').promises;
const fs2 = require('fs');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const app = new express();
let postImageLink;
let profileImageLink;
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
app.use((req, res, next)=>{
  db.query(`select * from post order by post_id desc limit 1;`, async (err, data)=>{
    if(data.length ===0){
      req.postImageLink = 1;
      postImageLink= req.postImageLink;
      profileImageLink = req.session.idname;
    } else {
      req.postImageLink = data[0].post_id + 1;
      postImageLink= req.postImageLink;
      profileImageLink = req.session.idname;
    }
    next();
  });
});
app.get('/error', async (req, res)=>{
  const data = await fs.readFile('./public/html/error.html');
  res.end(data);
});
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
    post: [],
  };
  let index;
  db.query(`select post.post_id, id, nickname, content, upload_date from post left join post_content on post.post_id = post_content.post_id where id in (select following_id from following where id ="${user_data.id}");`,async (err, data)=>{
    if(data.length===0){
      user_data.profile = await fs.readdir(`./public/${user_data.id}`);
      return res.end(JSON.stringify(user_data));
    }
    for(let i=0; i<data.length; i++) {
      // console.log(i);
      const imageLink = await fs.readdir(`./public/${data[i].post_id}`);
      user_data.profile = await fs.readdir(`./public/${user_data.id}`);
      index = data[i].post_id;
      user_data.images[index] = Array.from(imageLink);
      if(i === data.length-1){
        user_data.post = data;
        return res.end(JSON.stringify(user_data));
      }
    }
  })
})
app.get('/search', async (req, res, next)=>{
  try{
    db.query(`select user.id, nickname, following_id from user left join following on following.id = '${req.session.idname}' and user.id = following.following_id where not user.id='${req.session.idname}' and (user.id like '%${req.session.searchData.search_text}%' or user.nickname like '%${req.session.searchData.search_text}%')`,(err,data)=>{
      if(err) next(new Error('검색오류'));
      return res.end(JSON.stringify(data));
    })
  } catch(err) {
    next(new Error('검색오류'));
  }
  
})
app.get('/logout', async (req, res)=>{
  await req.session.destroy((err)=>{
    return res.end('logout');
  });
})

app.post('/login', async (req, res)=>{
  const user = req.body;
  let isLogin = false;
  db.query(`select * from user`, (err, data)=> {
    for(let i =0; i<data.length; i++){
      if(data[i].id === user.id && data[i].password === user.password){
        isLogin = true;
        req.session.is_logined = true;
        req.session.idname = user.id;
        req.session.nickname = data[i].nickname;
        req.session.realname = data[i].name;   
        req.session.save(()=>{
        })
      }
    }
    if(!isLogin) {
      return res.end('fail');
    } else {
      return res.end('success');
    }
  });
});
app.post('/signup_process', (req, res, next)=> {
  const user = req.body;
  db.query(`insert into user (id, password, nickname, name) values ('${user.id}', '${user.password}', '${user.nickname}', '${user.name}');`,(err1, data1)=>{
    if(err1){
      next(new Error('아이디가 중복됩니다.'));
    } else {

      db.query(`insert into following values ('${user.id}','${user.id}')`, (err2, data2)=>{
        if(err2){
          next(new Error('아이디가 중복됩니다.'));
        } 
        try{
          fs2.mkdirSync(`./public/${user.id}`);
          res.redirect('/')
        }catch(err){
          next(new Error('아이디가 중복됩니다.'));
        }   
      })
    }
  })
})
let fileIndex =1;
let upload = multer({
  storage: multer.diskStorage({
    destination(req, file, done) {
      done(null, `./public/${postImageLink}`);
    },
    filename(req, file, done) {
      const ext = path.extname(file.originalname);
      done(null, fileIndex++ + ext);
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
});

app.post('/insert', async (req, res, next)=>{
  try {
    fs2.readdirSync(`./public/${req.postImageLink}`);
    
  } catch (error) {
    console.error('uploads 폴더가 없어 uploads 폴더를 생성합니다.');
    fs2.mkdirSync(`./public/${req.postImageLink}`);
  }
  console.log('폴더 생성후 파일 저장하러갑니다!')
  next();
},upload.array('images'), (req, res) => {    
  // console.log(req.files, req.body); 
  fileIndex = 1;
  const body = req.body;
  db.query(`insert into post (post_id, id, nickname) values ('${req.postImageLink}', '${req.session.idname}', '${req.session.nickname}')`, (err, data1)=>{
    db.query(`select * from post order by post_id desc limit 1;`, async(err, data2)=>{
      db.query(`insert into post_content (post_id, content) values ('${data2[0].post_id}', '${body.content}')`, (err, data3)=>{
        res.redirect('/main');   
      })
    })
  });
});
let profile_upload = multer({
  storage: multer.diskStorage({
    destination(req, file, done) {
      done(null, `./public/${profileImageLink}`);
    },
    filename(req, file, done) {
      const ext = '.jpg';
      done(null, 1 + ext);
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
});
app.post('/changeProfile', async (req, res, next)=>{
  try {
    fs2.readdirSync(`./public/${req.session.idname}`);
    
  } catch (error) {
    console.error('uploads 폴더가 없어 uploads 폴더를 생성합니다.');
    fs2.mkdirSync(`./public/${req.session.idname}`);
  }
  console.log('폴더 생성후 파일 저장하러갑니다!')
  next();
},profile_upload.single('profile'), (req, res) => {    
  console.log(req.file, req.body); 
  res.redirect('/main');
});
app.post('/search', async (req, res)=>{
  req.session.searchData = req.body;
  const data = await fs.readFile('./public/html/search.html');
  res.end(data);
})
app.post('/add_following', (req, res, next)=>{
  const user = req.body.followingIndex;
  db.query(`insert into following values ('${req.session.idname}','${user.split('-')[0]}')`, (err, data)=>{
    if(err) next(new Error('팔로잉 실패'));
    return res.end();
  })
})
app.post('/cancel_following', (req, res, next)=>{
  const user = req.body.followingIndex;
  db.query(`delete from following where id='${req.session.idname}' and following_id = '${user.split('-')[0]}'`, (err, data)=>{
    if(err) next(new Error('팔로잉 실패'));
    return res.end();
  })
})
app.post('/delete', (req, res)=>{
  const user = req.body;
  console.log(user)
  req.session.deletePostId = user;
  return res.end();
});
app.post('/delete_process', (req, res)=>{
  console.log(req.session.deletePostId.userPostId[1]);
  db.query(`delete from post where post_id = ${req.session.deletePostId.userPostId[1]}`,async (err, data1)=>{
    db.query(`delete from post_content where post_id = ${req.session.deletePostId.userPostId[1]}`,async (err, data2)=>{
      try{
        const filename = await fs.readdir(`./public/${req.session.deletePostId.userPostId[1]}`);
        for(let i=0; i<filename.length; i++){
          await fs.unlink(`./public/${req.session.deletePostId.userPostId[1]}/${filename[i]}`);
        }
        await fs.rmdir(`./public/${req.session.deletePostId.userPostId[1]}`)
        return res.end();
      }catch {
  
      }
    });
  })
})
app.use((err, req, res, next)=>{
  res.redirect('/error');
})
app.listen(3000,()=>console.log('3000 포트 대기'))
