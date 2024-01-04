// initial stop music
window.onload = (event) => {
    console.log("Page Loaded, Initially stop music");
    audio.pause();
}

//AutoScroll & Audio Functions Here
var audio = document.getElementById("audio");
var isPlaying = false;

var sections = document.querySelectorAll('.page');
var lyricSections = document.querySelectorAll('.lyric-con');
var lyricCon = document.querySelector('.container');

var duration = document.getElementById('duration');
var seektimer = 0;
var durId;


function startPlaying() {
    if (audio.paused) {
        sections[1].scrollIntoView({
            behavior: 'smooth'
        });
        audio.currentTime = 68.9;
        audio.play();
        //durId = setInterval(timer, 1000);
        // debug for progress bar ::console.log("SongPlaying " + audio.duration + " & " + audio.currentTime + " and ");
        isPlaying = true;
        const sectionTimes = [71.9, 74.9, 78.9, 84.4, 104.4];
        const progressBar = document.getElementById('seektime');
        let currentSectionIndex = 0;
        var lyriclen = 200;
        var sdur = audio.duration;

        audio.addEventListener('timeupdate', () => {
            if (audio.currentTime >= 78) {
                duration.innerHTML = "0:" + (Math.floor(audio.currentTime) - 68);
            }
            else
                duration.innerHTML = "0:0" + (Math.floor(audio.currentTime) - 68);

            let progressValue = (audio.currentTime / sdur) * 100;
            //for debug mode :: console.log("Progress Val : " + progressValue);
            progressBar.value = progressValue - 56;
            //for debug mode :: console.log("ProgressBAr Val : " + progressBar.value);
            if (audio.currentTime >= sectionTimes[currentSectionIndex]) {
                lyricCon.scrollTop = lyriclen;
                lyriclen += 200;
                currentSectionIndex++;
            }
            if (audio.currentTime > sectionTimes[4]) {
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

const elements = document.querySelectorAll('.soon');
elements.forEach(function (element) {
    observer.observe(element);
});


