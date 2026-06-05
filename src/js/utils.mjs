// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const requested = urlParams.get(`${param}`);

  return requested;
}

export function renderListWithTemplate(templateFn, parentElement, list, position = "afterbegin", clear = false) {
  if (clear) {
        parentElement.innerHTML = "";
      }
  list.forEach(product => {
      parentElement.insertAdjacentHTML(position, templateFn(product));
  });
}

export function renderWithTemplate(template, parentElement, data, callback) {
  parentElement.insertAdjacentHTML("afterbegin", template);
  if (callback) {
    callback(data);
  }
}

async function loadTemplate(path) {
  const res = await fetch(path);
  const template = await res.text();
  return template;
}

export async function loadHeaderFooter() {
  const header = await loadTemplate("/partials/header.html");
  const footer = await loadTemplate("/partials/footer.html");

  const headerElement = document.getElementById('main-header');
  const footerElement = document.getElementById('main-footer');

  renderWithTemplate(header, headerElement);
  renderWithTemplate(footer, footerElement);
}

export function alertMessage(message, scroll = true) {

  const alert = document.createElement('div');
  alert.classList.add('alert');

  alert.innerHTML = `
    <span>${message}</span>
    <span class="alert-close">X</span>
  `;
  
  alert.addEventListener('click', function(e) {
    
    if (e.target.classList.contains('alert-close') || e.target.innerText === 'X') {
      const main = document.querySelector('main');
      main.removeChild(this); 
    }
  });

  const main = document.querySelector('main');
  main.prepend(alert);

  if (scroll) {
    window.scrollTo(0, 0);
  }
}