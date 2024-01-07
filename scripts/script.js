// initial stop music
window.onload = (event) => {
    console.log("Page Loaded, Initially stop music");
    audio.pause();
    audio.muted = false;
    console.log(' initially unmute');

}

//AutoScroll & Audio Functions Here
var audio = document.getElementById("audio");
var isPlaying = false;

var sections = document.querySelectorAll('.page');
var lyricSections = document.querySelectorAll('.lyric-con');
var lyricCon = document.querySelector('.container');
var sectionTimes = [];

var s1 = document.getElementById('s1');
var s2 = document.getElementById('s2');
var s3 = document.getElementById('s3');
var s4 = document.getElementById('s4');
var s5 = document.getElementById('s5');

var duration = document.getElementById('duration');
var seektimer = 0;
var durId;
var totalDuration = 0;

//var mainbtn = document.getElementById('button');
var song1 = document.getElementById('song1');
var song2 = document.getElementById('song2');
var song3 = document.getElementById('song3');
var cardbtn = document.getElementById('play');

/*mainbtn.addEventListener('click', () => {
    console.log("clicked image");
    startPlaying();
});*/
song1.addEventListener('click', () => {
    console.log("clicked song1");
    playRevenge();
});
song2.addEventListener('click', () => {
    console.log("clicked song2");
    playLetHerGo();
});
song3.addEventListener('click', () => {
    console.log("clickd  song3");
    playNoSong();
});
cardbtn.addEventListener('click', () => {
    console.log("clicked icon");
    startPlaying();
});

document.querySelector('.muteUnmuteButton').addEventListener('click', function () {
    this.classList.toggle('mute');
});

var mutebtn = document.getElementById('mute');
mutebtn.addEventListener('click', function () {
    if (audio.muted == true) {
        audio.muted = false;
        console.log('unmute');
    }
    else {
        audio.muted = true;
        console.log('mute');
    }
});

function playRevenge() {
    audio.src = 'songs/revenge.mp3';
    console.log("Song set to Revenge.mp3");
    totalDuration = audio.duration;
    sectionTimes = [3, 6, 10, 15.5, 35.5];
    console.log("Lyrics trigger point set");
    s1.innerHTML = "Some kill, some steal, <br> some break your heart";
    s2.innerHTML = "And you'd have thought that <br> i would let it go and let you walk";
    s3.innerHTML = "Well, broken hearts break bones, <br> so in my grave, I'll rot";
    s4.innerHTML = "And I don't wanna let it go, <br> so in my grave, I'll rot";
    s5.innerHTML = "In my grave, I'll rot...";
    console.log("Lyrics Changed");
    startPlaying();
}



function startPlaying() {
    if (audio.paused) {
        sections[1].scrollIntoView({
            behavior: 'smooth'
        });
        audio.currentTime = 0;
        audio.play();
        //durId = setInterval(timer, 1000);
        // debug for progress bar ::console.log("SongPlaying " + audio.duration + " & " + audio.currentTime + " and ");
        isPlaying = true;
        const progressBar = document.getElementById('seektime');
        let currentSectionIndex = 0;
        var lyriclen = 200;


        audio.addEventListener('timeupdate', () => {
            if (audio.currentTime >= 10) {
                duration.innerHTML = "0:" + Math.floor(audio.currentTime);
            }
            else
                duration.innerHTML = "0:0" + Math.floor(audio.currentTime);

            let progressValue = (audio.currentTime / audio.duration) * 100;
            //for debug mode :: console.log("Progress Val : " + progressValue);
            progressBar.value = progressValue;
            //for debug mode :: console.log("ProgressBAr Val : " + progressBar.value);
            if (audio.currentTime >= sectionTimes[currentSectionIndex]) {
                lyricCon.scrollTop = lyriclen;
                lyriclen += 200;
                currentSectionIndex++;
            }
            if ((audio.duration - audio.currentTime) == 0) {
                clearInterval(durId);
                duration.innerHTML = "0:00";
                sections[2].scrollIntoView({
                    behavior: 'smooth'
                });
            }
        }
        );
    }
    else {
        audio.pause();
        isPlaying = false;
        console.log("Song is paused");
        clearInterval(durId);
        seektimer = 0;
        duration.innerHTML = "0:00";
        lyricCon.scrollTop = 0;
    }
}


//Inter Section API Here 
var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
        if (entry.isIntersecting) {
            console.log("is intersecting");
            entry.target.style.opacity = '100'; //fixed something that bothered my animation :)
            entry.target.classList.add('active');
        }
        else {
            entry.target.classList.remove('active');
            entry.target.style.opacity = '0';
        }
    });
});

const elements = document.querySelectorAll('.lyrics-text');
elements.forEach(function (element) {
    observer.observe(element);
});


