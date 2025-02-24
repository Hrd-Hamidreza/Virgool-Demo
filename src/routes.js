//! ----------------------------------------------- Import
import { BlogPage } from "./Modules/Pages/BlogPage.js";
import { HomePage } from "./Modules/Pages/HomePage.js";
import { LoginPage } from "./Modules/Pages/LoginPage.js";
import { PostPage } from "./Modules/Pages/PostPage.js";
import { ProfilePage } from "./Modules/Pages/ProfilePage.js";
import { RegisterPage } from "./Modules/Pages/RegisterPage.js";
import { SearchPage } from "./Modules/Pages/SearchPage.js";
import { SettingPage } from "./Modules/Pages/SettingPage.js";
import { SubjectPage } from "./Modules/Pages/SubjectPage.js";
import { TagPage } from "./Modules/Pages/TagPage.js";
import { UserPage } from "./Modules/Pages/UserPage.js";
import { VerifyPage } from "./Modules/Pages/VerifyPage.js";
//! ----------------------------------------------- Array
export const routes = [
  new HomePage("home", "home.html"),
  new BlogPage("blog", "blog.html"),
  new TagPage("tag", "tag.html"),
  new RegisterPage("register", "register.html"),
  new VerifyPage("verify", "verify.html"),
  new LoginPage("login", "login.html"),
  new ProfilePage("profile", "profile.html"),
  new PostPage("post", "post.html"),
  new SettingPage("setting", "setting.html"),
  new SubjectPage("subject", "subject.html"),
  new UserPage("user", "user.html"),
  new SearchPage("search", "search.html"),
];
