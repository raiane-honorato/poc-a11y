const menuBtn = document.querySelector('#menu-btn');
const menu = document.querySelector('#menu');
const tabIndexItemList = ['#menu-btn', ".header__home-link", '.main-section__btn'];
const tabIndexItemList2 = ['#menu-btn', ".header__home-link", '.main-section__btn', "#menu button", "#menu a"];

const handleExpandAndClose = (isOpen, clickElement, expandElement, className = '') => {
  // debugger;

  clickElement.setAttribute('aria-expanded', !isOpen);
  if(isOpen){
    expandElement.classList.remove(className);
  }
  if(!isOpen) {
    expandElement.classList.add(className);

    setTimeout(() => {
      if(expandElement.children[0].getAttribute("tabIndex") === "0"){
        expandElement.children[0].focus();
        return null;
      }
      if(expandElement.querySelector('button')){
        expandElement.querySelector('button').focus();
        return null;
      };
      if( expandElement.querySelector('a')){
        expandElement.querySelector('a').focus();
        return null;
      }
    }, 1001);
  };
} 

const handleOutsideClickAndFocus = (element, btn = [], callbackFunction = () => {}) => {
  const onClick = (event) => {
    if(!element.contains(event.target) && !btn.includes(event.target)){
      callbackFunction();
      document.body.removeEventListener("click", onClick);
      document.body.removeEventListener("focus", onClick, true);
    }

    return null;
  }

  document.body.addEventListener("click", onClick);
  document.body.addEventListener("focus", onClick, true);
}

const handleTabIndexOutsideMenu = (tabIndexItemList) => {
  tabIndexItemList.forEach((query) => {
    let elements = document.querySelectorAll(query);
    elements.forEach(element => {
      let elementTabIndex = element.tabIndex;
      if(elementTabIndex === 0){
        element.setAttribute("tabIndex", -1);
        return null;
      }
      if(elementTabIndex === -1){
        element.setAttribute("tabIndex", 0);
        return null;
      }
    })
  })
}

const handleOpenAlert = (message) => {
  let alert = document.querySelector("#alert");
  let alertSection = document.querySelector(".alert-section");
  alertSection?.classList?.add("alert-section--transition");

  alert.textContent = message;

  let closeBtn = document.querySelector(".alert__close-btn");
  closeBtn?.addEventListener("click", handleCloseAlert);

  setTimeout(handleCloseAlert, 4000);
}

const handleCloseAlert = () => {
  let alert = document.querySelector("#alert");
  let alertSection = document.querySelector(".alert-section");
  alertSection.classList.remove("alert-section--transition");

  alert.textContent = "";
};

menuBtn.addEventListener('click', () => {
  const isOpen = JSON.parse(menuBtn.getAttribute('aria-expanded'));
  handleExpandAndClose(isOpen, menuBtn, menu, 'menu-transition');
  handleTabIndexOutsideMenu(tabIndexItemList);
});

menu.addEventListener('click', (e) => {
  if(e.offsetX < 0){
    handleExpandAndClose(true, menuBtn, menu, 'menu-transition');
    handleTabIndexOutsideMenu(tabIndexItemList);
  }
});

const closeMenuBtn = document.querySelector('#close-menu-btn');

closeMenuBtn.addEventListener('click', () => {
  handleExpandAndClose(true, menuBtn, menu, 'menu-transition');
  handleTabIndexOutsideMenu(tabIndexItemList);
});

const menuDropdownBtn = document.querySelectorAll('.navigation__menu-btn-dropdown');

menuDropdownBtn.forEach((btn) => {
  btn.addEventListener('click', () => {

    const isOpen = JSON.parse(btn.getAttribute('aria-expanded'));
    
    const arrowIcon = btn.children[0];
    let iconAddress = isOpen ? './img/icon-arrow-down.svg' : './img/icon-arrow-up.svg';
    
    arrowIcon.setAttribute('src', iconAddress);
    
    const expandList = btn.nextElementSibling;
    
    handleExpandAndClose(isOpen, btn, expandList, 'dropdown-transition');

    handleOutsideClickAndFocus(expandList.children[0], [btn], () => {handleExpandAndClose(true, btn, expandList, 'dropdown-transition'); arrowIcon.setAttribute('src', './img/icon-arrow-down.svg')});

  });
});

const popupSection = document.querySelector(".popup-section");
const learnButton = document.querySelector(".main-section__btn");
const popupCloseBtn = document.querySelector(".popup-wrap__close-btn");

learnButton.addEventListener('click', () => {
  handleExpandAndClose(false, learnButton, popupSection, 'popup-section--transition');
  handleTabIndexOutsideMenu(tabIndexItemList2);
  handleOutsideClickAndFocus(popupSection.children[0], [learnButton,popupCloseBtn], () => {
    handleExpandAndClose(true, learnButton, popupSection, 'popup-section--transition');
    handleTabIndexOutsideMenu(tabIndexItemList2);
    learnButton.focus();
  });

});

popupCloseBtn.addEventListener("click", () => {
  handleExpandAndClose(true, learnButton, popupSection, 'popup-section--transition');
  handleTabIndexOutsideMenu(tabIndexItemList2);
  learnButton.focus();
});

const signUpBtn = document.querySelector(".popup-wrap__form__btn");

signUpBtn.addEventListener("click", (e) => {
  e.preventDefault();
  let form = document.querySelector(".popup-wrap__form");
  let inputList = form.querySelectorAll("input");
  let hasEmpty = false;

  for(let inputObject of inputList) {
    if(inputObject?.value === ''){
      hasEmpty = true;
      handleOpenAlert("Preencha o campo em branco");
      inputObject.focus();
      break;
    }
  }

  if(!hasEmpty) {
    handleOpenAlert("Inscrição feita com sucesso!");
    handleExpandAndClose(true, learnButton, popupSection, 'popup-section--transition');
    handleTabIndexOutsideMenu(tabIndexItemList2);
    learnButton.focus();
  }

});

const skipButton = document.querySelector(".header__skip-navigation");

skipButton.addEventListener("click", () => {
  let mainContent = document.querySelector("#main-content");
  mainContent.setAttribute("tabIndex", 0);
  mainContent.focus();
  mainContent.setAttribute("tabIndex", -1);
})