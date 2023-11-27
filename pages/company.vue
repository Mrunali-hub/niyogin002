<template>
  <div v-if="!$fetchState.pending">
    <main>
      <section class="hero-section company">
        <span class="circle one"></span>
        <span class="circle two"></span>
        <span class="circle three"></span>
        <span class="circle four"></span>
        <nuxt-img
          v-if="returnData.acf.header.image"
          :src="returnData.acf.header.image.url"
          :alt="returnData.acf.header.image.alt"
          class="bg-img img-fluid"
        />
        <div class="container">
          <h1 class="section-title">{{ returnData.acf.header.title }}</h1>
        </div>
      </section>
      <section class="mission-vision-section">
        <div class="container">
          <ul class="list-unstyled">
            <li>
              <div class="icon">
                <nuxt-img
                  v-if="returnData.acf.banner.mission"
                  :src="returnData.acf.banner.mission.image.url"
                  width="106"
                  height="106"
                  :alt="returnData.acf.banner.vission.image.alt"
                />
              </div>
              <h4 class="title">{{ returnData.acf.banner.mission.title }}</h4>
              <p class="text">
                {{ returnData.acf.banner.mission.content }}
              </p>
            </li>
            <li>
              <div class="icon">
                <nuxt-img
                  v-if="returnData.acf.banner.vission"
                  :src="returnData.acf.banner.vission.image.url"
                  width="106"
                  height="106"
                  :alt="returnData.acf.banner.vission.image.alt"
                />
              </div>
              <h4 class="title">{{ returnData.acf.banner.vission.title }}</h4>
              <p class="text">
                {{ returnData.acf.banner.vission.content }}
              </p>
            </li>
          </ul>
        </div>
      </section>
      <section class="values-section">
        <div class="container">
          <h2 class="section-title">{{ returnData.acf.values.title }}</h2>
          <p class="section-desc">
            {{ returnData.acf.values.content }}
          </p>
          <client-only>
            <VueSlickCarousel v-bind="valuesCarouselSettings">
              <div
                v-for="(item, index) in returnData.acf.values.values"
                :key="`nfl-values-${index}`"
                class="values-card"
              >
                <div class="img">
                  <nuxt-img
                    :src="item.image.url"
                    :alt="item.image.alt"
                    class="img-fluid"
                  />
                </div>
                <p class="title">{{ item.title }}</p>
              </div>
            </VueSlickCarousel>
          </client-only>
        </div>
      </section>
      <section class="ourstory-section">
        <nuxt-img
          v-if="returnData.acf.our_story.image"
          :src="returnData.acf.our_story.image.url"
          :alt="returnData.acf.our_story.image.alt"
          class="right-img img-fluid"
        />
        <div class="container">
          <div class="row">
            <div class="col-lg-6">
              <h2 class="section-title">
                {{ returnData.acf.our_story.title }}
              </h2>
              <p class="section-desc">
                {{ returnData.acf.our_story.content }}
              </p>
            </div>
          </div>
        </div>
      </section>
      <section class="ourjourney-section">
        <div class="container">
          <h2 class="section-title">{{ returnData.acf.our_journey.title }}</h2>
          <p class="section-desc text-justify">
            {{ returnData.acf.our_journey.content }}
          </p>
          <div v-if="Object.keys(activeSlide).length" class="journey-carousel">
            <div class="hover-container">
              <div class="content">
                <div class="content-inner">
                  <div class="icon">
                    <nuxt-img
                      :v-if="activeSlide.image"
                      :src="activeSlide.image.url"
                      :alt="activeSlide.image.alt"
                      class="img-fluid"
                    />
                  </div>
                  <h4 class="title">{{ activeSlide.title }}</h4>
                  <ul class="list-unstyled star-fill-list">
                    <li
                      v-for="(item, index) in activeSlide.content"
                      :key="`nfl-company-active-content-${index}`"
                    >
                      {{ item.content }}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="carousel-content">
              <VueSlickCarousel
                v-bind="journeyCarouselSettings"
                @afterChange="upateActiveSlide"
              >
                <div
                  v-for="(item, index) in returnData.acf.our_journey.timeline"
                  :key="`nfl-company-timeline-${index}`"
                  class="j-card"
                >
                  <div class="circle active"></div>
                  <p class="year">{{ item.years }}</p>
                </div>
              </VueSlickCarousel>
            </div>
          </div>
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
import VueSlickCarousel from "vue-slick-carousel";
import "vue-slick-carousel/dist/vue-slick-carousel.css";
export default {
  components: {
    VueSlickCarousel,
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
      journeyCarouselSettings: {
        arrows: true,
        dots: false,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
          {
            breakpoint: 991,
            settings: {
              slidesToShow: 1,
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
      activeSlideIndex: 0,
    };
  },

  fetchDelay: 0,
  async fetch() {
    await this.$store.dispatch("about/getPageData");
  },
  computed: {
    returnData() {
      return this.$store.state.about.pageData;
    },
    activeSlide() {
      return this.returnData.acf.our_journey.timeline[this.activeSlideIndex];
    },
  },

  mounted() {
    if (process.client && window) {
      window.scrollTo(0, 0);
    }
  },
  methods: {
    upateActiveSlide(args) {
      this.activeSlideIndex = args;
    },
  },
};
</script>
