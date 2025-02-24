//! ----------------------------------------------- Import
//! ----------------------------------------------- Home Page
export class PostsBlogs {
  constructor() {}
  //? ----------------------- renderPostBlog
  renderPostBlog(newSec, posts) {
    //! ---------------------------------------------- New Post
    const publishPost = newSec.querySelector(".publish-post");
    if (+posts.valid === 0) {
      publishPost.classList.replace("d-none", "d-flex");
      publishPost.setAttribute("data-postId", posts.id);
    }
    //! ---------------------------------------------- Old Post
    //Todo ----------------------- Set User Id
    const userId = newSec.querySelectorAll(".user__id-giver");
    userId.forEach((element) => {
      element.setAttribute("data-userId", posts.user_id);
    });
    //Todo ----------------------- Author Name
    const name = newSec.querySelectorAll(".name-author");
    name.forEach((element) => {
      element.innerHTML = posts.username;
    });
    //Todo ----------------------- Author Image
    const img = newSec.querySelectorAll(".img-author");
    img.forEach((element) => {
      element.src = posts.user_imageurl;
    });
    //Todo ----------------------- Time Read
    newSec.querySelector("#time-blog").innerText = posts.timeread;
    //Todo ----------------------- Time Blog
    newSec.querySelector("#time-publish").innerText = posts.time_frame;
    //Todo ----------------------- Blog Title
    newSec.querySelector("#blog-title").innerText = posts.title;
    //Todo ----------------------- Blog Tag
    const sample = posts.tags.split(",").join("   _   ");
    newSec.querySelector("#post-tags").innerText = sample;
    //Todo ----------------------- Blog Descripti
    newSec.querySelector("#blog-description").innerHTML = posts.description;
    //Todo ----------------------- Return
    return newSec;
  }
}
