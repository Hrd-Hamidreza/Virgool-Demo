//! ----------------------------------------------- Import
import { url } from "../../../../../Utils/Options";
//! ----------------------------------------------- Home Page
export class RenderTagBlog {
  constructor(posts) {
    for (let key in posts) {
      this[key] = posts[key];
    }
  }
  //todo ----------------------- renderTagBlogs
  renderTagBlogs(newSec, TagName) {
    const templateElm = newSec.querySelector("#category-template");
    //! --------------------------------------------------------------------- Main
    const main = document.importNode(templateElm.content, true);
    //! --------------------------------------------------------------------- Give Id
    const sampleId = main.querySelectorAll(".chosen");
    sampleId.forEach((element) => {
      element.setAttribute("data-postId", this.id);
      element.setAttribute("place", "peopleQuotes");
    });
    //! --------------------------------------------------------------------- Tag Name
    TagName.innerHTML = this.category_name;
    //! --------------------------------------------------------------------- Post Title
    main.querySelector("#post-title").innerHTML = this.title;
    //! --------------------------------------------------------------------- Post Image
    main.querySelector("#post-image").src = `${url}/${this.imageUrl}`;
    //! --------------------------------------------------------------------- Post publish
    main.querySelector("#post-publish").innerHTML = this.time_frame;
    //! --------------------------------------------------------------------- Post like
    main.querySelector("#post-like").innerHTML = this.likecount;
    //! --------------------------------------------------------------------- Post comment
    main.querySelector("#post-comment").innerHTML = this.commentcount;
    //! --------------------------------------------------------------------- Return
    return main;
  }
}
