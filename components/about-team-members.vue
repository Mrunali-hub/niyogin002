<template>
  <div>
    <client-only>
      <b-tabs>
        <b-tab
          v-for="(item, index) in data"
          :key="`nfl-team-members-${index}`"
          :title="item.tab_title"
          :active="index === 0"
        >
          <client-only>
            <VueSlickCarousel v-bind="teamCarouselSettings">
              <div
                v-for="(subItem, subIndex) in getItem(item)"
                :key="`nfl-team-members-${index}-${subIndex}`"
              >
                <button class="link" @click="openPopUp(subItem)">
                  <figure class="member-figure">
                    <nuxt-img
                      v-if="subItem.image"
                      :src="subItem.image.url"
                      :alt="subItem.image.alt"
                      class="img-fluid"
                    />
                    <!-- <span class="icon"
                      ><img src="https://via.placeholder.com/26x17" alt=""
                    /></span> -->
                    <figcaption>
                      <h4 class="name">{{ subItem.title }}</h4>
                      <p class="designation">
                        {{ subItem.designation }}
                      </p>
                    </figcaption>
                  </figure>
                </button>
              </div>
            </VueSlickCarousel>
          </client-only>
        </b-tab>
      </b-tabs>
    </client-only>
    <b-modal id="modal-team" ref="teamModal" size="lg" hide-footer hide-header>
      <section class="team-modal-section">
        <header class="section-header">
          <div class="avatar">
            <nuxt-img
              v-if="activePopUpUser.image"
              :src="activePopUpUser.image.url"
              :alt="activePopUpUser.image.alt"
              class="img-fluid"
            />
          </div>
          <div class="content">
            <h4 class="name" v-html="activePopUpUser.title"></h4>
            <p class="designation" v-html="activePopUpUser.designation"></p>
          </div>
        </header>
        <p v-html="activePopUpUser.about"></p>
      </section>
    </b-modal>
  </div>
</template>

<script>
import VueSlickCarousel from "vue-slick-carousel";
import "vue-slick-carousel/dist/vue-slick-carousel.css";
export default {
  components: {
    VueSlickCarousel,
  },
  props: {
    data: {
      type: Array,
      default: () => [],
    },
  },
  data: function () {
    return {
      activePopUpUser: {},
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
  methods: {
    getItem(args) {
      return args.team ? args.team : args.members;
    },
    openPopUp(args) {
      this.activePopUpUser = args;
      this.$refs.teamModal.show();
    },
  },
};
</script>
