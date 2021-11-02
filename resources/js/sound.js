/**
 * 2021 - Sergio Soriano
 * https://github.com/sergiss
 * www.sergiosoriano.com
 */
function Sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function() {

        this.sound.play();
    }
    this.stop = function() {
        this.sound.pause();
        this.sound.currentTime = 0

    }
    this.isPlaying = function() {
        return !this.sound.paused;
    }
}