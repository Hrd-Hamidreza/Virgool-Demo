//! ----------------------------------------------- Import
import axios from "axios";
import { RenderTagBlog } from "../content/RenderTagBlog";
import { url } from "../../../../../Utils/Options";
//! ----------------------------------------------- Home Page
export class FetchTagBlog {
  constructor() {
    this.catArr = [];
  }
  //todo ----------------------- Fetch Content
  async fetchContent(id) {
    try {
      //! ----------------------- response
      const { data: response } = await axios.get(`${url}/category/${id}`);
      if (response.posts.status === "error") {
        return {
          result: false,
          errorMessage: response.posts.message,
          tagName: response.name,
        };
      } else {
        this.catArr = response.posts.map((post) => new RenderTagBlog(post));
        return this.catArr;
      }
    } catch (error) {
      console.error(error);
    }
  }
}
