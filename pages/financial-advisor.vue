<template>
  <div>
    <main v-if="!$fetchState.pending">
      <section class="hero-section financial-advisor">
        <span class="circle one"></span>
        <span class="circle two"></span>
        <span class="circle three"></span>
        <span class="circle four"></span>
        <nuxt-img
          :v-if="returnData.acf.hero.image"
          :src="returnData.acf.hero.image.url"
          :name="returnData.acf.hero.image.name"
          :alt="returnData.acf.hero.image.alt"
          class="bg-img img-fluid"
        />
        <div class="container">
          <h1 class="section-title">{{ returnData.acf.hero.title }}</h1>

          <div
            class="section-desc mt-4"
            v-html="returnData.acf.hero.content"
          ></div>
        </div>
      </section>
      <section class="financail-section">
        <div class="container">
          <ul class="list-unstyled">
            <li>
              <h4 class="title">{{ returnData.acf.what_do_you_get.title }}</h4>
              <ul class="list-unstyled">
                <div
                  class="section-desc mt-4"
                  v-html="returnData.acf.what_do_you_get.content"
                ></div>
              </ul>
            </li>
            <li>
              <h4 class="title">
                {{ returnData.acf.how_much_can_you_earn.title }}
              </h4>
              <ul class="list-unstyled">
                <div
                  class="section-desc mt-4"
                  v-html="returnData.acf.how_much_can_you_earn.content"
                ></div>
              </ul>
            </li>
            <li>
              <h4 class="title">
                {{ returnData.acf.what_do_you_have_to_do.title }}
              </h4>
              <ul class="list-unstyled">
                <div
                  class="section-desc mt-4"
                  v-html="returnData.acf.what_do_you_have_to_do.content"
                ></div>
              </ul>
            </li>
          </ul>
        </div>
      </section>
      <section class="financial-advisor-section">
        <div class="container">
          <div class="row">
            <div class="col-lg-6">
              <nuxt-img
                :v-if="returnData.acf.who_can_become_a_financial_advisor.image"
                :src="
                  returnData.acf.who_can_become_a_financial_advisor.image.url
                "
                :name="
                  returnData.acf.who_can_become_a_financial_advisor.image.name
                "
                :alt="
                  returnData.acf.who_can_become_a_financial_advisor.image.alt
                "
                class="img-fluid"
              />
            </div>
            <div class="col-lg-6">
              <h4 class="title">
                {{ returnData.acf.who_can_become_a_financial_advisor.title }}
              </h4>

              <div class="text">
                <div
                  v-html="
                    returnData.acf.who_can_become_a_financial_advisor.content
                  "
                ></div>

                <nfl-link
                  :to="
                    returnData.acf.who_can_become_a_financial_advisor.button
                      .link
                  "
                  class="btn btn-primary"
                >
                  {{
                    returnData.acf.who_can_become_a_financial_advisor.button
                      .text
                  }}
                </nfl-link>
              </div>
            </div>
          </div>
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
    await this.$store.dispatch("financialadvisor/getPageData");
  },
  computed: {
    returnData() {
      return this.$store.state.financialadvisor.pageData;
    },
  },

  mounted() {
    if (process.client && window) {
      window.scrollTo(0, 0);
    }
  },
};
</script>
