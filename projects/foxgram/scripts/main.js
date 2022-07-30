const likeImgElements = document.querySelectorAll('.js_like');

const likeFelled = 'https://res.cloudinary.com/intellectfox/image/upload/v1629752958/fe/foxgram/posts/like-filled_zurlii.svg';
const like = 'https://res.cloudinary.com/intellectfox/image/upload/v1629752957/fe/foxgram/posts/like_xw2apm.svg';

likeImgElements.forEach((likeImgEl) => {
    likeImgEl.addEventListener('click', (event) => {
        const likeCountEl = event.target.parentElement.querySelector('.js_text')
        const likeCount = +likeCountEl.textContent;

        if (event.target.src === like) {
            event.target.src = likeFelled;
            likeCountEl.textContent = 1 + likeCount;
        } else {
            event.target.src = like;
            likeCountEl.textContent = likeCount - 1;
        }
    });
});