//! ----------------------------------------------- Import
import axios from "axios";
import { url } from "../../../../Utils/Options";
import { PostsContents } from "../Contents/PostsContents";
//! ----------------------------------------------- HomeServices Page
export class PostsFetching {
  constructor() {
    this.homeArray = [];
  }
  //todo ----------------------- loadPosts
  async getPosts(writeFetchBool) {
    try {
      if (this.homeArray.length > 0 && writeFetchBool !== true) {
        return this.homeArray;
      } else {
        const { data: response } = await axios.get(`${url}/quotes`);
        this.homeArray = response.map((element) => new PostsContents(element));
        return this.homeArray;
      }
    } catch (error) {
      console.error(error);
    }
  }
}
