<template>
  <section class="feed-section">
    <div class="container">
      <h2 class="section-title">Niyogin Feed</h2>
      <client-only>
        <VueSlickCarousel v-bind="feedCarouselSettings">
          <div
            v-for="(item, index) in returnData"
            :key="`nfl-feed-section-${index}`"
            class="feed-card"
          >
            <div class="top">
              <div class="img">
                <nuxt-img
                  v-if="
                    item._embedded['wp:featuredmedia'] &&
                    item._embedded['wp:featuredmedia']['0']
                  "
                  :src="item._embedded['wp:featuredmedia']['0'].source_url"
                  :alt="item._embedded['wp:featuredmedia']['0'].alt_text"
                  class="img-fluid"
                />
                <nuxt-img
                  v-else
                  src="https://via.placeholder.com/115x110"
                  alt=""
                  class="img-fluid"
                />
              </div>
              <time>
                {{
                  new Date(item.date).toLocaleString("en-us", {
                    month: "short",
                  }) +
                  ", " +
                  new Date(item.date).toLocaleString("en-us", {
                    year: "numeric",
                  })
                }}
                |
                {{ (item.content.rendered.length / 25 / 60).toFixed(2) }}
                min read</time
              >
            </div>
            <h4 class="title" v-html="item.title.rendered"></h4>
            <p
              class="text"
              v-html="item.excerpt.rendered.substring(0, 120)"
            ></p>
            <p class="text-right">
              <nuxt-link :to="`/blogs/${item.slug}`" class="btn btn-primary"
                >Read More</nuxt-link
              >
            </p>
          </div>
        </VueSlickCarousel>
      </client-only>
    </div>
  </section>
</template>

<script>
import VueSlickCarousel from "vue-slick-carousel";
import "vue-slick-carousel/dist/vue-slick-carousel.css";

export default {
  components: { VueSlickCarousel },
  data: function () {
    return {
      feedCarouselSettings: {
        arrows: true,
        dots: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
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
              arrows: false,
            },
          },
        ],
      },
    };
  },
  computed: {
    returnData() {
      return this.$store.state.niyoginFeed;
    },
  },
};
</script>
