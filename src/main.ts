import "./style.css";

class Router {
  routes: { [key: string]: Function } = {};
  basePath: string;

  constructor(basePath: string = "") {
    this.basePath = basePath.replace(/\/$/, ""); // remove trailing slash if present
    window.addEventListener("popstate", () =>
      this.route(window.location.pathname.replace(this.basePath, ""))
    );
  }

  // register a route and its handler
  addRoute(path: string, handler: Function) {
    this.routes[path] = handler;
  }

  // navigate to a new route
  navigate(path: string) {
    const fullPath = this.basePath + path;
    history.pushState({}, "", fullPath);
    this.route(path);
  }

  route(path: string) {
    path = path.replace(this.basePath, ""); // remove base path before checking routes
    const handler = this.routes[path];
    if (handler) {
      handler();
    } else {
      this.handle404();
    }
  }

  // default 404 handler
  handle404() {
    const app = document.getElementById("app");
    if (app) {
      app.innerHTML = "<h1>404 - Not Found</h1>";
    }
  }
}

const router = new Router(
  window.location.origin.includes("github.io") ? "/vitetstest" : "/"
);

// route handlers
router.addRoute("/", () => {
  const app = document.getElementById("app");
  if (app) {
    app.innerHTML = "<h1>Home Page</h1>";
  }
});

router.addRoute("/about", () => {
  const app = document.getElementById("app");
  if (app) {
    app.innerHTML = "<h1>About Page</h1>";
  }
});

// Set up navigation links
document.getElementById("home-link")?.addEventListener("click", (event) => {
  event.preventDefault();
  router.navigate("/");
});

document.getElementById("about-link")?.addEventListener("click", (event) => {
  event.preventDefault();
  router.navigate("/about");
});

// Handle initial page load
router.route(window.location.pathname.replace(router.basePath, ""));
