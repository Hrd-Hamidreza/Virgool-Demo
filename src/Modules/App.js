//! ----------------------------------------------- Import
import axios from "axios";
import { Launched } from "./Launched.js";
import { tokenQ } from "./Utils/Options.js";
//! ----------------------------------------------- App
export class App {
  //todo ----------------------- init
  static init() {
    axios.defaults.headers.common["Accept"] = "application/json";
    axios.defaults.headers.common["Authorization"] = `Bearer ${tokenQ}`;
    this.launched = new Launched();
  }
  //todo ----------------------- getRouter
  static getRouter() {
    return this.launched.router;
  }
  //todo ----------------------- fetchPost
  static fetchPost() {
    return this.launched.PostsFetching;
  }
  //todo ----------------------- fetchPodcast
  static fetchPodcast() {
    return this.launched.podcastsFetching;
  }
  //todo ----------------------- fetchCategory
  static fetchCategory() {
    return this.launched.categoriesFetching;
  }
  //todo ----------------------- tagsBlog
  static tagsBlogGet() {
    return this.launched.fetchTagBlog;
  }
  //todo ----------------------- idCatShow
  static idCatShow() {
    return this.launched.samplePodcastsFetching;
  }
  //todo ----------------------- getTokenCode
  static getTokenCode() {
    return this.launched.authorizationLogin;
  }
  //todo ----------------------- articleSettings
  static getArticleSettings() {
    return this.launched.articleSettings;
  }
  //todo ----------------------- getMyQuotesDetailes
  static getMyQuotesDetailes() {
    return this.launched.gettingDirectoriesDataiesData;
  }
  //todo ----------------------- getMyQuotesDetailes
  static getProfileSetting() {
    return this.launched.fetchingSettingData;
  }
  //todo ----------------------- getThemeDetails
  static getThemeDetails() {
    return this.launched.changingTheme;
  }
  //todo ----------------------- getThemeDetails
  static getFetchUserInfo() {
    return this.launched.fetchUserInfo;
  }
  //todo ----------------------- Get Search Data
  static getSearchData() {
    return this.launched.fetchingSearch;
  }
  //todo ----------------------- Get Mediator
  static getMediator() {
    return this.launched.mediatorSearch;
  }
  //todo ----------------------- Get Saver
  static getSaverHistory() {
    return this.launched.saverHistory;
  }
}
