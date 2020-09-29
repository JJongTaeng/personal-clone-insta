
(async () => {
    let searchAxios
    let searchAxiosData
    searchAxios = await axios.get('/search_data')
    searchAxiosData = await searchAxios.data
    console.log(searchAxiosData);
    const feedList = document.querySelector('.feed-list');
    const feedSlideList = document.querySelector('.feed-slide-list');
    const feedSlideContainer = document.querySelector('.feed-slide-container');
    const rightFeedHeader = document.querySelector('.right-feed-header');
    const rightFeedContents = document.querySelector('.right-feed-contents');
    const hiddenPostID = document.querySelector('.hidden-post-id');
    const rightFeedList = document.querySelector('.right-feed-list');
    const likeButton = document.querySelector('.like-btn')
    let feedSlideItems
    let feedSlideListWidth;
    const getTarget = (elem, className) => {
        while (!elem.classList.contains(className)) {
            elem = elem.parentNode;
            if (elem.nodeName == 'BODY') {
                elem = null;
                return;
            }
        }
        return elem;
    }
    for (let i = 0; i < searchAxiosData.post.length; i++) {
        const feedItems = document.createElement('li');
        feedItems.dataset.nickname = searchAxiosData.post[i].nickname;
        feedItems.dataset.content = searchAxiosData.post[i].content;
        feedItems.dataset.post_id = searchAxiosData.post[i].post_id;
        feedItems.dataset.id = searchAxiosData.post[i].id;
        feedItems.dataset.date = searchAxiosData.post[i].upload_date.split('T')[0];
        feedItems.dataset.number = i;
        feedItems.className = 'feed-items'
        feedList.appendChild(feedItems)
        feedItems.style.backgroundImage = `url('../data/${searchAxiosData.post[i].post_id}/1.jpg')`
    }
    feedList.addEventListener('click', async (e) => {
        const feedItem = getTarget(e.target, 'feed-items')
        if (feedItem) {
            const commentAxios = await axios.post('/feed_comment_data', { postID: feedItem.dataset.post_id })
            const commentAxiosData = await commentAxios.data;
            const likesAxios = await axios.post('feed_like_process', {postID: feedItem.dataset.post_id});
            const likesAxiosData = await likesAxios.data;
            console.log(likesAxiosData)
            if(likesAxiosData.data1.length!==0){
                likeButton.setAttribute('fill', '#ed4956')
                likeButton.children[0].setAttribute('d', "M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z");
                likeButton.nextElementSibling.innerHTML = `${likesAxiosData.data2.length}명`;
            }
            for (let i = 0; i < commentAxiosData.length; i++) {
                const commentList = document.createElement('li');
                const commentImage = document.createElement('a');
                const commentNickname = document.createElement('p');
                const commentContent = document.createElement('p');
                const commentDate = document.createElement('span');
                commentList.className = 'right-feed-items';
                commentImage.className = 'right-feed-image';
                commentNickname.className = 'right-feed-nickname';
                commentContent.className = 'right-feed-comment';
                commentDate.className = 'right-feed-comment-date';
                commentImage.style.backgroundImage = `url('../data/${commentAxiosData[i].id}/1.jpg')`;
                commentNickname.innerHTML = commentAxiosData[i].nickname;
                commentContent.innerHTML = commentAxiosData[i].comment;
                commentDate.innerHTML = commentAxiosData[i].upload_date.split('T')[0];
                commentList.appendChild(commentImage);
                commentList.appendChild(commentNickname);
                commentList.appendChild(commentDate);
                commentList.appendChild(commentContent);
                rightFeedList.appendChild(commentList);
            }
            rightFeedHeader.children[0].style.backgroundImage = `url('../data/${searchAxiosData.post[feedItem.dataset.number].id}/1.jpg')`
            rightFeedHeader.children[1].innerHTML = feedItem.dataset.nickname;
            rightFeedContents.children[0].innerHTML = feedItem.dataset.content;
            rightFeedContents.children[1].innerHTML = feedItem.dataset.date;
            hiddenPostID.value = feedItem.dataset.post_id

            for (let i = 0; i < searchAxiosData.images[feedItem.dataset.number].length; i++) {
                feedSlideListWidth = feedSlideContainer.clientWidth * searchAxiosData.images[feedItem.dataset.number].length;
                feedSlideList.style.width = `${feedSlideListWidth}px`
                const feedImageItems = document.createElement('li');
                feedImageItems.className = 'feed-slide-items'
                feedSlideList.appendChild(feedImageItems);
                feedImageItems.style.backgroundImage = `url('../data/${searchAxiosData.post[feedItem.dataset.number].post_id}/${searchAxiosData.images[feedItem.dataset.number][i]}')`
            }
            feedPostModalContainer.style.opacity = '1';
            feedPostModalContainer.style.zIndex = 20;

        }

        feedSlideItems = document.querySelectorAll('.feed-slide-items');
    })
    const feedPostModalContainer = document.querySelector('.feed-post-modal-container');
    feedSlideList.style.left = 0;
    let listIndex = 0;
    feedPostModalContainer.addEventListener('click', async (e) => {
        const leftButton = getTarget(e.target, 'feed-slide-switch-left');
        const rightButton = getTarget(e.target, 'feed-slide-switch-right');
        const modalBox = getTarget(e.target, 'feed-post-modal-container');
        const slideBox = getTarget(e.target, 'feed-slide-container');
        const rightBox = getTarget(e.target, 'feed-post-right-section');
        const commentButton = getTarget(e.target, 'right-feed-bottom-submit');
        const likeButton = getTarget(e.target, 'like-btn');
        if (likeButton) {
            if (likeButton.getAttribute('fill') == '#262626') {
                const likePostID = hiddenPostID.value;
                await axios.post('/add_like', { likePostID });
                likeButton.setAttribute('fill', '#ed4956')
                likeButton.children[0].setAttribute('d', "M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z");
                let likeCount = parseInt(likeButton.nextElementSibling.innerHTML);
                likeButton.nextElementSibling.innerHTML = `${++likeCount}명`

            }else {
                const likePostID = hiddenPostID.value;
                await axios.post('/cancel_like', {likePostID});
                likeButton.setAttribute('fill', '#262626')
                likeButton.firstElementChild.setAttribute('d', "M34.6 6.1c5.7 0 10.4 5.2 10.4 11.5 0 6.8-5.9 11-11.5 16S25 41.3 24 41.9c-1.1-.7-4.7-4-9.5-8.3-5.7-5-11.5-9.2-11.5-16C3 11.3 7.7 6.1 13.4 6.1c4.2 0 6.5 2 8.1 4.3 1.9 2.6 2.2 3.9 2.5 3.9.3 0 .6-1.3 2.5-3.9 1.6-2.3 3.9-4.3 8.1-4.3m0-3c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5.6 0 1.1-.2 1.6-.5 1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z")
        
                let likeCount = parseInt(likeButton.nextElementSibling.innerHTML);
                likeButton.nextElementSibling.innerHTML = `${--likeCount}명`
            }
        }
        if (commentButton) {
            if (commentButton.previousElementSibling.value) {
                let today = new Date();
                let year = today.getFullYear(); // 년도
                let month = today.getMonth() + 1;  // 월
                let date = today.getDate();
                const postID = hiddenPostID.value;
                const comment_content = commentButton.previousElementSibling.value;
                const submitComment = await axios.post('/feed_insert_comment', { postID, comment_content })
                const commentList = document.createElement('li');
                const commentImage = document.createElement('a');
                const commentNickname = document.createElement('p');
                const commentContent = document.createElement('p');
                const commentDate = document.createElement('span');
                commentList.className = 'right-feed-items';
                commentImage.className = 'right-feed-image';
                commentNickname.className = 'right-feed-nickname';
                commentContent.className = 'right-feed-comment';
                commentDate.className = 'right-feed-comment-date';
                commentDate.innerHTML = `${year}-${month}-${date}`;
                commentImage.style.backgroundImage = `url('../data/${searchAxiosData.id}/1.jpg')`;
                commentNickname.innerHTML = searchAxiosData.nickname;
                commentContent.innerHTML = commentButton.previousElementSibling.value;
                commentList.appendChild(commentImage);
                commentList.appendChild(commentNickname);
                commentList.appendChild(commentDate);
                commentList.appendChild(commentContent);
                rightFeedList.appendChild(commentList);
                commentButton.previousElementSibling.value = null;
            }
        }
        if (leftButton) {
            if (listIndex === 0) {
                return;
            }
            listIndex--;
            feedSlideList.style.left = `-${feedSlideContainer.clientWidth * listIndex}px`
        } else if (rightButton) {
            if (listIndex === feedSlideItems.length - 1) {
                return;
            }
            listIndex++;
            feedSlideList.style.left = `-${feedSlideContainer.clientWidth * listIndex}px`
        } else if (rightBox) {
        } else if (slideBox) {
        } else if (modalBox) {
            modalBox.style.opacity = '0';
            feedPostModalContainer.style.zIndex = 0;
            for (let i = 0; i < feedSlideItems.length; i++) {

                feedSlideItems[i].remove();
                listIndex = 0
                feedSlideList.style.left = 0;
            }
            const commentList = document.querySelectorAll('.right-feed-items');
            for (let i = 0; i < commentList.length; i++) {
                commentList[i].remove();
            }
            const likeButton = document.querySelector('.like-btn')
            likeButton.setAttribute('fill', '#262626')
            likeButton.firstElementChild.setAttribute('d', "M34.6 6.1c5.7 0 10.4 5.2 10.4 11.5 0 6.8-5.9 11-11.5 16S25 41.3 24 41.9c-1.1-.7-4.7-4-9.5-8.3-5.7-5-11.5-9.2-11.5-16C3 11.3 7.7 6.1 13.4 6.1c4.2 0 6.5 2 8.1 4.3 1.9 2.6 2.2 3.9 2.5 3.9.3 0 .6-1.3 2.5-3.9 1.6-2.3 3.9-4.3 8.1-4.3m0-3c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5.6 0 1.1-.2 1.6-.5 1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z")
    
            likeButton.nextElementSibling.innerHTML = `0명`;

        }
        // 댓글입력

    })
    window.addEventListener('resize', () => {
        feedSlideListWidth = feedSlideContainer.clientWidth * feedSlideItems.length;
        feedSlideList.style.width = `${feedSlideListWidth}px`
        feedSlideList.style.left = 0;
        listIndex = 0;
    })
})()