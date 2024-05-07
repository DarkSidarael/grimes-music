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
let indexMusica = 0
let musica = document.querySelector('audio')
let duracaoMusica = document.querySelector('.fim')
let imagem = document.querySelector('logo')

document.querySelector('.anterior').addEventListener('click', () => {
  renderizarMusica();
});

document.querySelector('.proxima').addEventListener('click', () => {
  indexMusica++;
  renderizarMusica(indexMusica);
});

function renderizarMusica(index){
  musica.src = musicas[index].src;
  musica.addEventListener('loadeddata', () => {
    imagem.src = musicas[index].img;
    duracaoMusica.textContent = segundosParaMinutos(Math.floor(musica.duration));
  });
}

  



function changeMusic(direction) {
  music = music + direction

  time = 1
  const timelime = document.getElementById('timeline')
  musica.addEventListener('timeupdate', atualizarBarra);

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
  
  if(music > TOTAL_MUSICS - 1) {
    music = 1
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
});

}

// Script de inicialização
fetch("../musics.json").then(response => response.json()).then(data => {
  musics = data
  TOTAL_MUSICS = data.length
  changeMusic(0)
});

function handleToggle() {
  const buttonToggle = document.getElementById('button__toggle')
  const navigation = document.getElementById('navigation')
  buttonToggle.classList.toggle('active')
  navigation.classList.toggle('active')
}

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



