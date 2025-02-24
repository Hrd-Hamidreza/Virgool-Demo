//! ----------------------------------------------- Import
import { App } from "../App";
import { Page } from "../Models/Page";
import { CheckingArticle } from "../Services/Profile/Article/CheckingArticle/CheckingArticle";
import { FetchingArticle } from "../Services/Profile/Article/FetchingArticle/FetchingArticle";
//! ----------------------------------------------- Home Page
export class PostPage extends Page {
  //? ----------------------- beforeRendering
  async beforeRendering(html) {
    try {
      //Todo ------------ getCat
      const getCat = await App.fetchCategory().getCategories();
      //Todo ------- ContentSettings
      const finalHtml = App.getArticleSettings().sortCategories(html, getCat);
      //Todo ------------ Return
      return finalHtml;
    } catch (error) {
      console.error(error);
    }
  }
  //? ----------------------- afterRendering
  afterRendering() {
    //Todo ------------ ckEditorSetting (Text Editor)
    this.ckEditorSetting();
    //Todo ------------ FetchingContent
    if (new CheckingArticle().publishClicking()) {
      //! ------------ Range Num
      App.getArticleSettings().rangeNum();
      //! ------------ Tag Type
      App.getArticleSettings().tagType();
      //! ------------ Upload Image
      App.getArticleSettings().uploadImage();
      //Todo ------------ Fetch Datas
      new FetchingArticle().publishClick();
    }
    //Todo ------------ Post Page
    console.log("Post Page");
  }
  //? ----------------------- Must Be Logged
  mustBeLogged() {
    return true;
  }
  //? ----------------------- ckEditorSetting
  ckEditorSetting() {
    const { ClassicEditor, Essentials, Bold, Italic, Font, Paragraph } =
      CKEDITOR;
    ClassicEditor.create(document.querySelector("#editor"), {
      language: "fa",
      licenseKey:
        "eyJhbGciOiJFUzI1NiJ9.eyJleHAiOjE3NjcxMzkxOTksImp0aSI6IjM5YWY3NmQ1LWI0ZjAtNGE3Ni04YzljLWE5N2EwMmZjMGFhNCIsImxpY2Vuc2VkSG9zdHMiOlsiMTI3LjAuMC4xIiwibG9jYWxob3N0IiwiMTkyLjE2OC4qLioiLCIxMC4qLiouKiIsIjE3Mi4qLiouKiIsIioudGVzdCIsIioubG9jYWxob3N0IiwiKi5sb2NhbCJdLCJ1c2FnZUVuZHBvaW50IjoiaHR0cHM6Ly9wcm94eS1ldmVudC5ja2VkaXRvci5jb20iLCJkaXN0cmlidXRpb25DaGFubmVsIjpbImNsb3VkIiwiZHJ1cGFsIl0sImxpY2Vuc2VUeXBlIjoiZGV2ZWxvcG1lbnQiLCJmZWF0dXJlcyI6WyJEUlVQIl0sInZjIjoiYzdkOTkzYmMifQ.v8rsz4AuJjp33-1_O90NT2OErFUlRgkE0trjzJiyQQgm7QUqtLLJXl7GOmXxUBbUy1eY0yOyZDSrF35jKa5iOA", // Create a free account on https://portal.ckeditor.com/checkout?plan=free
      plugins: [Essentials, Bold, Italic, Font, Paragraph],
      toolbar: [
        "undo",
        "redo",
        "|",
        "bold",
        "italic",
        "|",
        "fontSize",
        "fontFamily",
        "fontColor",
        "fontBackgroundColor",
      ],
    })
      .then((editor) => {
        window.editor = editor;
      })
      .catch((error) => {
        console.error(error);
      });
  }
}
