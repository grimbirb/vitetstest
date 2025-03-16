import './style.css'
import page from 'page';

page('/', () => {
  document.getElementById('app')!.innerHTML = `<h1>Home Page</h1>`
});
page('/about', () => {
  document.getElementById('app')!.innerHTML = `<h1>About Page</h1>`
});

page();
