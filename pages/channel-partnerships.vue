<template>
  <div>
    <main v-if="!$fetchState.pending">
      <section class="hero-section channel-partnerships">
        <span class="circle one"></span>
        <span class="circle two"></span>
        <span class="circle three"></span>
        <span class="circle four"></span>
        <nuxt-img
          v-if="returnData.acf.banner.image"
          :src="returnData.acf.banner.image.url"
          :alt="returnData.acf.banner.image.alt"
          :name="returnData.acf.banner.image.name"
          class="bg-img img-fluid"
        />
        <div class="container">
          <h1 class="section-title">
            {{ returnData.acf.banner.title }}
          </h1>

          <p class="section-desc mt-4">
            {{ returnData.acf.banner.content }}
          </p>
        </div>
      </section>

      <section class="cards-section">
        <div class="container">
          <h4 class="section-title">{{ returnData.acf.section_two.title }}</h4>
          <client-only>
            <VueSlickCarousel v-bind="cardsCarouselSettings">
              <div
                v-for="(item, index) in returnData.acf.section_two.images"
                :key="index"
                class="card"
              >
                <div class="icon">
                  <nuxt-img
                    v-if="item.image"
                    :src="item.image.url"
                    :alt="item.image.alt"
                    :name="item.image.name"
                    class="img-fluid"
                  />
                </div>
                <h4 class="title">{{ item.title }}</h4>
                <p class="text">{{ item.content }}</p>
              </div>
            </VueSlickCarousel>
          </client-only>
        </div>
      </section>

      <section class="productdetail-section pt-0 pt-lg-5">
        <div class="container">
          <article class="product-article">
            <div class="row align-items-center">
              <div class="col-lg-6 order-lg-1">
                <nuxt-img
                  :src="returnData.acf.section_three.image.url"
                  :alt="returnData.acf.section_three.image.alt"
                  :name="returnData.acf.section_three.image.name"
                  class="img-fluid w-100"
                />
              </div>
              <div class="col-lg-6">
                <h4 class="section-title">
                  {{ returnData.acf.section_three.title }}
                </h4>
                <p>
                  {{ returnData.acf.section_three.content }}
                </p>
                <NflLink
                  :to="returnData.acf.section_three.button.link"
                  class="btn btn-primary"
                >
                  {{ returnData.acf.section_three.button.text }}</NflLink
                >
              </div>
            </div>
          </article>
        </div>
      </section>
      <section class="partner-us-section">
        <div class="container">
          <div class="row">
            <div class="col-lg-5">
              <nuxt-img
                v-if="returnData.acf.section_four.image"
                :src="returnData.acf.section_four.image.url"
                :alt="returnData.acf.section_four.image.alt"
                :name="returnData.acf.section_four.image.name"
                class="img-fluid"
              />
            </div>
            <div class="col-lg-6 offset-lg-1">
              <h4 class="title">{{ returnData.acf.section_four.title }}</h4>
              <p class="text">
                {{ returnData.acf.section_four.content }}
              </p>

              <base-form v-bind="formData" @submit="onSubmit" />
            </div>
          </div>
        </div>
      </section>
      <BlFeed />
    </main>
  </div>
</template>

<script>
import VueSlickCarousel from "vue-slick-carousel";
import cities from "@/assets/js/cities.js";
import "vue-slick-carousel/dist/vue-slick-carousel.css";
import NflLink from "~/components/nfl-link.vue";

export default {
  components: { VueSlickCarousel, NflLink },
  data: function () {
    return {
      formData: {
        formClass: "material-form form-container ",
        formFieldClass: "form-group ",
        formTitle: "",
        ctaText: "Partner with us",
        ctaButtonText: "Submit",

        formFields: [
          {
            type: "text",
            label: {
              name: "",
              required: true,
            },
            placeholder: "First Name",
            name: "first_name",
            id: "first_name",

            validationRule: "required|name",
            model: "",
            visible: true,
          },

          {
            type: "text",
            label: {
              name: "",
            },
            placeholder: "Last Name",
            name: "last_name",
            id: "last_naame",

            validationRule: "required|name",
            model: "",
            visible: true,
          },
          {
            type: "text",
            label: {
              name: "",
            },
            placeholder: "Mobile No.",
            name: "mobileNo",
            id: "phone-number",

            validationRule: "required|phone",
            model: "",
            visible: true,
          },

          {
            type: "select",
            label: {
              name: "",
            },
            options: cities,

            name: "city",
            id: "city_select",

            validationRule: "",
            model: "City",
            selected: "",
            visible: true,
          },
          {
            type: "text",

            label: {
              name: "",
              required: true,
            },
            placeholder: "Message",
            name: "message",

            id: "message",

            validationRule: "",
            model: "",

            visible: false,
          },
          {
            type: "text",
            label: {
              name: "",
              required: true,
            },
            placeholder: "Email",
            name: "emailAddress",

            id: "email",

            validationRule: "",
            model: "",
            visible: false,
          },
        ],
      },
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
    await this.$store.dispatch("channelpartnerships/getPageData");
  },
  computed: {
    returnData() {
      return this.$store.state.channelpartnerships.pageData;
    },
  },
  mounted() {
    if (process.client && window) {
      window.scrollTo(0, 0);
    }
    console.log("Item content:", this.item.content);
  },
  methods: {
    async onSubmit(args) {
      const res = await this.$store.dispatch("sendContactForm", args);
      if (res && res.statusCode === 200) {
        this.$bvToast.toast(res.message, {
          title: "Contact Form",
          autoHideDelay: 5000,
        });
      } else {
        this.$bvToast.toast("An Error Occurred", {
          title: "Contact Form",
          autoHideDelay: 5000,
        });
      }
    },
  },
};
</script>
