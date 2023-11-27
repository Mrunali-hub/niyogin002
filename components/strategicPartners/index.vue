<template>
  <section class="client-section">
    <div class="container">
      <h2 class="section-title mb-5">PARTNERS</h2>

      <VueSlickCarousel v-bind="partnerCarouselSettings">
        <div
          v-for="(item, index) in strategicPartners"
          :key="`nfl-team-members-${index}`"
        >
          <nuxt-img
            :src="item.acf.image.url"
            :alt="item.acf.image.alt"
            class="img-fluid"
          />
        </div>
      </VueSlickCarousel>
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
      partnerCarouselSettings: {
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: false,
        dots: true,
        slidesToShow: 5,
        slidesToScroll: 1,
        responsive: [
          {
            breakpoint: 991,
            settings: {
              slidesToShow: 3,
            },
          },
          {
            breakpoint: 767,
            settings: {
              slidesToShow: 2,
            },
          },
        ],
      },
    };
  },
  computed: {
    strategicPartners() {
      return this.$store.state.strategicPartners;
    },
  },
};
</script>
