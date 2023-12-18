import { createApp } from "vue";
import App from "./App.vue";
// import router from "./router";
import { createRouter, createWebHistory } from "vue-router";
import HomeView from "./views/HomeView.vue";
import AboutView from "./views/AboutView.vue";
import CustomerView from "./views/CustomerView.vue";
import PropertyView from "./views/PropertyView.vue";
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
            path: "/user",
            name: "User",
            component: AboutView,
        },
        {
            path: "/customer",
            name: "Customer",
            component: CustomerView,
        },
        {
            path: "/property",
            name: "Property",
            component: PropertyView,
        },
        {
            path: "/main",
            name: "Main Page",
            component: MainPage,
        },
    ],
});

createApp(App).use(router).mount("#app");
