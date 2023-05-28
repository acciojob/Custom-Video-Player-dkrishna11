// Get elements from the DOM
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.player__button');
const volumeSlider = player.querySelector('.player__slider[name="volume"]');
const playbackSpeedSlider = player.querySelector('.player__slider[name="playbackRate"]');
const skipButtons = player.querySelectorAll('[data-skip]');

// Function to toggle play/pause
function togglePlay() {
  if (video.paused) {
    video.play();
    toggle.textContent = '❚ ❚';
  } else {
    video.pause();
    toggle.textContent = '►';
  }
}

// Function to handle skip buttons
function skip() {
  video.currentTime += parseFloat(this.dataset.skip);
}

// Function to handle volume control
function handleVolumeChange() {
  video.volume = this.value;
}

// Function to handle playback speed control
function handlePlaybackSpeedChange() {
  video.playbackRate = this.value;
}

// Function to update progress bar
function updateProgressBar() {
  const progressPercent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${progressPercent}%`;
}

// Function to handle seeking on progress bar click
function handleProgressSeek(e) {
  const seekTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = seekTime;
}

// Add event listeners
video.addEventListener('click', togglePlay);
toggle.addEventListener('click', togglePlay);
volumeSlider.addEventListener('input', handleVolumeChange);
playbackSpeedSlider.addEventListener('input', handlePlaybackSpeedChange);
progress.addEventListener('click', handleProgressSeek);

// Update progress bar as the video plays
video.addEventListener('timeupdate', updateProgressBar);

// Add event listeners to skip buttons
skipButtons.forEach(button => button.addEventListener('click', skip));

