const orb = document.querySelector('.orb-wrapper');
const ufo = document.querySelector('.ufo');

const starContainer = document.querySelector('.stars');
for (let i = 1; i < 100; i++){
    const star = document.createElement('div');
    star.className = 'star';
    star.style.top = `${Math.random() * 100}%`;
    star.style.left = `${Math.random() * 100}%`;
    star.style.animationDelay = `${Math.random() * 5}s`;
    starContainer.appendChild(star);
}

//får png og orb til at følge musen
// document.addEventListener('mousemove', (e) => {
//     const x = e.clientX;
//     const y = e.clientY;
//
//     // Orb følger musen med en lille forsinkelse
//     orb.style.transform = `translate(${x - 75}px, ${y - 75}px)`; // -75px for at centrere orb
//     ufo.style.transform = `translate(${x - 40}px, ${y - 40}px)`; // centrer UFO
// });
