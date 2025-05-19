<template>
  <div>
    <NavbarView />
    <div class="container">
      <div class="row mt-4">
        <div class="col">
          <h1>Daftar <strong>Makanan</strong></h1>
        </div>
      </div>
      <div class="row mt-3">
        <div class="col">
          <div class="input-group mb-3">
            <input
              v-model="search"
              type="text"
              class="form-control"
              placeholder="Cari makanan kesukaan anda"
              aria-label="Cari"
              aria-describedby="basic-addon1"
              @keyup="searchFood"
            />
            <span class="input-group-text" id="basic-addon1"
              ><b-icon-search></b-icon-search
            ></span>
          </div>
        </div>
      </div>
      <div class="row mb-3">
        <div
          class="col-md-4 mt-4"
          v-for="product in products"
          :key="product.id"
        >
          <CardProduct :product="product" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavbarView from "@/components/NavbarView.vue";
import CardProduct from "@/components/CardProduct.vue";
import axios from "axios";

export default {
  name: "FoodsView",
  components: {
    NavbarView,
    CardProduct,
  },
  data() {
    return {
      products: [],
      search: "",
    };
  },
  methods: {
    setProducts(data) {
      this.products = data;
    },
    searchFood() {
      axios
        .get("http://localhost:3000/products?q=" + this.search)
        .then((response) =>
          // send data to setProduct
          this.setProducts(response.data)
        )
        .catch((error) =>
          // handle error
          console.log("Terjadi kesalahan data", error)
        );
    },
  },
  mounted() {
    axios
      .get("http://localhost:3000/products")
      .then((response) =>
        // send data to setProduct
        this.setProducts(response.data)
      )
      .catch((error) =>
        // handle error
        console.log("Terjadi kesalahan data", error)
      );
  },
};
</script>

<style></style>
