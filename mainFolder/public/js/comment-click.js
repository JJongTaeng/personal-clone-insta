// const likeBtn = document.querySelector('.like-btn');
// const commentBtn = document.querySelector('.comment-btn');
// const shareBtn = document.querySelector('.share-btn');
// const bookMarkBtn = document.querySelector('.bookmark-btn');
// const viewMore = document.querySelector('.view-more');
// const postContent = document.querySelector('.post-user-content');
// let likeIsFull = false;
// let bookIsFull = false;

// const contentHandler = () => {
//   postContent.style.whiteSpace = "pre-wrap";
//   postContent.style.overflow = "visible";
//   viewMore.style.display ="none";
// }

// const likeHandler = () => {
//   log(likeBtn.firstElementChild);
//   if(!likeIsFull) {
//     likeBtn.setAttribute('fill', '#ed4956')
//     likeBtn.firstElementChild.setAttribute('d',"M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z" )
    
//     likeIsFull = true;
//   } else {
//     likeBtn.setAttribute('fill', '#262626')
//     likeBtn.firstElementChild.setAttribute('d',"M34.6 6.1c5.7 0 10.4 5.2 10.4 11.5 0 6.8-5.9 11-11.5 16S25 41.3 24 41.9c-1.1-.7-4.7-4-9.5-8.3-5.7-5-11.5-9.2-11.5-16C3 11.3 7.7 6.1 13.4 6.1c4.2 0 6.5 2 8.1 4.3 1.9 2.6 2.2 3.9 2.5 3.9.3 0 .6-1.3 2.5-3.9 1.6-2.3 3.9-4.3 8.1-4.3m0-3c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5.6 0 1.1-.2 1.6-.5 1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z" )
//     likeIsFull = false;
//   }
// }
// const bookHandler = () => {
//   if(!bookIsFull) {
//     bookMarkBtn.firstElementChild.setAttribute('d',"M43.5 48c-.4 0-.8-.2-1.1-.4L24 28.9 5.6 47.6c-.4.4-1.1.6-1.6.3-.6-.2-1-.8-1-1.4v-45C3 .7 3.7 0 4.5 0h39c.8 0 1.5.7 1.5 1.5v45c0 .6-.4 1.2-.9 1.4-.2.1-.4.1-.6.1z" )
//     bookIsFull = true;
//   } else {
//     bookMarkBtn.firstElementChild.setAttribute('d',"M43.5 48c-.4 0-.8-.2-1.1-.4L24 29 5.6 47.6c-.4.4-1.1.6-1.6.3-.6-.2-1-.8-1-1.4v-45C3 .7 3.7 0 4.5 0h39c.8 0 1.5.7 1.5 1.5v45c0 .6-.4 1.2-.9 1.4-.2.1-.4.1-.6.1zM24 26c.8 0 1.6.3 2.2.9l15.8 16V3H6v39.9l15.8-16c.6-.6 1.4-.9 2.2-.9z" )
//     bookIsFull = false;
//   }
// }
// bookMarkBtn.addEventListener('click', () => {
//   bookHandler();
// });

// likeBtn.addEventListener('click', ()=> {
//   likeHandler();
// });
// viewMore.addEventListener('click', ()=>{
//   contentHandler();
// })