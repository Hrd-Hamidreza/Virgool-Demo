//! ----------------------------------------------- Import
import axios from "axios";
import { url } from "../../../../../Utils/Options";
import { PodcastsContents } from "../contents/podcastsContents";
//! ----------------------------------------------- podcastsFetching Page
export class podcastsFetching {
  constructor() {
    this.newPodArray = [];
  }
  //todo ----------------------- getPodcasts
  async getPodcasts() {
    try {
      if (this.newPodArray.length === 0) {
        const { data: response } = await axios.get(`${url}/podcast`);
        this.newPodArray = response.podcasts.map(
          (element) => new PodcastsContents(element)
        );
        return this.newPodArray;
      } else {
        return this.newPodArray;
      }
    } catch (error) {
      console.error(error);
    }
  }
}
