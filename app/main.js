// main.js — the router. Each section of the site is a hash route rendered by
// views.js into <main id="app">; the nav highlights the route on screen, and
// the Provinces page gets its table controls wired after it renders.

import { economyView, overviewView, populationView, provincesView, societyView, sourcesView, wireProvinces } from './views.js';

const ROUTES = {
  '/': { view: overviewView, title: 'Indonesia in Numbers — National Statistics' },
  '/population': { view: populationView, title: 'Population — Indonesia in Numbers' },
  '/economy': { view: economyView, title: 'Economy — Indonesia in Numbers' },
  '/society': { view: societyView, title: 'Society — Indonesia in Numbers' },
  '/provinces': { view: provincesView, title: 'Provinces — Indonesia in Numbers' },
  '/sources': { view: sourcesView, title: 'Sources & method — Indonesia in Numbers' },
};

function currentRoute() {
  const hash = window.location.hash.replace(/^#/, '');
  return Object.prototype.hasOwnProperty.call(ROUTES, hash) ? hash : '/';
}

function render() {
  const route = currentRoute();
  const page = ROUTES[route];
  document.title = page.title;
  const app = document.getElementById('app');
  app.innerHTML = page.view();
  document.querySelectorAll('.main-nav a').forEach((a) => {
    a.classList.toggle('nav-on', a.dataset.route === route);
  });
  if (route === '/provinces') wireProvinces();
  window.scrollTo(0, 0);
}

window.addEventListener('hashchange', render);
render();
