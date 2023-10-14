import { createApp } from "vue";
import App from "./App.vue";
// import router from "./router";
import { createRouter, createWebHistory } from "vue-router";
import HelloWorld from "./App.vue";
import HomeView from "./views/HomeView.vue";
import AboutView from "./views/AboutView.vue";

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
            path: "/hellowrorld",
            name: "HelloWorld",
            component: HelloWorld,
        },
    ],
});

createApp(App).use(router).mount("#app");
