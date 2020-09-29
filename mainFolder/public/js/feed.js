// const feedList = document.querySelector('.feed-list');
//         const feedSlideList = document.querySelector('.feed-slide-list');
//         const feedSlideContainer = document.querySelector('.feed-slide-container');
//         const feedSlideItems = document.querySelectorAll('.feed-slide-items');
//         const feedPostModalContainer = document.querySelector('.feed-post-modal-container');
//         const getTarget = (elem, className)=>{
//             while(!elem.classList.contains(className)){
//                 elem = elem.parentNode;
//                 if(elem.nodeName == 'BODY'){
//                     elem = null;
//                     return;
//                 }
//             }
//             return elem;
//         }
//         feedList.addEventListener('click', (e)=>{
//             const feedItem = getTarget(e.target, 'feed-items')
//             console.log(e.target)

//             if(feedItem){
//                 feedPostModalContainer.style.opacity= '1';
//                 feedPostModalContainer.style.zIndex=20;
//             }
//         })
//         feedSlideListWidth = feedSlideContainer.clientWidth * feedSlideItems.length;
//         feedSlideList.style.width = `${feedSlideListWidth}px`
//         feedSlideList.style.left =0;
//         let listIndex = 0;
//         feedPostModalContainer.addEventListener('click', (e)=>{
//             const leftButton = getTarget(e.target, 'feed-slide-switch-left');
//             const rightButton = getTarget(e.target, 'feed-slide-switch-right');
//             const modalBox = getTarget(e.target, 'feed-post-modal-container');
//             const slideBox = getTarget(e.target, 'feed-slide-container');
//             const rightBox = getTarget(e.target, 'feed-post-right-section');
//             if(leftButton){

//                 if(listIndex === 0){
//                     return;
//                 }
//                 listIndex--;
//                 feedSlideList.style.left = `-${feedSlideContainer.clientWidth * listIndex}px`
//                 console.log(feedSlideList.style.left)
//             } else if(rightButton) {
//                 if(listIndex === feedSlideItems.length-1){
//                     return;
//                 }
//                 listIndex++;
//                 console.log(listIndex);
//                 feedSlideList.style.left = `-${feedSlideContainer.clientWidth * listIndex}px`
//                 console.log(feedSlideList.style.left)
//             } else if(rightBox){
//             }else if(slideBox){
//             }else if(modalBox){
//                 console.log( modalBox.style.opacity)
//                 modalBox.style.opacity='0';
//                 feedPostModalContainer.style.zIndex=0;
//             }
//         })
//         window.addEventListener('resize',()=>{
//             feedSlideListWidth = feedSlideContainer.clientWidth * feedSlideItems.length;
//             feedSlideList.style.width = `${feedSlideListWidth}px`
//             feedSlideList.style.left = 0;
//             listIndex=0;
//         })