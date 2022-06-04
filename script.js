const menuBtn = document.querySelector('#menu-btn');
const menu = document.querySelector('#menu');

const handleExpandAndClose = (isOpen, clickElement, expandElement, className = '') => {

  clickElement.setAttribute('aria-expanded', !isOpen);
  // expandElement.hidden = !expandElement.hidden;

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

menuBtn.addEventListener('click', () => {
  const isOpen = JSON.parse(menuBtn.getAttribute('aria-expanded'));
  handleExpandAndClose(isOpen, menuBtn, menu, 'menu-transition');
});

menu.addEventListener('click', (e) => {
  if(e.offsetX < 0){
    handleExpandAndClose(true, menuBtn, menu, 'menu-transition');
  }
});

const closeMenuBtn = document.querySelector('#close-menu-btn');

closeMenuBtn.addEventListener('click', () => {
  handleExpandAndClose(true, menuBtn, menu, 'menu-transition');
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
