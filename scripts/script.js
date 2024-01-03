document.addEventListener('DOMContentLoaded', () => {
    pauseAudio();
});

const audio = document.getElementById("audio");
let isPlaying = false;

const sections = document.querySelectorAll('.page');
const lyricContainer = document.querySelector('.container');
const durationDisplay = document.getElementById('duration');
let seekTimer = 0;
let durationIntervalId;

function startPlayback() {
    if (audio.paused) {
        scrollToSection(1);
        audio.currentTime = 68.9;
        audio.play();
        isPlaying = true;

        const sectionTimes = [71.9, 74.9, 78.9, 84.4, 104.4];
        const progressBar = document.getElementById('seektime');
        let currentSectionIndex = 0;
        let lyricScroll = 200;
        const audioDuration = audio.duration;

        audio.addEventListener('timeupdate', () => {
            updateDurationDisplay();
            updateProgressBar(progressBar, audioDuration);

            if (audio.currentTime >= sectionTimes[currentSectionIndex]) {
                lyricContainer.scrollTop = lyricScroll;
                lyricScroll += 200;
                currentSectionIndex++;
            }
            if (audio.currentTime > sectionTimes[4]) {
                clearInterval(durationIntervalId);
                resetPlayback();
                scrollToSection(2);
            }
        });
    } else {
        pauseAudio();
        resetPlayback();
        scrollToSection(0);
    }
}

function pauseAudio() {
    audio.pause();
    isPlaying = false;
    console.log("Song is paused");
    clearInterval(durationIntervalId);
    seekTimer = 0;
    durationDisplay.innerHTML = "0:00";
    lyricContainer.scrollTop = 0;
}

function scrollToSection(index) {
    sections[index].scrollIntoView({ behavior: 'smooth' });
}

function updateDurationDisplay() {
    const currentTime = Math.floor(audio.currentTime) - 68;
    durationDisplay.innerHTML = (audio.currentTime >= 78) ? `0:${currentTime}` : `0:0${currentTime}`;
}

function updateProgressBar(progressBar, audioDuration) {
    const progressValue = (audio.currentTime / audioDuration) * 100;
    progressBar.value = progressValue - 56;
}

function resetPlayback() {
    pauseAudio();
}
