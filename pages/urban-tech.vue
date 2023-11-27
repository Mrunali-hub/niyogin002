<template>
  <div>
    <main v-if="!$fetchState.pending">
      <section class="hero-section urban-tech">
        <span class="circle one"></span>
        <span class="circle two"></span>
        <span class="circle three"></span>
        <span class="circle four"></span>
        <nuxt-img
          v-if="returnData.acf.hero.image"
          :src="returnData.acf.hero.image.url"
          :alt="returnData.acf.hero.image.alt"
          class="img-fluid bg-img"
        />
        <div class="container">
          <h1 class="section-title text-lg-left">
            {{ returnData.acf.hero.title }}
          </h1>
        </div>
      </section>
      <section class="productdetail-section">
        <div class="container">
          <div class="section-desc" v-html="returnData.acf.hero.content"></div>
          <article
            v-for="(item, index) in returnData.acf.sections"
            :key="`nfl-urban-tech-sections-${index}`"
            class="product-article"
          >
            <div class="row align-items-center">
              <div
                class="col-lg-5"
                :class="[
                  index % 2 === 0 ? 'order-lg-1 offset-lg-2' : 'order-lg-0',
                ]"
              >
                <nuxt-img
                  v-if="item.image"
                  :src="item.image.url"
                  :alt="item.image.alt"
                  class="img-fluid w-100"
                />
              </div>
              <div
                class="col-lg-5"
                :class="[index % 2 === 0 ? '' : 'offset-lg-2']"
              >
                <h4 class="title">{{ item.title }}</h4>
                <div v-html="item.content"></div>
                <nfl-link :to="item.button.link" class="btn btn-primary">{{
                  item.button.text
                }}</nfl-link>
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
import nflLink from "~/components/nfl-link.vue";
export default {
  components: { nflLink },

  data: function () {
    return {};
  },

  fetchDelay: 0,
  async fetch() {
    await this.$store.dispatch("urbantech/getPageData");
  },
  computed: {
    returnData() {
      return this.$store.state.urbantech.pageData;
    },
  },
  mounted() {
    if (process.client && window) {
      window.scrollTo(0, 0);
    }
  },
};
</script>
