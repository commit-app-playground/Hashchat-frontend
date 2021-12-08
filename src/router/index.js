import VueRouter from "vue-router";
import Auth from "../views/Auth.vue";
import Home from "../views/Home.vue";
import Chat from "../views/Chat.vue";

const routes = [
  {
    path: "/",
    name: "Auth",
    component: Auth,
  },
  {
    path: "/user/:name",
    name: "Home",
    component: Home,
    props: true,
  },
  {
    path: "/user/:name/chat/:chatname",
    name: "Chat",
    component: Chat,
    props: true,
  },
];

const router = new VueRouter({
  routes
})

export default router;