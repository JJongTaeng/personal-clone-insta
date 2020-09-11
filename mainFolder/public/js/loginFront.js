window.addEventListener('load', ()=>{
  loadFile();
})
async function loadFile() {
  const sendData = document.querySelector('.login-input');
  sendData.addEventListener('submit', async (e)=>{
    e.preventDefault();
    id = e.target.id.value;
    password = e.target.password.value;
    console.log(id, password);
    const login = await axios.post('/login', { id, password });

    if(login.data.startsWith('success')){
      location.href="/main";
    } else {
      console.log(login.data);
      alert('아이디 / 비밀번호를 확인해주세요.');
      location.href="/";
    }
  });
}
