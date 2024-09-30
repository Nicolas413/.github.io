// Extraidos de https://www.larazon.es/cultura/20201016/xokxnbrionbptau4e6noseis7y.html
const data = [
  { title: 'Sonata para piano nº. 14', listens: 76 },
  { title: 'Sinfonía nº. 5', listens: 19 },
  { title: 'Bagatelle nº. 25', listens: 18 },
  { title: 'Sonata para piano nº. 8', listens: 4 },
  { title: 'Sonata para piano nº. 7', listens: 3 }
];

const trace = {
  x: data.map(item => item.title),
  y: data.map(item => item.listens),
  type: 'bar',
  hoverinfo: 'x+y',
  marker: { color: '#6a1b9a' }
};

const layout = {
  title: 'Cantidad de Reproducciones de Obras Clásicas de Beethoven',
  xaxis: { title: 'Obras' },
  yaxis: { title: 'Millones de Reproducciones' },
  margin: { t: 40 }
};

Plotly.newPlot('barplot', [trace], layout);

let isPlaying = false;
let audioReady = false;

const audio = new Tone.Player("Moonlight Sonata.mp3", () => {
  console.log("Audio cargado");
}).toDestination();
audio.loop = true; 

function pauseSong() {
  if (isPlaying) {
    audio.mute = true; 
    isPlaying = false; 
    console.log("Canción pausada");
    document.getElementById('toggle-audio').textContent = 'Reproducir Canción';
  }
}

async function playSong() {
  await Tone.start();  
  if (!isPlaying) {
    if (!audioReady) {
      audio.start(); 
      audioReady = true;  
    }
    audio.mute = false;
    isPlaying = true; 
    console.log("Canción en reproducción");
    document.getElementById('toggle-audio').textContent = 'Pausar Canción';
  }
}

document.getElementById('toggle-audio').addEventListener('click', () => {
  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

