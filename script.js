const menuBtn = document.querySelector('#menu-btn');
const menu = document.querySelector('#menu');
const tabIndexItemList = ['#menu-btn', ".header__home-link", '.main-section__btn'];

const handleExpandAndClose = (isOpen, clickElement, expandElement, className = '') => {

  clickElement.setAttribute('aria-expanded', !isOpen);
  if(className){
    expandElement.classList.toggle(className);
  }
  if(!isOpen) {
    if(expandElement.querySelector('button')){
      expandElement.querySelector('button').focus();
      return null;
    };
    if( expandElement.querySelector('a')){
      expandElement.querySelector('a').focus();
      return null;
    }
  };
  return null;
}

const handleOutsideClick = (element, btn, callbackFunction = () => {}) => {
  const onClick = (event) => {

    if(!element.contains(event.target) && event.target !== btn){
      callbackFunction();
      document.body.removeEventListener("click", onClick);
    }

    return null;
  }

  document.body.addEventListener("click", onClick);
}

const handleTabIndexOutsideMenu = () => {
  tabIndexItemList.forEach((query) => {
    let element = document.querySelector(query);
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
}

menuBtn.addEventListener('click', () => {
  const isOpen = JSON.parse(menuBtn.getAttribute('aria-expanded'));
  handleExpandAndClose(isOpen, menuBtn, menu, 'menu-transition');
  handleTabIndexOutsideMenu();
});

menu.addEventListener('click', (e) => {
  if(e.offsetX < 0){
    handleExpandAndClose(true, menuBtn, menu, 'menu-transition');
    handleTabIndexOutsideMenu();
  }
});

const closeMenuBtn = document.querySelector('#close-menu-btn');

closeMenuBtn.addEventListener('click', () => {
  handleExpandAndClose(true, menuBtn, menu, 'menu-transition');
  handleTabIndexOutsideMenu();
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

    handleOutsideClick(expandList.children[0], btn, () => {handleExpandAndClose(true, btn, expandList, 'dropdown-transition'); arrowIcon.setAttribute('src', './img/icon-arrow-down.svg')});

  });
});
