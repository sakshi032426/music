console.log("Welcome to Spotify");

// Initialize the Variables
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    {songName: "Warriyo - Mortals [NCS Release]", filePath: "songs/1.mp3", coverPath: "1.jpg"},
    {songName: "Apna Bana Le", filePath: "songs/2.mp3", coverPath: "2.jpg"},
    {songName: "Atif Mashup", filePath: "songs/3.mp3", coverPath: "3.jpg"},
    {songName: "Bairiya", filePath: "songs/4.mp3", coverPath: "5.jpg"},
   {songName: "Yeh Wada raha", filePath: "songs/5.mp3", coverPath: "4.jpg"},
    {songName: "Jo tum sath ho", filePath: "songs/6.mp3", coverPath: "6.jpg"},
    {songName: "Muskurane", filePath: "songs/7.mp3", coverPath: "7.jpg"},
    {songName: "Shiv ka das", filePath: "songs/8.mp3", coverPath: "8.jpg"},
    {songName: "Arijit singh mashup", filePath: "songs/9.mp3", coverPath: "9.jpg"},
    {songName: "Ram aye hai", filePath: "songs/10.mp3", coverPath: "10.jpg"},
]

songItems.forEach((element, i)=>{ 
    element.getElementsByTagName("img")[0].src = songs[i].coverPath; 
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName; 
})
 

// Handle play/pause click
masterPlay.addEventListener('click', () => {
        if (audioElement.paused || audioElement.currentTime <= 0) {
            audioElement.play();
            masterPlay.classList.remove('fa-play-circle');
            masterPlay.classList.add('fa-pause-circle');
            gif.style.opacity = 1;
        }
        else {
            audioElement.pause();
            masterPlay.classList.remove('fa-pause-circle');
            masterPlay.classList.add('fa-play-circle');
            gif.style.opacity = 0;
        }
    })
// Listen to Events
audioElement.addEventListener('timeupdate', ()=>{ 
    // Update Seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)* 100); 
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{ 
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = `songs/${songIndex+1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    })
})

document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>=9){
        songIndex = 0
    }
    else{
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');

})

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=0){
        songIndex = 0
    }
    else{
        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})

const currentTimeDisplay = document.getElementById('currentTime');
const totalDurationDisplay = document.getElementById('totalDuration');

audioElement.addEventListener('timeupdate', () => {
    const currentTime = formatTime(audioElement.currentTime);
    currentTimeDisplay.textContent = currentTime;
});

audioElement.addEventListener('loadedmetadata', () => {
    const totalDuration = formatTime(audioElement.duration);
    totalDurationDisplay.textContent = totalDuration;
});

function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}
// Get the current hour
const currentHour = new Date().getHours();

// Get the element where the greeting message will be displayed
const greetingMessage = document.getElementById('greetingMessage');

// Set the greeting message based on the current hour
if (currentHour >= 5 && currentHour < 12) {
    greetingMessage.textContent = 'Good morning!';
} else if (currentHour >= 12 && currentHour < 18) {
    greetingMessage.textContent = 'Good afternoon!';
} else {
    greetingMessage.textContent = 'Good evening!';
}


