const logoutBtn = document.querySelector('.logout');

logoutBtn.addEventListener('click', async () => {
  const logout = await axios.get('/logout');
  console.log(logout)
  if (logout.data.startsWith('logout')) {
    location.href = "/";
  }
})
window.addEventListener('load', async () => {
  const main = await axios.get('/main_data');
  const userInfo = document.querySelector('.side_user_info')
  const slideSticker = document.querySelector('#sticker');
  let slide_text;
  console.log(main.data);
  // 우측 사이드 프로필
  userInfo.children[0].innerHTML = main.data.nick;
  userInfo.children[1].innerHTML = main.data.name;
  // document.querySelector('.side_img').setAttribute('src', `./${main.data.id}/${main.data.profile[0]}`);
  if(main.data.profile.length !==0){
    document.querySelector('.profile-image-label').style.backgroundImage = `url('../data/${main.data.id}/${main.data.profile[0]}')`
  }
  const slideHTML = await fetch('../lib/slide');
  if (slideHTML.status === 200) {
    slide_text = await slideHTML.text();
  };
  // 게시물이 한개 이상일때 실행
  if (main.data.post.length !== 0) {

    for (let i = 0; i < main.data.post.length; i++) {
      slideSticker.innerHTML += slide_text;
    }

    // 게시물 별 이미지 개수에 따른 li 설정
    const postWhole = document.querySelectorAll('.post-whole');
    let z = Object.keys(main.data.images).length - 1;
    for (const liList in main.data.images) {
      for (let i = 0; i < main.data.images[liList].length; i++) {
        const li = document.createElement('li');
        li.className = 'slide-item';
        postWhole[z].children[1].firstElementChild.firstElementChild.appendChild(li);
      }
      z--;
    }

    // slide-item에 이미지 설정
    let img_index = Object.keys(main.data.images).length - 1;
    for (const imgList in main.data.images) {
      for (let i = 0; i < main.data.images[imgList].length; i++) {
        postWhole[img_index].children[1].firstElementChild.firstElementChild.children[i].style.backgroundImage = `url('../data/${imgList}/${main.data.images[imgList][i]}')`;
      }
      img_index--;
    }

    // 게시물 별로 프로필 이미지 및 아이디 설정 // 게시물 별로 postContent 설정
    const postHeaderId = {};
    const postHeaderImage = {};
    const postContentId = {};
    const postContentText = {};
    const postContentDate = {};
    for (let i = 0; i < postWhole.length; i++) {
      postWhole[i].id = `${main.data.post[(postWhole.length - 1) - i].id}-${main.data.post[(postWhole.length - 1) - i].post_id}`;    // 삭제및 수정 기능구현을 위한 각 게시판별로 사용자 아이디와 연결
      postHeaderId[i] = postWhole[i].children[0].children[1].children[0]
      postHeaderId[i].innerHTML = main.data.post[(postWhole.length - 1) - i].nickname;
      postContentId[i] = postWhole[i].children[3].children[0];
      postContentId[i].innerHTML = main.data.post[(postWhole.length - 1) - i].nickname;
      postContentText[i] = postWhole[i].children[3].children[1];
      postContentText[i].innerHTML = main.data.post[(postWhole.length - 1) - i].content;
      postContentDate[i] = postWhole[i].children[3].children[3];
      postContentDate[i].innerHTML = main.data.post[(postWhole.length - 1) - i].upload_date.split('T')[0];
      postHeaderImage[i] = postWhole[i].children[0].children[0].children[0];
      postHeaderImage[i].style.backgroundImage = `url('../data/${main.data.post[(postWhole.length - 1) - i].id}/${main.data.profile[0]}')`
    }

    // comment Read 설정 쓰기 설정
    const commentData = await axios.get('/comment_data');
    console.log(commentData.data);
    const commentHTML = await fetch('../lib/comment');
    const postCommentUlTag = {};
    const postCommentInputTag = {};
    let commentIndex = 0;
    let comment_text;
    if (slideHTML.status === 200) {
      comment_text = await commentHTML.text();
    };
    for (let i = 0; i < postWhole.length; i++) {
      postCommentUlTag[i] = postWhole[i].children[4].children[1]
      postCommentInputTag[i] = postWhole[i].children[4].children[2].children[0];
      postCommentInputTag[i].value = main.data.post[(postWhole.length - 1) - i].post_id;  // 가려진 input태그로 post_id전송
      for (let j = 0; j < commentData.data.length; j++) {
        if (postWhole[i].id.split('-')[1] == commentData.data[j].post_id) {
          postCommentUlTag[i].innerHTML += comment_text;
          postCommentUlTag[i].children[commentIndex].children[0].innerHTML = commentData.data[j].nickname;
          postCommentUlTag[i].children[commentIndex].children[1].innerHTML = commentData.data[j].comment;
          postCommentUlTag[i].children[commentIndex].children[2].innerHTML = commentData.data[j].upload_date.split('T')[0];
          commentIndex++;
        };
      }
      commentIndex = 0;
    }

    // 스토리 설정
    const storyHTML = await fetch('../lib/story');
    const storyLeftButton = document.createElement('input');
    const storyRightButton = document.createElement('input');
    const storyBox = document.querySelector('.box');
    storyLeftButton.value = '‹'
    storyRightButton.value = '›'
    storyLeftButton.setAttribute('type', 'button');
    storyRightButton.setAttribute('type', 'button');
    storyLeftButton.className = 'story-switch story-switch-left';
    storyRightButton.className = 'story-switch story-switch-right';

    let storyText;

    // storyBox.appendChild(storyLeftButton);

    if (storyHTML.status === 200) {
      storyText = await storyHTML.text();
    }
    for (let i = 0; i < postWhole.length; i++) {
      storyBox.innerHTML += storyText;
    }
    const storyProfile = document.querySelectorAll('.itembox');
    for (let i = 0; i < postWhole.length; i++) {
      storyProfile[i].children[0].children[0].setAttribute('src', `../data/${main.data.post[(postWhole.length - 1) - i].id}/${main.data.profile[0]}`)
      storyProfile[i].children[0].setAttribute('href', `#${postWhole[i].id}`)
      storyProfile[i].children[1].innerHTML = `${main.data.post[(postWhole.length - 1) - i].nickname}`;
    }
    storyBox.insertBefore(storyLeftButton, storyBox.firstChild);
    storyBox.appendChild(storyRightButton);
    // story.js 내용
    //window DOM 객체
    const storyRightBtn = document.querySelector(".story-switch-right");
    const storyLeftBtn = document.querySelector(".story-switch-left");
    let j = 0;
    storyRightBtn.addEventListener("click", () => {
      j = 0;
      const time = setInterval(() => {
        storyBox.scrollLeft += 10;
        if (j === 20) clearInterval(time);
        j++;
      }, 5);
    });

    storyLeftBtn.addEventListener("click", () => {
      j = 0;
      const time = setInterval(() => {
        storyBox.scrollLeft -= 10;
        if (j === 20) clearInterval(time);
        j++;
      }, 5);
    });

    // slide.js 내용 이동
    const LslideSwitch = document.querySelectorAll('.slide-switch-left');
    const RslideSwitch = document.querySelectorAll('.slide-switch-right');
    const allPost = {};
    let slideLength = {};
    let slideIndex = {};
    const container = document.querySelector(".container");
    let containerWidth = container.clientWidth;

    for (let i = 0; i < postWhole.length; i++) {
      allPost[i] = postWhole[i].children[1].firstElementChild.firstElementChild;
      slideLength[i] = allPost[i].children.length;
      allPost[i].style.left = `0px`;
      allPost[i].style.width = (containerWidth * slideLength[i]) + 'px';
      slideIndex[i] = 0;

      LslideSwitch[i].addEventListener('click', () => {
        if (slideIndex[i] === 0) return;
        slideIndex[i]--;
        allPost[i].style.left = -(containerWidth * slideIndex[i]) + 'px';
      })
      RslideSwitch[i].addEventListener('click', () => {
        if (slideIndex[i] === slideLength[i] - 1) return;
        allPost[i].style.left = -(containerWidth * (slideIndex[i] + 1)) + 'px';
        slideIndex[i]++;
      })
    }
    window.addEventListener('resize', () => {
      containerWidth = container.clientWidth;
      for (let i = 0; i < postWhole.length; i++) {
        allPost[i].style.width = `${containerWidth * slideLength[i]}px`;
        allPost[i].style.left = `0px`;
        slideIndex[i] = 0;
      }
    });

    // 모달 동작 -> map으로 키밸류로 만들어서 각 버튼마다 post_id를 주면될듯..
    const modalSVG = {};
    for (let i = 0; i < postWhole.length; i++) {
      modalSVG[i] = postWhole[i].children[0].children[2].children[0];
    }
    const modal_container = document.querySelector('.modal-container');
    const userModal_container = document.querySelector('.userModal-container');
    const cancelModalHandler = (e) => {
      if (e.target.className === `modal-container` || e.target.className === `modal-menu cancle`) {
        modal_container.style.display = `none`;
      } else if (e.target.className === `userModal-container` || e.target.className === `userModal-menu cancle`) {
        userModal_container.style.display = `none`;
      }
    }
    for (let i = 0; i < postWhole.length; i++) {
      modalSVG[i].addEventListener('click', async (e) => {
        let userPostId = e.currentTarget.parentNode.parentNode.parentNode.id.split('-');
        await axios.post('/delete', { userPostId });
        if (userPostId[0] === main.data.id) {
          userModal_container.style.display = 'flex';
        } else {
          modal_container.style.display = `flex`;
        }
      });
    }
    // 게시글 삭제
    const deletePost = document.querySelector('#delete-post');
    deletePost.addEventListener('click', async () => {
      await axios.post('delete_process');
      location.reload(true);
    })

    modal_container.addEventListener('click', cancelModalHandler);
    userModal_container.addEventListener('click', cancelModalHandler);

    // 좋아요, 북마크, 내용 더보기 스크립트 -> map으로 사용해서 key value쌍으로 post_id부여
    const postLikes = {};

    for (let i = 0; i < postWhole.length; i++) {
      postLikes[i] = postWhole[i].children[2].children[0].children[0];
      postLikes[i].addEventListener('click', async () => {
        if (postLikes[i].getAttribute('fill') === '#262626') {
          const likePostID = postWhole[i].id.split('-')[1];
          await axios.post('/add_like', {likePostID});
          postLikes[i].setAttribute('fill', '#ed4956')
          postLikes[i].firstElementChild.setAttribute('d', "M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z");
        } else {
          const likePostID = postWhole[i].id.split('-')[1];
          await axios.post('/cancel_like', {likePostID});
          postLikes[i].setAttribute('fill', '#262626')
          postLikes[i].firstElementChild.setAttribute('d', "M34.6 6.1c5.7 0 10.4 5.2 10.4 11.5 0 6.8-5.9 11-11.5 16S25 41.3 24 41.9c-1.1-.7-4.7-4-9.5-8.3-5.7-5-11.5-9.2-11.5-16C3 11.3 7.7 6.1 13.4 6.1c4.2 0 6.5 2 8.1 4.3 1.9 2.6 2.2 3.9 2.5 3.9.3 0 .6-1.3 2.5-3.9 1.6-2.3 3.9-4.3 8.1-4.3m0-3c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5.6 0 1.1-.2 1.6-.5 1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z")

        }
      })
    }
    const likeData = await axios.get('/like_process');
    console.log(likeData.data);
    let likeCount = 0;
    for(let i=0; i<postWhole.length; i++){
      for(let j=0; j<likeData.data.data1.length; j++){
        if(postWhole[i].id.split('-')[1] == likeData.data.data1[j].post_id) {
          postLikes[i].setAttribute('fill', '#ed4956')
          postLikes[i].firstElementChild.setAttribute('d', "M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z");
        }
      }
    }
    for(let i=0; i<postWhole.length; i++){
      for(let j=0; j<likeData.data.data2.length; j++){
        if(postWhole[i].id.split('-')[1] == likeData.data.data2[j].post_id) {
          likeCount++;
          postWhole[i].children[2].children[0].children[1].innerHTML = `${likeCount}명`;
        }
      }
      likeCount = 0;
    }

  }
  // 게시글 작성 모달
  const insertBox = document.querySelector('.insert-box');
  const insertButton = document.querySelector('.insert-button');
  let isView = false;
  insertButton.addEventListener('click', (e) => {
    if (!isView) {
      insertBox.style.display = "flex";
      isView = true;
    } else {
      insertBox.style.display = "none";
      isView = false;
    }
  })
  insertBox.addEventListener('click', (e) => {
    if (e.target.className === 'insert-box') {
      insertBox.style.display = "none";
      isView = false;
    }
  })
});