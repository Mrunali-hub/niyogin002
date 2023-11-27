<template>
  <div>
    <main v-if="!$fetchState.pending">
      <section class="hero-section investors-relations">
        <span class="circle one"></span>
        <span class="circle two"></span>
        <span class="circle three"></span>
        <span class="circle four"></span>
        <nuxt-img
          v-if="returnData.acf.hero.image"
          :src="returnData.acf.hero.image.url"
          :name="returnData.acf.hero.image.name"
          :alt="returnData.acf.hero.image.alt"
          class="img-fluid bg-img"
        />
        <div class="container">
          <h1 class="section-title text-lg-left">INVESTORS RELATIONS</h1>
        </div>
      </section>
      <section class="investors-relations-section">
        <div class="container">
          <h4 class="section-title">Intro</h4>
          <p class="section-desc">
            {{ returnData.acf.section.content }}
          </p>
          <div class="services">
            <h4 class="section-title">Investor Services</h4>
            <div class="section-desc">
              <div v-html="returnData.acf.investor_services.content"></div>
            </div>
            <ul class="list-unstyled">
              <li
                v-for="(item, index) in returnData.acf.investor_services.icons"
                :key="index"
              >
                <div class="img">
                  <nuxt-img
                    v-if="item.icon"
                    :src="item.icon.url"
                    :name="item.icon.name"
                    :alt="item.icon.alt"
                    class="img-fluid"
                  />
                </div>
                <h4 class="title">{{ item.title }}</h4>
                <p>
                  {{ item.content }}
                </p>
              </li>
            </ul>
          </div>
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
    await this.$store.dispatch("investorsrelations/getPageData");
  },
  computed: {
    returnData() {
      return this.$store.state.investorsrelations.pageData;
    },
  },

  mounted() {
    if (process.client && window) {
      window.scrollTo(0, 0);
    }
  },
};
</script>
