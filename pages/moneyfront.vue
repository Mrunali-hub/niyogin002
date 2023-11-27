<template>
  <div>
    <main v-if="!$fetchState.pending">
      <section class="hero-section money-front">
        <span class="circle one"></span>
        <span class="circle two"></span>
        <span class="circle three"></span>
        <span class="circle four"></span>
        <div class="container text-center">
          <nuxt-img
            :v-if="returnData.acf.hero.image"
            :src="returnData.acf.hero.image.url"
            :alt="returnData.acf.hero.image.alt"
            class="img-fluid"
          />
        </div>
      </section>
      <section class="solutions-inner-section pb-0">
        <div class="container">
          <p class="section-desc text-justify">
            {{ returnData.acf.content }}
          </p>

          <ul class="list-unstyled d-none">
            <li
              v-for="(item, index) in returnData.acf.metrics"
              :key="`nfl-moneyfront-metrics-${index}`"
            >
              <p class="number">{{ item.number }}</p>
              <p class="title">{{ item.title }}</p>
            </li>
          </ul>
        </div>
      </section>
      <section class="productdetail-section pb-0">
        <div class="container">
          <h4 class="section-title">Products</h4>
          <article
            v-for="(item, index) in returnData.acf.products"
            :key="`nfl-moneyfront-products-${index}`"
            class="product-article pb-lg-0"
          >
            <div class="row align-items-center">
              <div
                class="col-lg-5"
                :class="[
                  index % 2 === 0 ? 'order-lg-0' : 'order-lg-1 offset-lg-2',
                ]"
              >
                <img
                  :v-if="item.image"
                  :src="item.image.url"
                  :alt="item.image.alt"
                  class="img-fluid w-100"
                />
              </div>
              <div
                class="col-lg-5"
                :class="[index % 2 === 0 ? 'offset-lg-2' : '']"
              >
                <h4 class="title">{{ item.title }}</h4>
                <div v-html="item.content"></div>

                <NflLink :to="item.button.link" class="btn btn-primary">
                  {{ item.button.text }}
                </NflLink>
              </div>
            </div>
          </article>
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
import NflLink from "~/components/nfl-link.vue";
export default {
  components: {
    NflLink,
  },

  data: function () {
    return {
      valuesCarouselSettings: {
        arrows: false,
        dots: true,
        slidesToShow: 6,
        slidesToScroll: 1,
        draggable: false,
        touchMove: false,
        responsive: [
          {
            breakpoint: 991,
            settings: {
              slidesToShow: 3,
              draggable: true,
              touchMove: true,
            },
          },
          {
            breakpoint: 767,
            settings: {
              slidesToShow: 2,
              draggable: true,
              touchMove: true,
            },
          },
          {
            breakpoint: 575,
            settings: {
              slidesToShow: 1,
              draggable: true,
              touchMove: true,
            },
          },
        ],
      },
      teamCarouselSettings: {
        arrows: false,
        dots: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
          {
            breakpoint: 60000,
            settings: "unslick",
          },
          {
            breakpoint: 991,
            settings: {
              slidesToShow: 2,
              arrows: false,
            },
          },
          {
            breakpoint: 767,
            settings: {
              slidesToShow: 1,
            },
          },
        ],
      },
    };
  },

  fetchDelay: 0,
  async fetch() {
    await this.$store.dispatch("moneyfront/getPageData");
  },
  computed: {
    returnData() {
      return this.$store.state.moneyfront.pageData;
    },
  },
  mounted() {
    if (process.client && window) {
      window.scrollTo(0, 0);
    }
  },
};
</script>
