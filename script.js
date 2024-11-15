let progress=document.querySelector("#progress");
let song=document.querySelector("#song");
let ctrlIcon=document.querySelector("#ctrlIcon");

let currentTime=document.querySelector(".current-time");
let maxDuration=document.querySelector(".max-duration");

function updateProgressColor() {
    let percentage = (song.currentTime / song.duration) * 100;
    progress.style.background = `linear-gradient(to right, #76ABAE ${percentage}%, #EEEEEE ${percentage}%)`;
}



function formatTime(seconds){
    let minutes=Math.floor(seconds/60);
    let secs=Math.floor(seconds%60);
    if(secs<10) secs="0"+ secs;
    return minutes+ ":" + secs;
}

song.onloadedmetadata=function(){
    progress.max=song.duration;
    maxDuration.innerHTML=formatTime(song.duration);
    progress.value= song.currentTime;
}
function playPause(){
   if(ctrlIcon.classList.contains("fa-pause")){
    song.pause();
    ctrlIcon.classList.remove("fa-pause");
    ctrlIcon.classList.add("fa-play");
    clearInterval(progressInterval);
    }
   else{
    song.play();
    ctrlIcon.classList.add("fa-pause");
    ctrlIcon.classList.remove("fa-play");


    progressInterval =setInterval(()=>{
        progress.value =song.currentTime;
        currentTime.innerHTML=formatTime(song.currentTime);
        updateProgressColor();
    },500);
   }

}

progress.onchange =function (){

    song.currentTime=progress.value;
      updateProgressColor();
   
   if(song.paused){
    song.play();
    ctrlIcon.classList.add("fa-pause");
    ctrlIcon.classList.remove("fa-play");
    currentTime.innerHTML=formatTime(song.currentTime);
    clearInterval(progressInterval);
    progressInterval=setInterval(()=>{
        progress.value=song.currentTime;
       
    },500);

    }
};
