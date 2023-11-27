<template>
  <div>
    <main v-if="!$fetchState.pending">
      <section class="hero-section home">
        <span class="circle one"></span>
        <span class="circle two"></span>
        <span class="circle three"></span>
        <span class="circle four"></span>
        <nuxt-img
          v-if="returnData.acf.banner.image"
          :src="returnData.acf.banner.image.url"
          :alt="returnData.acf.banner.image.alt"
          class="bg-img img-fluid"
        />
        <div class="container">
          <h1 class="section-title" v-html="returnData.acf.banner.heading"></h1>
          <a
            :href="returnData.acf.banner.button.link"
            class="btn btn-primary"
            >{{ returnData.acf.banner.button.text }}</a
          >
        </div>
      </section>
      <section class="integrated-section">
        <div class="container">
          <h2 class="section-title">
            {{ returnData.acf.second_section.title }}
          </h2>
          <p class="section-desc">
            {{ returnData.acf.second_section.content }}
          </p>
        </div>
      </section>
      <section class="editable-section">
        <div class="container">
          <h2 class="section-title">
            {{ returnData.acf.company_overview.title }}
          </h2>

          <div
            :key="returnData.id"
            class="section-desc"
            v-html="returnData.acf.company_overview.content"
          ></div>
          <nuxt-img
            v-if="returnData.acf.company_overview.image"
            :src="returnData.acf.company_overview.image.url"
            :alt="returnData.acf.company_overview.image.alt"
            class="img-fluid"
          />
        </div>
      </section>
      <section class="solution-section">
        <div class="container">
          <div class="row">
            <div class="col-lg-8 offset-lg-2">
              <h2 class="section-title">
                {{ returnData.acf.second_section.title_two }}
              </h2>
              <p class="section-desc">
                {{ returnData.acf.second_section.content_two }}
              </p>
              <nuxt-img
                v-if="returnData.acf.second_section.image"
                :src="returnData.acf.second_section.image.url"
                :alt="returnData.acf.second_section.image.alt"
                class="img-fluid"
              />
            </div>
          </div>

          <ul class="list-unstyled solution-list">
            <li
              v-for="(item, index) in returnData.acf.second_section.sollutions"
              :key="index"
            >
              <nuxt-img
                v-if="item.logo"
                :src="item.logo.url"
                :alt="item.logo.alt"
                class="img-fluid"
              />
              <h4
                class="title"
                :class="{
                  urban: index === 0,
                  wealth: index === 1,
                  rural: index === 2,
                }"
              >
                {{ item.title }}
                <span class="arrow"></span>
              </h4>
              <div class="text" v-html="item.content"></div>

              <nfl-link :to="item.button.link" class="btn btn-primary">{{
                item.button.text
              }}</nfl-link>
            </li>
          </ul>
        </div>
      </section>
      <section class="drive-section">
        <div class="container">
          <h2 class="section-title">
            {{ returnData.acf.what_drives_us.title }}
          </h2>
          <client-only>
            <div class="row">
              <div
                v-for="(item, index) in returnData.acf.what_drives_us.group"
                :key="index"
                class="col-lg-6"
              >
                <figure class="drive-card">
                  <nuxt-img
                    v-if="item.image"
                    :width="item.image.width"
                    :height="item.image.height"
                    :src="item.image.url"
                    :alt="item.image.alt"
                    class="img-fluid w-100"
                  />
                  <figcaption class="caption">
                    <h4 class="title">{{ item.title }}</h4>

                    <p v-html="item.content"></p>
                    <nfl-link :to="item.button.link" class="read-more">{{
                      item.button.text
                    }}</nfl-link>
                  </figcaption>
                </figure>
              </div>
            </div>
          </client-only>
        </div>
      </section>
      <section class="parter-section">
        <div class="container">
          <h2 class="section-title">{{ returnData.acf.partner.title }}</h2>

          <div class="accordion" role="tablist">
            <b-card
              v-for="(item, index) in returnData.acf.partner.accordian"
              :key="`nfl-partners-${index}`"
              no-body
            >
              <b-card-header header-tag="header" role="tab">
                <b-button
                  block
                  variant="info"
                  :class="{ active: index === 1 }"
                  @click="toggleCollapses($event, ['accordion-' + index])"
                >
                  <span class="icon"
                    ><nuxt-img
                      v-if="item.image"
                      :src="item.image.url"
                      :alt="item.image.alt"
                      class="img-fluid"
                  /></span>
                  <span class="content">
                    <span class="title">{{ item.title }}</span>
                    <span class="text">{{ item.content }}</span>
                    <span class="partner">PARTNER WITH US</span>
                  </span>
                </b-button>
              </b-card-header>
              <b-collapse
                :id="`accordion-${index}`"
                :visible="index === 1"
                accordion="my-accordion"
                role="tabpanel"
              >
                <b-card-body>
                  <div class="row">
                    <div class="col-lg-6 offset-lg-3">
                      <h4 class="title">PARTNER WITH US</h4>

                      <base-form
                        class="text-left"
                        v-bind="formData"
                        @submit="onSubmit"
                      />
                    </div>
                  </div>
                </b-card-body>
              </b-collapse>
            </b-card>
          </div>
        </div>
      </section>
      <BlFeed />

      <BlStrategicPartners />
    </main>
  </div>
</template>

<script>
import cities from "@/assets/js/cities.js";

export default {
  data: function () {
    return {
      formData: {
        formClass: "material-form form-container ",
        formFieldClass: "form-group ",
        formTitle: "",
        ctaText: "Partner with us",
        ctaButtonText: "Send",
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
            id: "last_name",

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
            type: "email",
            label: {
              name: "",
              required: true,
            },
            placeholder: "Email",
            name: "emailAddress",

            id: "email",

            validationRule: "required|email",
            model: "",
            visible: true,
          },

          {
            type: "select",
            label: {
              name: "",
            },
            placeholder: "City",
            options: cities,
            name: "city",
            id: "city_select",

            validationRule: "required",
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
        ],
      },
    };
  },

  fetchDelay: 0,
  async fetch() {
    // Fetch
    await this.$store.dispatch("homepage/getPageData");
  },
  computed: {
    returnData() {
      return this.$store.state.homepage.pageData;
    },
  },
  mounted() {
    if (process.client && window) {
      window.scrollTo(0, 0);
    }
  },
  methods: {
    toggleCollapses(event, ids) {
      const btn = event.target.closest(".accordion").querySelectorAll(".btn");

      btn.forEach((item) => item.classList.remove("active"));

      event.target
        .closest(".card")
        .querySelector(".btn")
        .classList.add("active");
      ids.forEach((id) => {
        this.$root.$emit("bv::toggle::collapse", id);
      });
    },
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
