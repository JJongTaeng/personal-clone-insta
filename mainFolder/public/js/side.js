const followBtn = document.querySelectorAll(".follow_button");
let isFollow = [false,false,false,false,false,];

for(let x = 0; x < 5; x++){
  followBtn[x].addEventListener("click", () => {
    if(!isFollow[x]){
      followBtn[x].innerHTML = '팔로잉';
      isFollow[x] = true;
    } else {
      followBtn[x].innerHTML = '팔로우';
      isFollow[x] = false;
    }
  });
}   
