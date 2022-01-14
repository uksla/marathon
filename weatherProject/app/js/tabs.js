import {
  UI_ELEMENTS
} from "./view.js"

function selectTabNav() {
  UI_ELEMENTS.tabNav.forEach(item => {
    item.classList.remove('is-active')
  });
  this.classList.add('is-active')
  console.log(this);
  UI_ELEMENTS.tabName = this.getAttribute('data-tab-name');
  console.log(UI_ELEMENTS.tabName);
  selectTabContent(UI_ELEMENTS.tabName);
}

function selectTabContent(tabName) {
  UI_ELEMENTS.tabContent.forEach(item => {
    item.classList.contains(UI_ELEMENTS.tabName) ? item.classList.add('is-active') : item.classList.remove('is-active')
  })
}

export {selectTabNav, selectTabContent}