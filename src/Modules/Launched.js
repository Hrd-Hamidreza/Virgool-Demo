//! ----------------------------------------------- Import
import { Router } from "./Routes/Router.js";
import { routes } from "../routes.js";
import { PostsFetching } from "./Services/Home/Post/Data/postsFetching.js";
import { podcastsFetching } from "./Services/Home/Podcast/Types/Data/PodcastsFetching.js";
import { CategoriesFetching } from "./Services/Home/Category/Data/categoriesFetching.js";
import { SamplePodcastsFetching } from "./Services/Home/Podcast/Samples/Data/samplePodcastsFetching.js";
import { AuthorizationLogin } from "./Services/Login/AuthorizationLogin.js";
import { ArticleSettings } from "./Services/Profile/Article/ArticleSettings/ArticleSettings.js";
import { GettingDirectoriesData } from "./Services/Profile/Main/GettingDirectoriesData/GettingDirectoriesData.js";
import { FetchingSettingData } from "./Services/Profile/Settings/FetchingSettingData/FetchingSettingData.js";
import { ProfileHeaderBox } from "./Components/ProfileHeaderBox/ProfileHeaderBox.js";
import { ChangingTheme } from "./Utils/ChangingTheme.js";
import { FetchUserInfo } from "./Services/User/FetchUserInfo/FetchUserInfo.js";
import { FetchTagBlog } from "./Services/Home/Category/TagBlog/Data/FetchTagBlog.js";
import { FetchingSearch } from "./Services/Home/Search/FetchingSearch/FetchingSearch.js";
import { MediatorSearch } from "./Services/Home/Search/MediatorSearch/MediatorSearch.js";
import { SaverHistory } from "./Utils/SaverSearchHistory.js";
//! ----------------------------------------------- Launched Class
export class Launched {
  constructor() {
    this.main;
    this.sample = routes;
    this.router = new Router(this.sample);
    this.PostsFetching = new PostsFetching();
    this.podcastsFetching = new podcastsFetching();
    this.categoriesFetching = new CategoriesFetching();
    this.fetchTagBlog = new FetchTagBlog();
    this.samplePodcastsFetching = new SamplePodcastsFetching();
    this.authorizationLogin = new AuthorizationLogin();
    this.articleSettings = new ArticleSettings();
    this.gettingDirectoriesDataiesData = new GettingDirectoriesData();
    this.fetchingSettingData = new FetchingSettingData();
    this.btnDatails = new ProfileHeaderBox();
    this.changingTheme = new ChangingTheme();
    this.fetchUserInfo = new FetchUserInfo();
    this.fetchingSearch = new FetchingSearch();
    this.mediatorSearch = new MediatorSearch();
    this.saverHistory = new SaverHistory();
    this.handleNavigateLinks();
    this.handleHistory();
    this.handleFirstPage();
  }

  //? ----------------------- handleNavigateLinks
  handleNavigateLinks() {
    //! ---------------------------------------------------- Click
    document.addEventListener("click", (event) => {
      if (
        event.target.tagName === "INPUT" ||
        event.currentTarget.tagName === "INPUT"
      ) {
        return;
      }
      event.preventDefault();
      this.main = event.target.closest("A");
      if (this.main) {
        //! -------------------------- Page
        const page = this.main.pathname.substring(1); //! Or slice(1)
        //! -------------------------- data-postId
        this.router.navigateTo(page, this.main);
      }
    });
  }

  //? ----------------------- handleHistory
  handleHistory() {
    window.addEventListener("popstate", (event) => {
      const target = event.state ? event.state.content : "home";
      this.router.navigateTo(target, this.main, false);
    });
  }

  //? ----------------------- handleFirstPage
  handleFirstPage() {
    //! ----------------------- Theme
    this.changingTheme.getLocalStorage();
    //! ----------------------- First Page
    this.router.navigateTo("home");
  }
}
