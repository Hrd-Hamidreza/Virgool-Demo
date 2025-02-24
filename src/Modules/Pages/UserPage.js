//! ------------------------------------------------------------ Import
import { App } from "../App";
import { Page } from "../Models/Page";
//! ------------------------------------------------------------ Tag Page
export class UserPage extends Page {
  //? ----------------------- beforeRendering
  async beforeRendering(html, main) {
    try {
      //! ---------------------------------------------- NewSec
      const newSec = document.createElement("section");
      newSec.innerHTML = html;
      //! ---------------------------------------------- General
      const userId = main.getAttribute("data-userId");
      const fetchingUserData = await App.getFetchUserInfo().fetchWholeData(
        userId
      );
      //Todo ------------------------ Render Informations
      if (fetchingUserData) {
        fetchingUserData.renderInformation(newSec);
      }
      //! ------------------------------------------------ Posts
      const fetchingPostData = await App.getFetchUserInfo().fetchPostsData(
        userId
      );
      //Todo ------------------------ Render Posts
      //? ------------
      const getCat = await App.fetchCategory().getCategories();
      const sample = {};
      getCat.forEach((element) => {
        sample[element.id] = element.name;
      });
      //? ------------
      const container = newSec.querySelector("#post-container");
      const template = newSec.querySelector("#post-template");
      if (fetchingPostData) {
        fetchingPostData.forEach((post) => {
          container.append(post.renderPosts(template, sample));
        });
      }
      //! ------------------------ Return
      return newSec.innerHTML;
    } catch (error) {
      console.error(error);
    }
  }
  //? ----------------------- afterRendering
  afterRendering() {
    //! ----------------------- Blog Page
    console.log("User Page");
  }
}
