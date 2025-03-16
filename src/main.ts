import './style.css'

class Router {
  routes: { [key: string]: Function } = {};
  basePath: string;
  
  constructor(basePath: string = '') {
    this.basePath = basePath;
    window.addEventListener('popstate', () => this.route(window.location.pathname));
  }

  // Register a route and its handler
  addRoute(path: string, handler: Function) {
    this.routes[this.basePath + path] = handler;
  }

  // Navigate to a new route
  navigate(path: string) {
    const fullPath = this.basePath + path;
    history.pushState({}, '', fullPath);
    this.route(fullPath);
  }

  // Route handler to match the path and render the corresponding content
  route(path: string) {
    const handler = this.routes[path];
    if (handler) {
      handler();
    } else {
      this.handle404();
    }
  }

  // Default 404 handler
  handle404() {
    const app = document.getElementById('app');
    if (app) {
      app.innerHTML = '<h1>404 - Not Found</h1>';
    }
  }
}

const router = new Router('/vitetstest');

// route handlers
router.addRoute('/', () => {
  const app = document.getElementById('app');
  if (app) {
    app.innerHTML = '<h1>Home Page</h1>';
  }
});

router.addRoute('/about', () => {
  const app = document.getElementById('app');
  if (app) {
    app.innerHTML = '<h1>About Page</h1>';
  }
});

// Navigate to a route programmatically
document.getElementById('home-link')?.addEventListener('click', (event) => {
  event.preventDefault();
  router.navigate('/');
});

document.getElementById('about-link')?.addEventListener('click', (event) => {
  event.preventDefault();
  router.navigate('/about');
});

// Call route handler for the initial page load (default route)
router.route(window.location.pathname);

