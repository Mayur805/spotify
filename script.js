let audioElement = new Audio("song/3.mp3");

let masterPlay = document.getElementById("masterPlay");
let myProgressbar = document.getElementById("myProgressbar");
let songItems = Array.from(document.getElementsByClassName("songitem"));
let songIndex = 0;
let masterSongName = document.getElementById("masterSongName");

masterPlay.addEventListener('click', () => {
    if (audioElement.paused) {
        audioElement.play();
        masterPlay.classList.remove("fa-play-circle");
        masterPlay.classList.add("fa-pause-circle");
        document.getElementById("gif_Img").style.opacity = 1;
    }
    else {
        audioElement.pause();
        masterPlay.classList.remove("fa-pause-circle");
        masterPlay.classList.add("fa-play-circle");
        document.getElementById("gif_Img").style.opacity = 0;
    }
});

audioElement.addEventListener('timeupdate', () => {
    // console.log('timeupdate');
    progress = parseInt((audioElement.currentTime / audioElement.duration) * 100)
    // console.log(progress);
    myProgressbar.value = progress;
});

myProgressbar.addEventListener('change', () => {
    audioElement.currentTime = myProgressbar.value * audioElement.duration / 100;
});

let songs = [
    { songsName: "Tejji seat", filePath: "sogs/1.mp3", coverPath: "covers/1.jpg" },
    { songsName: "Letme love you", filePath: "song/1.mp3", coverPath: "covers/2.jpg" },
    { songsName: "Uzi ", filePath: "song/1.mp3", coverPath: "covers/3.jpg" },
    { songsName: "marsmellow", filePath: "song/1.mp3", coverPath: "covers/4.jpg" },
    { songsName: "Astronomy", filePath: "song/1.mp3", coverPath: "covers/5.jpg" },
    { songsName: "Jigsaw", filePath: "song/1.mp3", coverPath: "covers/6.jpg"},
];

songItems.forEach((element, i) => {
    // console.log(element, i);
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songsName;
});

const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.add("fa-pause-circle");
        element.classList.add("fa-play-circle");
    })
};

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove("fa-play-circle");
        e.target.classList.add("fa-pause-circle");
        console.log(e.target);
        audioElement.src = `song/${songIndex + 1}.mp3`;
        masterSongName.innerText = songs[songIndex].songsName;
        audioElement.currentTime = 0;
        audioElement.play();    
        document.getElementById("gif_Img").style.opacity = 1;
        masterPlay.classList.add("fa-play-circle");
        masterPlay.classList.remove("fa-pause-circle");
    })
});

document.getElementById("next").addEventListener('click', () => {
    if (songIndex >= 6) {
        songIndex = 0;
    }
    else {
        songIndex += 1;
    }
    audioElement.src = `song/${songIndex + 1}.mp3`;
    masterSongName.innerText = songs[songIndex].songsName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.add("fa-play-circle");
    masterPlay.classList.remove("fa-pause-circle");
});

document.getElementById("previous").addEventListener('click', () => {
    if (songIndex <= 0) {
        songIndex = 0;
    }
    else {
        songIndex -= 1;
    }
    audioElement.src = `song/${songIndex + 1}.mp3`;
    masterSongName.innerText = songs[songIndex].songsName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove("fa-play-circle");
    masterPlay.classList.add("fa-pause-circle");
});