<template>
  <div class="card shadow h-100" style="width: 18rem">
    <div style="height: 200px" class="overflow-hidden">
      <img
        :src="'assets/images-food/' + product.gambar"
        class="card-img-top w-100 h-100"
        alt="Product Image"
        style="object-fit: cover"
      />
    </div>
    <div class="card-body d-flex flex-column">
      <h5 class="card-title text-truncate">{{ product.nama }}</h5>
      <p class="card-text">Harga: Rp.{{ product.harga }}</p>
      <div class="mt-auto">
        <router-link class="btn btn-success w-100" :to="'/foods/' + product.id">
          <b-icon-cart></b-icon-cart> Pesan
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CardProduct",
  props: ["product"],
};
</script>

<style></style>
