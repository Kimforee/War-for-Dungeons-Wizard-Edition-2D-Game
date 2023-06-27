const startButton   = document.getElementById('startButton');
const optionsButton = document.getElementById('optionsButton');
const exitButton    = document.getElementById('exitButton');
const backtomenuButton = document.getElementById('backtomenuButton');

startButton.addEventListener('mouseover', () =>{
    startButton.classList.add('button-zoom');
})
startButton.addEventListener('mouseout', () =>{
    startButton.classList.add('button-zoom');
})

startButton.addEventListener('click',() =>{
    showGameContainer();
});

optionsButton.addEventListener('click',() =>{
    showSoundContainer();
});

exitButton.addEventListener('click',() =>{
    window.close();
});

backtomenuButton.addEventListener('click',() =>{
    showMainContainer();
})

function showGameContainer() {
    const menuContainer = document.getElementById('menuContainer');
    const gameContainer = document.getElementById('gameContainer');
    menuContainer.style.display = 'none';
    gameContainer.style.display = 'block';
}

function showSoundContainer(){
    const menuContainer  = document.getElementById('menuContainer');
    const soundContainer = document.getElementById('soundContainer');
    menuContainer.style.display = 'block';
    soundContainer.style.display = 'none';
}

function showMainContainer(){
    const menuContainer = document.getElementById('menuContainer');
    const gameContainer = document.getElementById('gameContainer');
    menuContainer.style.display = 'block';
    gameContainer.style.display = 'none';
}

