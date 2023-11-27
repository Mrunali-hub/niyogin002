<template>
  <div>
    <main v-if="Object.keys(newsRoom).length">
      <section class="hero-section newsroom">
        <span class="circle one"></span>
        <span class="circle two"></span>
        <span class="circle three"></span>
        <span class="circle four"></span>
        <nuxt-img
          :src="pageData.acf.hero.image.url"
          :alt="pageData.acf.hero.image.alt"
          class="img-fluid bg-img"
        />
        <div class="container">
          <h1 class="section-title text-lg-left">
            {{ pageData.acf.hero.title }}
          </h1>
        </div>
      </section>
      <section class="news-section">
        <div class="container">
          <h4 class="section-title">Niyogin in the News</h4>
          <!-- <p class="desc">
            We’ve been spoken about in the news from time to time, and it’s with
            great pleasure that we want to share this coverage with you.
          </p> -->
          <br /><br />
          <client-only>
            <VueSlickCarousel v-bind="newsCarouselSettings">
              <article
                v-for="(item, index) in newsRoom"
                :key="`nfl-newsroom-${index}`"
                class="news-card"
              >
                <nuxt-img
                  v-if="
                    item._embedded['wp:featuredmedia'] &&
                    item._embedded['wp:featuredmedia']['0']
                  "
                  :src="item._embedded['wp:featuredmedia']['0'].source_url"
                  :alt="item._embedded['wp:featuredmedia']['0'].alt_text"
                  class="img-fluid w-100"
                />
                <div class="content">
                  <time
                    >{{ item.acf.date }} |
                    <span class="time">SME TIMES</span></time
                  >
                  <h4 class="title" v-html="item.title.rendered"></h4>
                  <p class="text" v-html="item.acf.content"></p>
                  <button class="btn btn-primary">Read More</button>
                </div>
              </article>
            </VueSlickCarousel>
          </client-only>
        </div>
      </section>
      <section v-if="0" class="press-section">
        <div class="container">
          <h4 class="section-title">For the Press</h4>
        </div>
        <div class="press-content">
          <div class="container">
            <div class="row">
              <div class="col-lg-4">
                <article class="press-card">
                  <div class="icon">
                    <nuxt-img
                      src="https://via.placeholder.com/52x60"
                      alt=""
                      class="img-fluid"
                    />
                  </div>
                  <h4 class="title">PRESS KIT</h4>
                  <p class="text">
                    All the updated information you need to cover us can be
                    found here.
                  </p>
                  <button class="link">DOWNLOAD</button>
                </article>
              </div>
              <div class="col-lg-4">
                <article class="press-card">
                  <div class="icon">
                    <nuxt-img
                      src="https://via.placeholder.com/52x60"
                      alt=""
                      class="img-fluid"
                    />
                  </div>
                  <h4 class="title">SCREEN SHOTS</h4>
                  <p class="text">
                    Here are screen shots of our platform along with its key
                    features.
                  </p>
                  <button class="link">DOWNLOAD</button>
                </article>
              </div>
              <div class="col-lg-4">
                <article class="press-card">
                  <div class="icon">
                    <nuxt-img
                      src="https://via.placeholder.com/52x60"
                      alt=""
                      class="img-fluid"
                    />
                  </div>
                  <h4 class="title">BRAND ASSETS</h4>
                  <p class="text">
                    All the updated information you need to cover us can be
                    found here.
                  </p>
                  <button class="link">DOWNLOAD</button>
                </article>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section v-if="0" class="press-release-section">
        <div class="container">
          <h4 class="section-title">Press Releases</h4>
          <p class="desc">
            We believe in sharing important milestones with the world. All our
            press releases, are collated here.
          </p>

          <div class="filter">
            <label>
              Select Year
              <b-form-select
                v-model="selected"
                :options="options"
              ></b-form-select>
            </label>
            <label>
              Select Month

              <b-form-select
                v-model="selected"
                :options="options"
              ></b-form-select>
            </label>
          </div>
          <div class="row justify-content-lg-center">
            <div class="col-lg-9">
              <ul class="list-unstyled filter-list">
                <li>
                  <p class="date">30 May, 2017</p>
                  <h4 class="title">
                    Niyogin Fintech raising $36 mn from Ward Ferry, Sabre
                    Capital and others
                  </h4>
                  <button class="link">VIEW</button>
                </li>
                <li>
                  <p class="date">30 May, 2017</p>
                  <h4 class="title">
                    Niyogin Fintech raising $36 mn from Ward Ferry, Sabre
                    Capital and others
                  </h4>
                  <button class="link">VIEW</button>
                </li>
                <li>
                  <p class="date">30 May, 2017</p>
                  <h4 class="title">
                    Niyogin Fintech raising $36 mn from Ward Ferry, Sabre
                    Capital and others
                  </h4>
                  <button class="link">VIEW</button>
                </li>
                <li>
                  <p class="date">30 May, 2017</p>
                  <h4 class="title">
                    Niyogin Fintech raising $36 mn from Ward Ferry, Sabre
                    Capital and others
                  </h4>
                  <button class="link">VIEW</button>
                </li>
              </ul>
            </div>
          </div>
          <div class="text-center">
            <button class="btn btn-primary">view all</button>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
import VueSlickCarousel from "vue-slick-carousel";
import "vue-slick-carousel/dist/vue-slick-carousel.css";

export default {
  components: { VueSlickCarousel },

  data: function () {
    return {
      selected: null,
      options: [
        { value: null, text: "2017" },
        { value: "a", text: "2018" },
        { value: "b", text: "2019", disabled: true },
      ],
      newsCarouselSettings: {
        arrows: true,
        dots: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        draggable: false,
        touchMove: false,
        responsive: [
          {
            breakpoint: 992,
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
    };
  },
  fetchDelay: 0,
  async fetch() {
    await this.$store.dispatch("media/getPageData");
  },
  computed: {
    newsRoom() {
      return this.$store.state.media.newsRoom;
    },
    pageData() {
      return this.$store.state.media.pageData;
    },
  },

  mounted() {
    if (process.client && window) {
      window.scrollTo(0, 0);
    }
  },
};
</script>
