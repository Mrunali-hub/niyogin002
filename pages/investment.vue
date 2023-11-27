<template>
  <div>
    <main v-if="!$fetchState.pending">
      <section class="hero-section investment">
        <span class="circle one"></span>
        <span class="circle two"></span>
        <span class="circle three"></span>
        <span class="circle four"></span>
        <nuxt-img
          :v-if="returnData.acf.banner.image"
          :src="returnData.acf.banner.image.url"
          :name="returnData.acf.banner.image.name"
          :alt="returnData.acf.banner.image.alt"
          class="bg-img img-fluid"
        />
        <div class="container">
          <h1 class="section-title">{{ returnData.acf.banner.title }}</h1>
        </div>
      </section>
      <section class="productdetail-section">
        <div class="container">
          <h4 class="section-title">{{ returnData.acf.section_two.title }}</h4>
          <p
            class="section-desc"
            v-html="returnData.acf.section_two.content"
          ></p>
        </div>
      </section>
      <section class="editable-section">
        <client-only>
          <div class="container">
            <h2 class="section-title">{{ returnData.acf.overview.title }}</h2>
            <p
              class="section-desc"
              v-html="returnData.acf.overview.content"
            ></p>
            <img
              :v-if="returnData.acf.overview.image"
              :src="returnData.acf.overview.image.url"
              :name="returnData.acf.overview.image.name"
              :alt="returnData.acf.overview.image.alt"
              class="img-fluid"
            />
          </div>
        </client-only>
      </section>
      <section class="productdetail-section pt-0 pb-0">
        <div class="container">
          <client-only>
            <b-tabs class="secondary">
              <b-tab
                v-for="(item, index) in returnData.acf.section_three"
                :key="index"
                :title="item.tab_title"
                active
              >
                <div class="row align-items-center">
                  <div class="col-lg-6">
                    <nuxt-img
                      :v-if="item.image"
                      :src="item.image.url"
                      :name="item.image.name"
                      :alt="item.image.alt"
                      class="img-fluid w-100"
                    />
                  </div>
                  <div class="col-lg-6">
                    <h4 class="title">
                      {{ item.title }}
                    </h4>

                    <client-only><p v-html="item.content"></p> </client-only>
                    <nfl-link :to="item.button.link" class="btn btn-primary">
                      {{ item.button.text }}
                    </nfl-link>
                  </div>
                </div>
              </b-tab>
            </b-tabs>
          </client-only>
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
    await this.$store.dispatch("investment/getPageData");
  },
  computed: {
    returnData() {
      return this.$store.state.investment.pageData;
    },
  },
  mounted() {
    if (process.client && window) {
      window.scrollTo(0, 0);
    }
  },
};
</script>
