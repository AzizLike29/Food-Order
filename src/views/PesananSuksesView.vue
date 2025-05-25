<template>
  <div class="pesanan-sukses">
    <NavbarView />
    <div class="container">
      <div class="row justify-content-center mt-4">
        <div class="col text-center">
          <img
            src="../assets/img/menunggu.png"
            alt="Menunggu Pesanan"
            width="500"
          />
          <h2><strong>Sukses</strong></h2>
          <h4>Pesanan anda segera diproses <br />Selamat Menunggu</h4>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavbarView from "@/components/NavbarView.vue";
// import axios from "axios";

export default {
  name: "PesananSuksesView",
  components: {
    NavbarView,
  },
};
</script>

<style></style>
