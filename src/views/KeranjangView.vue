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

      <!-- form chekcout -->
      <div class="row justify-content-end">
        <div class="col-md-4">
          <form class="mt-3" v-on:submit.prevent>
            <div class="form-group">
              <div class="mb-3">
                <label for="nama">Nama</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Masukkan Nama Produk Anda"
                  id="inputNama"
                  v-model="pesan.nama"
                />
              </div>
            </div>
            <div class="form-group">
              <div class="mb-3">
                <label for="noMeja">Nomer Meja</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Masukkan Nomer Meja Anda"
                  id="inputNoMeja"
                  v-model="pesan.noMeja"
                />
              </div>
            </div>
            <button
              type="submit"
              class="btn btn-success float-right"
              @click="checkout"
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
  name: "KeranjangView",
  components: {
    NavbarView,
  },
  data() {
    return {
      keranjangs: [],
      pesan: [],
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
        .delete("http://localhost:3000/pesanans/" + id)
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
    async checkout() {
      if (this.pesan.nama && this.pesan.noMeja) {
        this.pesan.keranjangs = this.keranjangs;
        try {
          await axios.post("http://localhost:3000/pesanans", this.pesan);

          await Promise.all(
            this.keranjangs.map((item) =>
              axios.delete(`http://localhost:3000/keranjangs/${item.id}`)
            )
          );
          this.$toast.success("Sukses Dipesan", {
            type: "success",
            position: "top-right",
            duration: 3000,
            dismissible: true,
          });
          this.$router.push({ path: "/pesanan-sukses" });
        } catch (error) {
          console.log("Terjadi kesalahan saat memproses pesanan", error);
          this.$toast.error("Gagal memproses pesanan", {
            type: "error",
            position: "top-right",
            duration: 3000,
            dismissible: true,
          });
        }
      } else {
        this.$toast.error("Nama dan Nomer Meja harus diisi", {
          type: "error",
          position: "top-right",
          duration: 3000,
          dismissible: true,
        });
      }
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
