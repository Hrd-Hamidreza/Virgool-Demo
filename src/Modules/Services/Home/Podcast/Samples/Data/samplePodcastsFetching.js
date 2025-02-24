//! ----------------------------------------------- Import
import axios from "axios";
import { url } from "../../../../../Utils/Options";
import { SamplePodcastsContents } from "../Contents/samplePodcastsContents";
import { Loading } from "../../../../../Utils/Loading";
import { PlayingPod } from "../PlayingPod/PlayingPod";
//! ----------------------------------------------- podcastsContents Page
export class SamplePodcastsFetching {
  constructor() {
    this.soundWrapper = document.querySelector("#sound-wrapper");
    this.soundTemplate = document.querySelector("#sound-template");
    this.ass = document.querySelector("#podcast-name");
    this.newArraySample = [];
    this.id = null;
  }
  //todo ----------------------- getSamples
  async getSamples(idNum = 1) {
    try {
      if (+this.id === +idNum) {
        return this.newArraySample;
      }
      this.id = idNum;
      const formData = new FormData();
      formData.append("id", idNum);
      formData.append("limit", "2");
      const { data: response } = await axios.post(`${url}/podcastId`, formData);
      delete this.newArraySample;
      if (response.status === "success") {
        this.newArraySample = response.sounds.map(
          (podcastsamples) => new SamplePodcastsContents(podcastsamples)
        );
        return this.newArraySample;
      } else {
        this.newArraySample = false;
        return false;
      }
    } catch (error) {
      console.error(error);
    }
  }
  //todo ----------------------- HandleClickPod
  handleClickPod() {
    const samlple = document.querySelectorAll(".swiper-slide");
    samlple.forEach((element) => {
      element.addEventListener("click", async (event) => {
        //! ------------ Show Load
        Loading.showLoading();
        //! ------------
        const opo = event.target.getAttribute("alt");
        this.ass.innerHTML = opo;
        const preClo = event.target.closest("A.chosen");
        const finalId = preClo.getAttribute("data-sampleCatId");
        const result = await this.getSamples(finalId);
        //! ------------ Hide Load
        Loading.hideLoading();
        //! ------------
        if (result) {
          this.soundWrapper.innerHTML = "";
          result.forEach((samples) => {
            this.soundWrapper.prepend(samples.renderFisrt(this.soundTemplate));
          });
          new PlayingPod().clickFind();
        } else {
          this.soundWrapper.innerHTML = `<div style="font-weight: bold; color: red; display: flex; justify-content: center; align-items: center;" class="podError">There is no podcast here</div>`;
          return;
        }
      });
    });
  }
}
