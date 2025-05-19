<template>
  <div class="hero">
    <!-- dekstop -->
    <div class="d-none d-md-block">
      <div class="row mt-2">
        <div class="col-md-6">
          <div class="d-flex h-100">
            <div class="justify-content-center align-self-center">
              <h2><strong>Delicious Food New, </strong><br />in Your Gadget</h2>
              <p>Ayo segera pilih dan pesan makanan favorit anda</p>
              <router-link
                type="submit"
                class="btn btn-lg btn-success"
                to="/foods"
              >
                <b-icon-arrow-right></b-icon-arrow-right> Pesan
              </router-link>
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <img
            src="../assets/img/gambar-food.png"
            alt="Hero Food Image"
            width="100%"
          />
        </div>
      </div>
    </div>

    <!-- mobile -->
    <div class="d-sm-block d-md-none">
      <div class="row mt-2">
        <div class="col-md-6 mb-3">
          <div class="d-flex h-100">
            <div class="justify-content-center align-self-center">
              <h2><strong>Delicious Food New, </strong><br />in Your Gadget</h2>
              <p>Ayo segera pilih dan pesan makanan favorit anda</p>
              <button type="submit" class="btn btn-lg btn-success">
                <b-icon-arrow-right></b-icon-arrow-right> Pesan
              </button>
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <img
            src="../assets/img/gambar-food.png"
            alt="Hero Food Image"
            width="100%"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HeroView",
};
</script>

<style></style>
