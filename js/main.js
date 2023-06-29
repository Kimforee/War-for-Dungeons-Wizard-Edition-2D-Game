// start button wobble effect
const startButton      = document.getElementById('startButton');
startButton.addEventListener ('mousemove', () =>{
    startButton.classList.add('button-zoom');
})

startButton.addEventListener  ('mouseout', () =>{
    startButton.classList.add('button-zoom');
})

// const optionsButton    = document.getElementById('optionsButton');
    
const exitButton = document.getElementById('exitButton');
exitButton.addEventListener   ('click',() =>{
    window.close();
})

// Pause the Game
function toggle(){
    var resumeButton = document.getElementById('pauseButton');
    if (resumeButton.innerHTML === 'Pause'){
        resumeButton.innerHTML ='Resume';
        pauseTimer();
    } else {
        resumeButton.innerHTML = 'Pause'
        decreaseTimer();
    }
};

// Restart game
function restart(){
    location.reload();
}

// To load the main menu
function loadPage(url) {
    fetch(url)
      .then(response => response.text("loading"))
      .then(html => {
        document.getElementById('menuContainer').innerHTML = html;
      })
      .catch(error => {
        console.log('Error loading page:', error);
      });
  }