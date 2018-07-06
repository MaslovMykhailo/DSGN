document.getElementById('but').addEventListener('click', clickOnMenuButton);
document.getElementById('menu').addEventListener('click', clickOnMenu);

var menuIsOpen = false;
var ids = ['but', 'ln', 'adr', 'tel'];

function clickOnMenu() {
  closeMenu(ids);
  menuIsOpen = !menuIsOpen;
}

function clickOnMenuButton() {

  if (menuIsOpen) {
    closeMenu(ids);
  } else {
    openMenu(ids);
  }
  
  menuIsOpen = !menuIsOpen;
}

function addOpenMenuClassToElement(id) {
  document.getElementById(id).classList.add('menu-open-' + id);
}

function delOpenMenuClassToElement(id) {
  document.getElementById(id).classList.remove('menu-open-' + id);
}

function openMenu(ids) {
  var menu = document.getElementById('menu');
  menu.classList.remove('menu-close');
  menu.classList.add('menu-open');
  ids.forEach(function(i) { addOpenMenuClassToElement(i) });
}

function closeMenu(ids) {
  var menu = document.getElementById('menu');
  menu.classList.remove('menu-open');
  menu.classList.add('menu-close');
  ids.forEach(function(i) { delOpenMenuClassToElement(i) });
}

