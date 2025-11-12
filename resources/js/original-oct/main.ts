import './assets/css/lib/glightbox.css';
import './assets/css/lib/noty.scss';
import tiptap from './assets/css/lib/prose-mirror.css?inline';
import main from './assets/css/main.css?inline';

import { createPinia } from 'pinia';
import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import App from './App.vue';
import HomeView from './views/HomeView.vue';

/*-------------------------------------
  Router
-------------------------------------*/
const router = createRouter({
    history: createWebHistory('/admin/tasks/'),
    routes: [
        {
            path: '/',
            component: HomeView,
        },
        {
            path: '/:id',
            component: HomeView,
        },
    ],
});

/*-------------------------------------
  Mount Point
-------------------------------------*/
/*
  We need to create a shadow root to avoid conflicts with
  the parent application styles (Bootstrap mainly). This
  is the only way to isolate the styles of the child
  application.
*/
const mountPoint = document.createElement('div');
const container = document.getElementById('oneclicktask-app');

mountPoint.classList.add('h-full');

if (container) {
    container.attachShadow({ mode: 'open' });
    container.shadowRoot?.appendChild(mountPoint);

    const style = document.createElement('style');
    style.textContent = `${main} ${tiptap}`;
    container.shadowRoot?.appendChild(style);
}

/*-------------------------------------
  Module Setup
-------------------------------------*/
const app = createApp(App);
app.use(router);
app.use(createPinia());
app.mount(mountPoint);
