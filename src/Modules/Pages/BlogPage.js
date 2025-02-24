//! ----------------------------------------------- Import
import { App } from "../App.js";
import { Page } from "../Models/Page.js";
import { PostsBlogs } from "../Services/Home/Post/PostsBlogs/PostsBlogs.js";
//! ----------------------------------------------- Home Page
export class BlogPage extends Page {
  //? ----------------------- beforeRendering
  async beforeRendering(html, main) {
    try {
      //! ----------------------- Main
      const newSec = document.createElement("section");
      newSec.innerHTML = html;
      //! ----------------------- Posts
      //! ----------------------- History Saver
      const placeCenter = main.getAttribute("place");
      const placeCenterCase = App.getSaverHistory().blogHistory(placeCenter);
      let finalPlace;
      if (placeCenter) {
        finalPlace = placeCenter;
      } else {
        finalPlace = placeCenterCase;
      }
      //! -----------------------
      let headArr;
      if (finalPlace === "peopleQuotes") {
        headArr = await App.fetchPost().getPosts();
      } else {
        headArr = await App.getMyQuotesDetailes().fetchItems();
      }
      //! ----------------------- Post Id
      const postId = main.getAttribute("data-postid");
      const postIdCase = App.getSaverHistory().postHistory(postId);
      let finalPostId;
      if (postId) {
        finalPostId = postId;
      } else {
        finalPostId = postIdCase;
      }
      //! -----------------------
      const finalPost = headArr.find((post) => +post.id === +finalPostId);
      new PostsBlogs().renderPostBlog(newSec, finalPost);
      //! ----------------------- Return
      return newSec.innerHTML;
    } catch (error) {
      console.error(error);
    }
  }
  //? ----------------------- afterRendering
  afterRendering() {
    //todo ----------------------- Click Publish
    const publishPost = document.querySelector(".publish-post");
    publishPost.addEventListener("click", async (event) => {
      const idNumber = event.currentTarget.getAttribute("data-postId");
      await App.getMyQuotesDetailes().fetchPublishPost(+idNumber);
    });
    //todo ----------------------- Blog Page
    console.log("Blog Page");
  }
}
