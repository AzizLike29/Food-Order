import Vue from "vue";
import Router from "vue-router";
import HomeView from "../views/HomeView.vue";
import AboutView from "../views/AboutView.vue";
import FoodsView from "../views/FoodsView.vue";
import FoodsDetail from "../views/FoodsDetail.vue";
import KeranjangView from "../views/KeranjangView.vue";
import PesananSuksesView from "../views/PesananSuksesView.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/about",
      name: "about",
      component: AboutView,
    },
    {
      path: "/foods",
      name: "foods",
      component: FoodsView,
    },
    {
      path: "/foods/:id",
      name: "FoodsDetail",
      component: FoodsDetail,
    },
    {
      path: "/keranjang",
      name: "KeranjangView",
      component: KeranjangView,
    },
    {
      path: "/pesanan-sukses",
      name: "PesananSuksesView",
      component: PesananSuksesView,
    },
  ],
});
