/**
 * 2021 - Sergio Soriano
 * https://github.com/sergiss
 * www.sergiosoriano.com
 */
const LIGHT_TIME = 200;
const STEP_TIME = LIGHT_TIME * 2.0;

class Simon {
  constructor(elements, score) {
    this.elements = elements;
    this.score = score;
    this.buttons = [];
    for (let i = 0; i < 4; ++i) {
      this.buttons[i] = this.createButton(i, elements[i]);
    }

    this.restart();   
    this.animate();
  }

  animate(i) {
    if(!i) {this.gameState = -1; i = 0;}
    if (this.gameState == -1) {
      let el = this.elements[i];
      setTimeout(() => {
        el.style.filter = "brightness(250%)"; // apply brightness
        setTimeout(() => {
          // wait to clear brightness
          el.style.filter = "brightness(100%)";
          this.animate((i + 1) % 4);
        }, LIGHT_TIME);
      }, 5);
    }
  }

  restart = function () {
    this.gameState = 0;
    this.sequence = [];
    this.cpuIndex = -1;
    this.playerIndex = -1;
    this.score.innerHTML = 0;
  };

  step = function () {
    if (this.playerIndex === this.cpuIndex || this.cpuIndex === -1) {
      this.score.innerHTML = Math.max(
        this.score.innerHTML,
        this.playerIndex + 1
      );
      this.gameState = 0; // cpu's turn
      this.playerIndex = 0;
      setTimeout(() => {
        // little pause
        this.playSequence(0, () => {
          // plays the stored sequence
          // finally add one more step to the sequence
          this.cpuIndex++; // increment cpu cpuIndex
          let id = Math.floor(Math.random() * 4); // rnd id
          this.sequence.push(id); // add id to sequence
          this.buttons[id](false); // perform
          this.gameState = 1; // player's turn
        });
      }, STEP_TIME);
    } else {
      this.playerIndex++; // increment user cpuIndex
    }
  };

  playSequence = function (i, callback) {
    setTimeout(() => {
      if (this.cpuIndex >= i) {
        this.buttons[this.sequence[i]](false);
        this.playSequence(i + 1, callback); // next step
      } else {
        callback(); // end
      }
    }, STEP_TIME);
  };

  createButton = function (id, el) {
    const sound = new Sound(`./resources/s${id}.mp3`);
    const result = (player) => {
      el.style.filter = "brightness(250%)"; // apply brightness
      sound.stop();
      sound.play();
      setTimeout(() => {
        // wait to clear brightness
        el.style.filter = "brightness(100%)";
      }, LIGHT_TIME);
      if (player) {
        // if player time
        if (this.sequence[this.playerIndex] === id) {
          // check
          this.step();
        } else {
          console.log("game over");
          this.restart();   
          this.animate();
        }
      }
    };

    el.addEventListener("mousedown", (e) => {
      e.preventDefault();
      if (this.gameState === 1) {
        // if player's turn
        result(true); // perform click
      } else if(this.gameState === -1) {
        this.restart();   
        this.step();
      }
    });

    return result;
  };
}
