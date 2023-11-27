<template>
  <div>
    <main v-if="!$fetchState.pending">
      <client-only>
        <section class="hero-section iserve-u">
          <span class="circle one"></span>
          <span class="circle two"></span>
          <span class="circle three"></span>
          <span class="circle four"></span>
          <div class="container text-center">
            <nuxt-img
              v-if="returnData.acf.hero.image"
              :src="returnData.acf.hero.image.url"
              :alt="returnData.acf.hero.image.alt"
              class="img-fluid"
            />
            <p
              class="section-desc mt-4"
              v-html="returnData.acf.hero.content"
            ></p>
          </div>
        </section>
      </client-only>
      <client-only>
        <section class="intro-section">
          <div class="container">
            <div
              class="section-desc text-justify"
              v-html="returnData.acf.second_section.content"
            ></div>
            <div class="row">
              <div class="col-lg-6">
                <article class="content-box">
                  <!-- <h4 class="title">
                  Providing accessibility to banking services
                </h4> -->
                  <p
                    class="section-desc"
                    v-html="returnData.acf.second_section.left_pannel"
                  ></p>
                </article>
              </div>
              <div class="col-lg-6">
                <article class="content-box">
                  <!-- <h4 class="title">
                  Providing accessibility to banking services;
                </h4> -->
                  <p
                    class="section-desc"
                    v-html="returnData.acf.second_section.right_pannel"
                  ></p>
                </article>
              </div>
            </div>
          </div>
        </section>
      </client-only>
      <section class="solutions-inner-section">
        <div class="container">
          <h4 class="heading">
            {{ returnData.acf.section_.title }}
          </h4>
          <ul class="list-unstyled">
            <li
              v-for="(item, index) in returnData.acf.section_.metrics"
              :key="`nfl-metrics-${index}`"
            >
              <p class="number">{{ item.title }}</p>
              <p class="title">{{ item.content }}</p>
            </li>
          </ul>
        </div>
      </section>
      <section class="productdetail-section pt-0 pb-0">
        <div class="container">
          <client-only>
            <b-tabs class="secondary">
              <b-tab
                v-for="(item, index) in returnData.acf.section_three"
                :key="`nfl-iserveu-services-${index}`"
                :title="item.tab_title"
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
                    <h4 class="title">{{ item.title }}</h4>
                    <client-only><p v-html="item.content"></p> </client-only>
                    <NflLink :to="item.button.link" class="btn btn-primary">{{
                      item.button.text
                    }}</NflLink>
                  </div>
                </div>
              </b-tab>
            </b-tabs>
          </client-only>
        </div>
      </section>

      <section class="team-member-section">
        <div class="container">
          <h2 class="section-title">Team Members</h2>
          <client-only>
            <about-team-members
              v-if="returnData.acf && returnData.acf.team_members"
              :data="returnData.acf.team_members"
            />
          </client-only>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
import "vue-slick-carousel/dist/vue-slick-carousel.css";
export default {
  data: function () {
    return {};
  },
  fetchDelay: 0,
  async fetch() {
    await this.$store.dispatch("iserveu/getPageData");
  },
  computed: {
    returnData() {
      return this.$store.state.iserveu.pageData;
    },
  },

  mounted() {
    if (process.client && window) {
      window.scrollTo(0, 0);
    }
  },
};
</script>
