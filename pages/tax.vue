<template>
  <div>
    <main v-if="!$fetchState.pending">
      <section class="hero-section tax">
        <span class="circle one"></span>
        <span class="circle two"></span>
        <span class="circle three"></span>
        <span class="circle four"></span>
        <nuxt-img
          v-if="returnData.acf.hero.image"
          :src="returnData.acf.hero.image.url"
          :alt="returnData.acf.hero.image.alt"
          class="bg-img img-fluid"
        />
        <div class="container">
          <h1 class="section-title">Tax</h1>
        </div>
      </section>
      <section class="productdetail-section">
        <div class="container">
          <article class="product-article">
            <div class="row align-items-center">
              <div class="col-lg-5 offset-lg-2 order-lg-1">
                <nuxt-img
                  v-if="returnData.acf.products[0].image"
                  :src="returnData.acf.products[0].image.url"
                  :alt="returnData.acf.products[0].image.alt"
                  class="img-fluid w-100"
                />
              </div>
              <div class="col-lg-5">
                <h4 class="title">GST</h4>
                <client-only
                  ><p v-html="returnData.acf.products[0].content"></p>
                </client-only>
                <button class="btn btn-primary">Apply now</button>
              </div>
            </div>
          </article>
          <article class="product-article">
            <div class="row align-items-center">
              <div class="col-lg-5">
                <nuxt-img
                  v-if="returnData.acf.products[1].image"
                  :src="returnData.acf.products[1].image.url"
                  :alt="returnData.acf.products[1].image.alt"
                  class="img-fluid w-100"
                />
              </div>
              <div class="col-lg-5 offset-lg-2">
                <h4 class="title">Income Tax</h4>
                <client-only
                  ><p v-html="returnData.acf.products[1].content"></p>
                </client-only>
                <button class="btn btn-primary">Apply now</button>
              </div>
            </div>
          </article>
        </div>
      </section>
      <BlFeed />
    </main>
  </div>
</template>

<script>
export default {
  data: function () {
    return {};
  },

  fetchDelay: 0,
  async fetch() {
    await this.$store.dispatch("tax/getPageData");
  },
  computed: {
    returnData() {
      return this.$store.state.tax.pageData;
    },
  },
  mounted() {
    if (process.client && window) {
      window.scrollTo(0, 0);
    }
  },
};
</script>
