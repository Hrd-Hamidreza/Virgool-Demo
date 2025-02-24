//! ----------------------------------------------- Import
import { App } from "../App.js";
import { Page } from "../Models/Page.js";
import { SamplePodcastsFetching } from "../Services/Home/Podcast/Samples/Data/samplePodcastsFetching.js";
import { PlayingPod } from "../Services/Home/Podcast/Samples/PlayingPod/PlayingPod.js";
//! ----------------------------------------------- Home Page
export class HomePage extends Page {
  //? ----------------------- beforeRendering
  async beforeRendering(html, main) {
    try {
      //! ----------------------------------------------- Main (newSec)
      const newSec = document.createElement("section");
      newSec.innerHTML = html;
      //! ----------------------------------------------- Posts
      //Todo ----------------------- write Fetch Bool
      const welcome = document.getElementById("welcome");
      const welcomeAttr = welcome.getAttribute("data-write-bool");
      let writeFetchBool;
      if (welcomeAttr) {
        writeFetchBool = Boolean(welcomeAttr);
      }
      //Todo ----------------------- Start
      const result = await App.fetchPost().getPosts(writeFetchBool);
      const postContainer = newSec.querySelector("#post-container");
      const postTemplate = newSec.querySelector("#post-template");
      const newSecElm = document.createElement("section");
      newSecElm.id = "top";
      postContainer.append(newSecElm);
      //Todo ------------------------
      result.forEach((posts) => {
        newSecElm.append(posts.renderPosts(postTemplate));
      });

      //! ----------------------------------------------- Podcasts
      //Todo ------------------------ podcasts Types
      const getPod = await App.fetchPodcast().getPodcasts();
      const podcastWrapper = newSec.querySelector("#podcast-wrapper");
      const podcastTemplate = newSec.querySelector("#podcast-template");
      newSec.querySelector("#podcast-name").innerHTML = getPod[0].name;
      //? ------------
      getPod.forEach((podcasts) => {
        podcastWrapper.append(podcasts.renderPodcast(podcastTemplate));
      });

      //Todo ------------------------ podcasts Samples
      const getIdCatSa = await App.idCatShow().getSamples();
      const soundWrapper = newSec.querySelector("#sound-wrapper");
      const soundTemplate = newSec.querySelector("#sound-template");
      //? ------------
      if (getIdCatSa) {
        getIdCatSa.forEach((event) => {
          soundWrapper.prepend(event.renderFisrt(soundTemplate));
        });
      } else {
        soundWrapper.innerHTML = `<div style="font-weight: bold; color: red; display: flex; justify-content: center; align-items: center;" class="podError">There is no podcast here</div>`;
      }

      //! ----------------------------------------------- Categories
      const getCat = await App.fetchCategory().getCategories();
      const categoryWrapper = newSec.querySelector("#category-wrapper");
      const categoryTemplate = newSec.querySelector("#category-template");

      //Todo --------------------------
      getCat.forEach((categories) =>
        categoryWrapper.append(categories.renderCategories(categoryTemplate))
      );

      //! ----------------------------------------------- Return
      return newSec.innerHTML;
    } catch (error) {
      console.error(error);
    }
  }
  //? ----------------------- afterRendering
  afterRendering() {
    //! ------------ Remove Welcome Attribute
    const welcome = document.getElementById("welcome");
    if (welcome.hasAttribute("data-write-bool")) {
      welcome.removeAttribute("data-write-bool");
    }
    //! ------------ podcasts Samples Click Load
    new SamplePodcastsFetching().handleClickPod();
    //! ------------ Swiper
    this.handleSwiper();
    //! ------------ Search
    App.getSearchData().clickSearchBox();
    //! ------------ Get Playing Pod
    new PlayingPod().clickFind();
    //! ------------ Home Page
    console.log("Home Page");
  }
  //? ----------------------- handleSwiper
  handleSwiper() {
    return new Swiper(".mySwiper", {
      pagination: {
        el: ".swiper-pagination",
        type: "progressbar",
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      slidesPerView: "auto", // Set this option to 1 to snap to each slide
    });
  }
}
