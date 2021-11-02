/**
 * 2021 - Sergio Soriano
 * https://github.com/sergiss
 * www.sergiosoriano.com
 */
const init = ()=> {

    const green  = document.querySelector("#green");
    const yellow = document.querySelector("#yellow");
    const blue   = document.querySelector("#blue");
    const red    = document.querySelector("#red");

    const score = document.querySelector("#score");

    const simon = new Simon([blue, green, red, yellow], score);
    
}

function load(src, callback) {
    // helper for load content
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
      if (xhr.status == 200) {
        callback(this.responseText);
      }
    };
    xhr.open("GET", src, true);
    xhr.send();
  }
  
  load("./resources/simon.svg", (data) => {
    document.querySelector("#simon").innerHTML = data;
    init();
  });
