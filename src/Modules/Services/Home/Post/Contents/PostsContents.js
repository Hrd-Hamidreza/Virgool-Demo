//! ----------------------------------------------- Import
import { url } from "../../../../Utils/Options";
//! ----------------------------------------------- Posts
export class PostsContents {
  constructor(posts) {
    for (let key in posts) {
      this[key] = posts[key];
    }
  }
  //todo ----------------------- Render Posts
  renderPosts(postTemplate, catId) {
    //! ----------------------- Time Difference
    const newDate = new Date();
    const nowDateMilli = newDate.getTime();
    const postDate = new Date(this.created_at);
    const postDateMilli = postDate.getTime();
    const num = +nowDateMilli - +postDateMilli;
    const result = num / 1000 / 60 / 60 / 24;
    const final = result.toFixed(0);
    let timePeriod;
    if (+final <= 31) {
      timePeriod = `${+final} روز پیش`;
    } else if (+final <= 365) {
      const preMonth = +final / 31;
      timePeriod = preMonth.toFixed(0) + " ماه پیش";
    } else {
      const preMonth = +final / 365;
      timePeriod = preMonth.toFixed(0) + " سال پیش";
    }
    //! ------------ Main
    const template = document.importNode(postTemplate.content, true);
    //! ------------ Give Id
    const sampleId = template.querySelectorAll(".chosen");
    sampleId.forEach((element) => {
      if (element.classList.contains("cat__contained")) {
        element.setAttribute("data-categoryId", this.categoryId);
      } else {
        element.setAttribute("data-postId", this.id);
        element.setAttribute("place", "peopleQuotes");
      }
    });
    //! ------------ Set User Id
    const userId = template.querySelector("#setUserId");
    userId.setAttribute("data-userId", this.user_id);
    //! ------------ User Img
    template.querySelector("#author-image").src = this.user_imageurl;
    //! ------------ Post Name
    template.querySelector("#author-name").innerHTML = this.username;
    //! ------------ Post Time
    template.querySelector("#post-publish").innerHTML = timePeriod;
    //! ------------ Post Title
    template.querySelector("#post-title").innerHTML = this.title;
    //! ------------ Post Description
    template.querySelector("#post-description").innerHTML = this.description;
    //! ------------ Post Image
    template.querySelector("#post-image").src = `${url}/${this.imageUrl}`;
    //! ------------ Post Category
    let catIdName;
    if (catId) {
      catIdName = catId[this.categoryId];
    }
    //? ------
    template.querySelector("#post-category").innerHTML =
      this.category_title || catIdName;
    //! ------------ Post readtime
    template.querySelector("#post-readtime").innerHTML = this.timeread;
    //! ------------ Post Like
    template.querySelector("#post-like").innerHTML = this.likecount;
    //! ------------ Post Comment
    template.querySelector("#post-comment").innerHTML = this.commentcount;
    //! ------------ Post Saved
    template.querySelector("#post-save").innerHTML = this.is_liked;
    //! ------------ Return
    return template;
  }
}
