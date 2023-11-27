<template>
  <div>
    <main v-if="!$fetchState.pending">
      <section class="hero-section careers">
        <span class="circle one"></span>
        <span class="circle two"></span>
        <span class="circle three"></span>
        <span class="circle four"></span>
        <nuxt-img
          v-if="returnData.acf.banner.image"
          :src="returnData.acf.banner.image.url"
          :alt="returnData.acf.banner.image.alt"
          class="img-fluid bg-img"
        />
        <div class="container">
          <h1 class="section-title text-lg-left">
            {{ returnData.acf.banner.title }}
          </h1>
          <p class="section-subtitle text-lg-left">
            {{ returnData.acf.banner.description }}
          </p>
        </div>
      </section>
      <section class="looking-section">
        <div class="container">
          <h4 class="section-title">{{ returnData.acf.title }}</h4>
          <div class="search-section">
            <h4 class="title">{{ returnData.acf.sub_title }}</h4>
            <p class="text">
              {{ returnData.acf.description }}
            </p>

            <div class="search-content">
              <h4 class="title">Check below for open positions in your city</h4>

              <form action="#" class="search-form">
                <input
                  class="input"
                  type="text"
                  placeholder="Search Positions by"
                />
                <b-dropdown
                  id="department-dropdown-"
                  text="Department"
                  variant="primary"
                >
                  <b-dropdown-item
                    v-for="(item, index) in openJDsData"
                    :key="`nfl-department-dropdown-${index}`"
                    >{{ item.acf.department }}</b-dropdown-item
                  >
                </b-dropdown>
                <b-dropdown
                  id="location-dropdown"
                  text="Locations"
                  variant="primary"
                >
                  <b-dropdown-item
                    v-for="(item, index) in openJDsData"
                    :key="`nfl-location-dropdown-${index}`"
                    >{{ item.acf.location }}</b-dropdown-item
                  >
                </b-dropdown>
              </form>
            </div>
          </div>
          <client-only>
            <div class="accordion style-2" role="tablist">
              <b-card
                v-for="(item, index) in openJDsData"
                :key="`nfl-open-jds-${index}`"
                no-body
              >
                <b-card-header header-tag="header" role="tab">
                  <b-button
                    v-b-toggle="`accordion-${index}`"
                    block
                    variant="info"
                  >
                    <span class="position" v-html="item.acf.title"></span>
                    <span class="list">
                      <span class="location">{{ item.acf.location }}</span>
                      <span class="date">20-09-2021</span>
                    </span>
                  </b-button>
                </b-card-header>
                <b-collapse
                  :id="`accordion-${index}`"
                  accordion="my-accordion"
                  role="tabpanel"
                >
                  <b-card-body>
                    <h4 class="title">Job Descriptions:</h4>
                    <div class="text" v-html="item.acf.content"></div>
                    <p class="text-center">
                      <NflLink
                        :to="item.acf.application_link"
                        class="btn btn-primary"
                        >Apply now</NflLink
                      >
                    </p>
                  </b-card-body>
                </b-collapse>
              </b-card>
            </div>
          </client-only>
        </div>
      </section>
      <section class="cards-section">
        <div class="container">
          <h4 class="section-title">Life at Niyogin</h4>
          <client-only>
            <VueSlickCarousel v-bind="cardsCarouselSettings">
              <div
                v-for="(item, index) in returnData.acf.life_at_niyogin"
                :key="`nfl-card-${index}`"
                class="card"
              >
                <div class="icon">
                  <nuxt-img
                    v-if="item.image"
                    :src="item.image.url"
                    :alt="item.image.alt"
                    class="img-fluid"
                  />
                </div>
                <h4 class="title">{{ item.title }}</h4>
                <p class="text">
                  {{ item.description }}
                </p>
              </div>
            </VueSlickCarousel>
          </client-only>
        </div>
      </section>
      <section v-if="0" class="hire-process-section">
        <div class="container">
          <h4 class="section-title">{{ returnData.acf.how_we_hire.title }}</h4>
          <p class="section-desc">
            {{ returnData.acf.how_we_hire.description }}
          </p>
          <h4 class="process-title">
            {{ returnData.acf.how_we_hire.sub_title }}
          </h4>
          <ul class="list-unstyled">
            <li
              v-for="(item, index) in returnData.acf.how_we_hire.process"
              :key="`nfl-how-we-hire-process-${index}`"
            >
              <div class="icon">
                <nuxt-img
                  v-if="item.image"
                  :src="item.image.url"
                  :alt="item.image.alt"
                  class="img-fluid"
                />
              </div>
              <div class="content">
                <h4 class="title">{{ item.title }}</h4>
                <p class="text">
                  {{ item.description }}
                </p>
              </div>
            </li>
          </ul>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
import VueSlickCarousel from "vue-slick-carousel";
import "vue-slick-carousel/dist/vue-slick-carousel.css";
import NflLink from "~/components/nfl-link.vue";
export default {
  components: { VueSlickCarousel, NflLink },
  data: function () {
    return {
      cardsCarouselSettings: {
        arrows: false,
        dots: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        draggable: false,
        touchMove: false,
        responsive: [
          {
            breakpoint: 991,
            settings: {
              slidesToShow: 2,
              arrows: false,
              draggable: true,
              touchMove: true,
            },
          },
          {
            breakpoint: 767,
            settings: {
              slidesToShow: 1,
              draggable: true,
              touchMove: true,
            },
          },
        ],
      },
    };
  },

  fetchDelay: 0,
  async fetch() {
    await this.$store.dispatch("careers/getPageData");
    await this.$store.dispatch("careers/getOpenJds");
  },
  computed: {
    returnData() {
      return this.$store.state.careers.pageData;
    },
    openJDsData() {
      return this.$store.state.careers.openJDs;
    },
  },
  mounted() {
    if (process.client && window) {
      window.scrollTo(0, 0);
    }
  },
};
</script>
