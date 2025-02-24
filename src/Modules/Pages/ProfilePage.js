//! ----------------------------------------------- Import
import { App } from "../App.js";
import { Page } from "../Models/Page.js";
import { SelectedDirectory } from "../Utils/SelectedDirectory.js";
//! ----------------------------------------------- Home Page
export class ProfilePage extends Page {
  //? ----------------------- beforeRendering
  async beforeRendering(html) {
    try {
      //! ----------------------- Boolean Amount For Fetching My Post
      const welcome = document.getElementById("welcome");
      const welcomeAttr = welcome.getAttribute("data-write-bool");
      let final;
      if (welcomeAttr) {
        final = Boolean(welcomeAttr);
      }
      //! ----------------------- newSec
      const newSec = document.createElement("section");
      newSec.innerHTML = html;
      //! ----------------------- Find Element
      //Todo ------------ Get Name
      const getName = localStorage.getItem("Name");
      //Todo ------------ Condition
      if (getName) {
        newSec.querySelector("#user-name").innerHTML = getName;
      }
      //! ----------------------- Rendering First page Posts
      //Todo ----------- Elements
      const articleItems = await App.getMyQuotesDetailes().fetchItems(final);
      const postContainer = newSec.querySelector("#post-container");
      const emptyPosted = newSec.querySelector("#emptyPosted");
      //Todo ----------- Condition
      if (articleItems.length > 0 && articleItems) {
        emptyPosted.remove();
        articleItems.forEach((article) => {
          postContainer.prepend(article.RenderItems(newSec));
        });
      }
      //! ----------------------- Return
      return newSec.innerHTML;
    } catch (error) {
      console.error(error);
    }
  }
  //? ----------------------- afterRendering
  afterRendering() {
    //! ----------------------- Call Select Settings Directory
    new SelectedDirectory().clickedItem();
    //! ----------------------- Delete Post Click
    const deletePost = document.querySelectorAll(".delete-post");
    deletePost.forEach((element) => {
      element.addEventListener("click", async (event) => {
        const getId = event.currentTarget.getAttribute("data-postId");
        const con = confirm("آیا مطمئن به حذف هستید");
        await App.getMyQuotesDetailes().fetchDeletingPost(getId, con);
      });
    });
    //Todo ------------ Profile Name
    console.log("Profile Page");
  }
  //? ----------------------- Must Be Logged
  mustBeLogged() {
    return true;
  }
}
