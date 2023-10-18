import { createApp } from "vue";
import App from "./App.vue";
// import router from "./router";
import { createRouter, createWebHistory } from "vue-router";
import HomeView from "./views/HomeView.vue";
import AboutView from "./views/AboutView.vue";
import MainPage from "./views/MainPage.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/",
            name: "Home",
            component: HomeView,
        },
        {
            path: "/about",
            name: "About",
            component: AboutView,
        },
        {
            path: "/main",
            name: "Main Page",
            component: MainPage,
        },
    ],
});

createApp(App).use(router).mount("#app");
