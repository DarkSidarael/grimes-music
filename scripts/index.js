const MAX_TIME = 100
let TOTAL_MUSICS = 0

let time = 100
let musicas = [
  {
    titulo:'Guitar solo', artista:'João', src:'music/tatara.mp3', img:'logo3.jpg'
  }
]
let music = 0
let musics = []
let isPlaying = false
let timeEvent = null

let musica = document.querySelector('audio')
let duracaoMusica = document.querySelector('.fim')
let imagem = document.querySelector('logo')


function changeMusic(direction) {
  music = music + direction
  time = 1
  const timelime = document.getElementById('timeline')
  musica.addEventListener('timeupdate', atualizarBarra);

  const buttonPlay = document.getElementById('button__play')
  buttonPlay.classList.remove('pause')
  buttonPlay.classList.add('play')
  isPlaying = false;

function atualizarBarra(){
  
  timelime.style.width = Math.floor((musica.currentTime / musica.duration)* 100)+ '%';
  let tempoDecorrido = document.querySelector('.inicio');
  tempoDecorrido.textContent = segundosParaMinutos(Math.floor(musica.currentTime));
}


function segundosParaMinutos(segundos){
  let campoMinutos = Math.floor(segundos / 60);
  let campoSegundos = segundos % 60;
  
  if (campoSegundos < 10){
    campoSegundos = '0' + campoSegundos;
  } return campoMinutos + ':' + campoSegundos;
} 



    duracaoMusica.textContent = segundosParaMinutos(Math.floor(musica.duration))

  timelime.style.width = `${time}%`

  if(music < 0) {
    music = TOTAL_MUSICS - 1
  }
  
  if(music >= TOTAL_MUSICS) {
    music = 0
  }
  

  document.querySelector('.controll span').innerHTML = (music + 1) + ' / ' + TOTAL_MUSICS 

  document.querySelectorAll('h2').forEach(element => {
    element.innerHTML = musics[music].name
  });

  document.querySelectorAll('h3').forEach(element => {
    element.innerHTML = musics[music].artist
  });
  
  document.querySelectorAll('.logo').forEach((element, index) => {
    element.src = musics[music].imagem;     
});



document.querySelectorAll('audio').forEach((element, index) => {
  musica.src = musics[music].audio; 
  if (!isPlaying) {
    musica.play(); 
    buttonPlay.classList.remove('play');
    buttonPlay.classList.add('pause');
    isPlaying = true;}
});

document.querySelectorAll('.fim').forEach(element => {
  element.innerHTML = musics[music].fm
});

}



// Script de inicialização
fetch("../musics.json").then(response => response.json()).then(data => {
  musics = data
  TOTAL_MUSICS = data.length
  changeMusic(0)
  musica.play()
});

function handleToggle() {
  const buttonToggle = document.getElementById('button__toggle')
  const navigation = document.getElementById('navigation')
  buttonToggle.classList.toggle('active')
  navigation.classList.toggle('active')
}



function resetMusic() {
  time = 0
  changeMusic(1)
  isPlaying = false
  changeIconButtonPlay()
  clearInterval(timeEvent)
}

function playMusic() {
  isPlaying = !isPlaying
  changeIconButtonPlay()

  if(isPlaying) {
    const timelime = document.getElementById('timeline')

//     timeEvent = setInterval(() => {
//       if(time >= MAX_TIME) {
//         resetMusic()
//       }
//       time++
//       timelime.style.width = `${time}%`
//     }, 100 +'%')
//   } else {
//     clearInterval(timeEvent)
   }
}

const eventsKeydown = {
  Space: () => playMusic(),
  ArrowRight: () => changeMusic(1),
  ArrowLeft: () => changeMusic(-1)
}

document.addEventListener('keydown', (event) => {
  const { code } = event
  eventsKeydown[code];
})


function changeIconButtonPlay() { 
  const buttonPlay = document.getElementById('button__play')

  if(isPlaying) {
    buttonPlay.classList.remove('play')
    buttonPlay.classList.add('pause')
    musica.play();
  } else {
    buttonPlay.classList.remove('pause')
    buttonPlay.classList.add('play')
    musica.pause(); 
  }
  
}
 