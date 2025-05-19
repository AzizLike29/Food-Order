<template>
  <div class="keranjang">
    <!-- kirim perubahan data keranjang ke navbar -->
    <NavbarView :updateKeranjang="keranjangs" />
    <div class="container">
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
                Keranjang
              </li>
            </ol>
          </nav>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <h2>Keranjang <strong>Saya</strong></h2>
          <div class="table-responsive mt-3">
            <table class="table table-success">
              <thead>
                <tr>
                  <th scope="col">No</th>
                  <th scope="col">Foto</th>
                  <th scope="col">Makanan</th>
                  <th scope="col">Keterangan</th>
                  <th scope="col">Jumlah</th>
                  <th scope="col">Harga</th>
                  <th scope="col">Total Harga</th>
                  <th scope="col">Hapus</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(keranjang, index) in keranjangs"
                  :key="keranjang.id"
                >
                  <th scope="row">{{ index + 1 }}</th>
                  <td>
                    <img
                      class="img-fluid rounded shadow"
                      v-if="keranjang.products.gambar"
                      :src="
                        '../assets/images-food/' + keranjang.products.gambar
                      "
                      alt="Produk"
                      width="250"
                    />
                  </td>
                  <td>{{ keranjang.products.nama }}</td>
                  <td>
                    {{ keranjang.keterangan ? keranjang.keterangan : "-" }}
                  </td>
                  <td>
                    {{
                      keranjang.jumlah_pemesanan
                        ? keranjang.jumlah_pemesanan
                        : "-"
                    }}
                  </td>
                  <td class="text-start">
                    Rp.
                    {{
                      formatPrice(
                        keranjang.products ? keranjang.products.harga : 0
                      )
                    }}
                  </td>
                  <td class="test-start">
                    <strong>
                      Rp.
                      {{
                        formatPrice(
                          keranjang.products.harga * keranjang.jumlah_pemesanan
                        )
                      }}
                    </strong>
                  </td>
                  <td class="text-center">
                    <button class="btn btn-danger">
                      <b-icon-trash
                        @click="hapusKeranjang(keranjang.id)"
                      ></b-icon-trash>
                    </button>
                  </td>
                </tr>
                <tr>
                  <td class="text-right" colspan="6">
                    <strong>Total Harga : </strong>
                  </td>
                  <td class="text-right">
                    <strong>Rp. {{ totalHarga }}</strong>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavbarView from "@/components/NavbarView.vue";
import axios from "axios";

export default {
  name: "KeranjangView",
  components: {
    NavbarView,
  },
  data() {
    return {
      keranjangs: [],
    };
  },
  methods: {
    setKeranjang(data) {
      this.keranjangs = data;
    },
    formatPrice(price) {
      return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    hapusKeranjang(id) {
      axios
        .delete("http://localhost:3000/keranjangs/" + id)
        .then((response) => {
          console.log(response);
          this.$toast.success("Sukses hapus keranjang", {
            type: "success",
            position: "top-right",
            duration: 3000,
            dismissible: true,
          });
          // update dan ambil kembali data halaman
          axios
            .get("http://localhost:3000/keranjangs")
            .then((response) =>
              // send data to setKeranjang
              this.setKeranjang(response.data)
            )
            .catch((error) =>
              // handle error
              console.log("Terjadi kesalahan data", error)
            );
        })
        .catch((error) =>
          // handle error
          console.log("Terjadi kesalahan data", error)
        );
    },
  },
  mounted() {
    axios
      .get("http://localhost:3000/keranjangs")
      .then((response) =>
        // send data to setKeranjang
        this.setKeranjang(response.data)
      )
      .catch((error) =>
        // handle error
        console.log("Terjadi kesalahan data", error)
      );
  },
  // penjumlahan data one by one di (map array)
  computed: {
    totalHarga() {
      return this.keranjangs.reduce(function (items, data) {
        if (data.products && data.products.harga) {
          return items + data.products.harga * data.jumlah_pemesanan;
        }
        return items;
      }, 0);
    },
  },
};
</script>

<style></style>
