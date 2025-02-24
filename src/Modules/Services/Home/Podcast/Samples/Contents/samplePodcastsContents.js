//! ----------------------------------------------- Import
//! ----------------------------------------------- podcastsContents Page
export class SamplePodcastsContents {
  constructor(podcastSamples) {
    for (let key in podcastSamples) {
      this[key] = podcastSamples[key];
    }
  }
  //todo ----------------------- RenderFisrt
  renderFisrt(soundTemplate) {
    const innerAccess = document.importNode(soundTemplate.content, true);
    //! ------------ Sound Img
    innerAccess.querySelector("#sound-img").src = this.srccover;
    //! ------------ Sound Text
    innerAccess.querySelector("#sound-text").innerText = this.title;
    //! ------------ Sound Time
    innerAccess.querySelector("#sound-time").innerText = this.time;
    //! ------------ Sound Src
    innerAccess.querySelector("#sound-src").dataset.src = this.podcasturl;
    //! ------------ Return
    return innerAccess;
  }
  //todo -----------------------
}
