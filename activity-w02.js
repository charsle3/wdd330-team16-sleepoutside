const countdown = document.getElementById('countdown');

let timeLeft = 10;

const button = document.getElementById('startButton');

button.addEventListener('click', () => {
    setInterval( () => {
        if (timeLeft >= 0){
            countdown.textContent = timeLeft;
            timeLeft--;
        } else {
            
        }
    }, 1000)
    setTimeout(() => {
    countdown.textContent = "Time's up!"; // Muestra el mensaje final
  }, (timeLeft + 1) * 1000);
});

let count = 0;
const intervalId = setInterval(() => {
  count += 1;
  console.log(count);
  if (count === 3) {
    clearInterval(intervalId);
  }
}, 1000);