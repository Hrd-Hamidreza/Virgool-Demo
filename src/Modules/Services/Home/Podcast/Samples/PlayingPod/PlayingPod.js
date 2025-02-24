//! ----------------------------------------------- Import
import { Toast } from "../../../../../Utils/Toast";
//! ----------------------------------------------- Home Page
export class PlayingPod {
  constructor() {
    this.samplesMusic = document.querySelectorAll(".sound-link");
    this.playIcons = document.querySelectorAll(".play-icon");
    this.audiopart = document.getElementById("audio-player");
  }
  //? ----------------------- clickFind
  clickFind() {
    this.samplesMusic.forEach((element) => {
      element.disabled = false;
      element.addEventListener("click", (event) => this.changingPart(event));
    });
  }
  //? ----------------------- Changing Part
  changingPart(event) {
    this.playIcons.forEach((icon) => {
      icon.classList.remove("fa-spin", "fa-spinner");
    });
    //! ----------------------- Handle DBL Click
    event.currentTarget.disabled = true;
    setTimeout(() => {
      event.target.closest("button").disabled = false;
    }, 2000);
    //! ----------------------- Empty Pause Icon
    this.playIcons.forEach((icon) => {
      icon.classList.replace("fa-pause", "fa-play");
    });
    //! ------------------------ Clicked Icon
    const clickedIcon = event.currentTarget.querySelector("i");
    this.audiopart.src = event.currentTarget.dataset.src;
    //! ------------------------ Audio Src
    clickedIcon.classList.add("fa-spin", "fa-spinner");
    //! ------------------------ Call loadAudio
    this.loadAudio(clickedIcon);
  }
  //? ----------------------- Load Audio
  loadAudio(clickedIcon) {
    //! ------------------------ Play
    this.audiopart
      .play()
      .then(() => {
        clickedIcon.classList.replace("fa-play", "fa-pause");
        this.audiopart.classList.replace("d-none", "d-flex");
        clickedIcon.classList.remove("fa-spin", "fa-spinner");
      })
      .catch((error) => {
        new Toast().failure("درحال برقراری ارتباط با سرور لطفا صبور باشید");
      });
  }
}
