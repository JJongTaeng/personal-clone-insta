// const postWhole = document.querySelectorAll('.post-whole');
// const LslideSwitch = document.querySelectorAll('.slide-switch-left');
// const RslideSwitch = document.querySelectorAll('.slide-switch-right');
// const allPost = {};
// let slideLength = {};
// let slideIndex = {};
// const container = document.querySelector(".container");
// let containerWidth = container.clientWidth;

// for (let i = 0; i < postWhole.length; i++) {
//     allPost[i] = postWhole[i].children[1].firstElementChild.firstElementChild;
//     slideLength[i] = allPost[i].children.length;
//     allPost[i].style.left = `0px`;
//     allPost[i].style.width = (containerWidth * slideLength[i]) + 'px';
//     slideIndex[i] = 0;

//     LslideSwitch[i].addEventListener('click', () => {
//         if (slideIndex[i] === 0) return;
//         slideIndex[i]--;
//         allPost[i].style.left = -(containerWidth * slideIndex[i]) + 'px';
//     })
//     RslideSwitch[i].addEventListener('click', () => {
//         if (slideIndex[i] === slideLength[i] - 1) return;
//         allPost[i].style.left = -(containerWidth * (slideIndex[i] + 1)) + 'px';
//         slideIndex[i]++;
//     })
// }
// window.addEventListener('resize', () => {
//     containerWidth = container.clientWidth;
//     for(let i=0; i<postWhole.length; i++){
//         allPost[i].style.width = `${containerWidth * slideLength[i]}px`;
//         allPost[i].style.left = `0px`;
//         slideIndex[i] = 0;
//     }
// })


// const log = console.log;
// const container = document.querySelector(".container");
// const slideList = document.querySelector(".slide-list");
// const slideItem = document.querySelectorAll(".slide-item");
// const LslideSwitch = document.querySelector('.slide-switch-left');
// const RslideSwitch = document.querySelector('.slide-switch-right');
// let slideLength = slideItem.length;
// let i = 0;
// slideList.style.left = `0px`;
// let slideIndex = 0;
// let containerWidth = 0;
// const setLayout = () => {
//     containerWidth = container.clientWidth;
//     slideList.style.width = (containerWidth * slideLength) + 'px';

// }
// window.addEventListener('load', () => {
//     setLayout();
// })
// window.addEventListener('resize', function () {
//     setLayout();
//     slideList.style.left = 0;
//     slideIndex = 0;
// });
// LslideSwitch.addEventListener('click', () => {
//     leftSlideHandler();
// })
// RslideSwitch.addEventListener('click', () => {
//     rightSlideHandler();
// })
// function leftSlideHandler() {
//     if (slideIndex === 0) return;
//     slideIndex--;
//     slideList.style.left = -(containerWidth * slideIndex) + 'px';
// }
// function rightSlideHandler() {
//     if (slideIndex === slideLength - 1) return;
//     slideList.style.left = -(containerWidth * (slideIndex + 1)) + 'px';
//     slideIndex++;
// }