//! ----------------------------------------------- Router
export class Router {
  constructor(allpages) {
    this.allpages = allpages;
  }

  //? ----------------------- navigateTo
  navigateTo(page, main, addToHistory = true) {
    const findy = this.allpages.find((event) => event.targetName === page);
    if (findy === undefined) {
      return;
    } else {
      findy.renderContent(main);

      //? ------------ Condition
      if (addToHistory) {
        history.pushState({ content: page }, "", page);
      } else {
        history.replaceState({ content: page }, "", page);
      }
    }
  }
}
