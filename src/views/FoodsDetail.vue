<template>
  <div class="food-detail">
    <NavbarView />
    <div class="container">
      <!-- breadcrumb -->
      <div class="row mt-4">
        <div class="col">
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
              <li class="breadcrumb-item">
                <router-link to="/" class="text-dark">Home</router-link>
              </li>
              <li class="breadcrumb-item">
                <router-link to="/foods" class="text-dark">Food</router-link>
              </li>
              <li class="breadcrumb-item active" aria-current="page">
                Food Order
              </li>
            </ol>
          </nav>
        </div>
      </div>

      <div class="row">
        <div class="col-md-6">
          <img
            class="img-fluid rounded shadow"
            v-if="products.gambar"
            :src="'/assets/images-food/' + products.gambar"
            alt="Produk"
          />
        </div>
        <div class="col">
          <h2 class="fw-bold">{{ products.nama }}</h2>
          <hr />
          <h4>
            Harga : <strong>Rp. {{ products.harga }}</strong>
          </h4>
          <form class="mt-3" v-on:submit.prevent>
            <div class="form-group">
              <div class="mb-3">
                <label for="jumlah_pemesanan">Jumlah Pesan</label>
                <input
                  type="number"
                  class="form-control"
                  placeholder="Masukkan Jumlah Pesan Anda"
                  id="inputJumlahPesanan"
                  v-model="pesan.jumlah_pemesanan"
                />
              </div>
              <div class="mb-3">
                <label for="keterangan">Keterangan</label>
                <textarea
                  class="form-control"
                  placeholder="Masukkan Keterangan Anda"
                  type="text"
                  v-model="pesan.keterangan"
                ></textarea>
              </div>
            </div>
            <button
              type="submit"
              class="btn btn-success"
              @click="pemesanan"
              id="button-submit"
            >
              <b-icon-cart></b-icon-cart>
              Pesan
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavbarView from "@/components/NavbarView.vue";
import axios from "axios";

export default {
  name: "FoodsDetail",
  components: {
    NavbarView,
  },
  data() {
    return {
      products: {},
      pesan: {},
    };
  },
  methods: {
    setProducts(data) {
      this.products = data;
    },
    pemesanan() {
      if (this.pesan.jumlah_pemesanan) {
        this.pesan.products = this.products;
        axios
          .post("http://localhost:3000/keranjangs", this.pesan)
          .then(() => {
            this.$router.push({ path: "/keranjang" }),
              // result success
              this.$toast.success("Sukses Masuk Keranjang", {
                type: "success",
                position: "top-right",
                duration: 3000,
                dismissible: true,
              });
          })
          .catch((error) => {
            // handle error
            console.log("Terjadi kesalahan data", error);
          });
      } else {
        // result error
        this.$toast.error("Jumlah pesanan harus di isi", {
          type: "error",
          position: "top-right",
          duration: 3000,
          dismissible: true,
        });
      }
    },
  },
  mounted() {
    const id = this.$route.params.id;
    if (id) {
      axios
        .get(`http://localhost:3000/products/${id}`)
        .then((response) =>
          // send data to setProduct
          this.setProducts(response.data)
        )
        .catch((error) =>
          // handle error
          console.log("Terjadi kesalahan data", error)
        );
    } else {
      console.warn("ID produk tidak ada di route");
    }
  },
};
</script>

<style></style>
