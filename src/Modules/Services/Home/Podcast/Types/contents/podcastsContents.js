//! ----------------------------------------------- Import
//! ----------------------------------------------- podcastsContents Page
export class PodcastsContents {
  constructor(podcasts) {
    for (let key in podcasts) {
      this[key] = podcasts[key];
    }
  }
  //todo ----------------------- RenderPosts
  renderPodcast(html) {
    const innerAccess = document.importNode(html.content, true);
    //! ------------ PodCasts Img
    innerAccess.getElementById("swiper-img").src = this.thumbnail;
    //! ------------ PodCasts Name
    innerAccess.getElementById("swiper-img").setAttribute("alt", this.name);
    //! ------------ PodCasts Id
    const samCatId = innerAccess.querySelectorAll(".chosen");
    samCatId.forEach((element) => {
      element.setAttribute("data-sampleCatId", this.id);
    });
    //! ------------ Return
    return innerAccess;
  }
}
