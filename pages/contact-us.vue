<template>
  <div>
    <main v-if="!$fetchState.pending">
      <section class="hero-section contact-us">
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
          <h1 class="section-title">{{ returnData.acf.banner.title }}</h1>
        </div>
      </section>
      <section class="reach-us-section">
        <div class="container">
          <h4 class="section-title">{{ returnData.acf.react_us_at.title }}</h4>
          <ul class="list-unstyled">
            <li
              v-for="(item, index) in returnData.acf.react_us_at.images"
              :key="index"
            >
              <div class="card-inner">
                <div class="front">
                  <div class="icon">
                    <nuxt-img
                      v-if="item.image"
                      :src="item.image.url"
                      :alt="item.image.alt"
                    />
                  </div>
                </div>
                <div class="back">
                  <h4 class="title">
                    {{ item.text }}
                  </h4>
                  <p class="text">
                    {{ item.link }}
                  </p>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </section>
      <section class="contact-form-section">
        <div class="container">
          <div class="row">
            <div class="material-form col-lg-6 offset-lg-3">
              <h2 class="section-title">{{ returnData.acf.form.title }}</h2>
              <h4 class="title" v-html="returnData.acf.form.content"></h4>

              <base-form v-bind="formData" @submit="onSubmit" />
            </div>
          </div>
        </div>
      </section>
      <section class="map-section">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d942.6458439178689!2d72.89517915815098!3d19.08204688107327!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7ce8dac561187%3A0x7456251bd45256e9!2sNiyogin%20Fintech%20Limited%20-%20Unsecured%20Business%20Loan!5e0!3m2!1sen!2sin!4v1635904982047!5m2!1sen!2sin"
          width="100%"
          height="450"
          style="border: 0"
          allowfullscreen=""
          loading="lazy"
        ></iframe>
      </section>
    </main>
  </div>
</template>

<script>
import cities from "@/assets/js/cities.js";

export default {
  data: function () {
    return {
      formData: {
        formClass: "form-container",
        formFieldClass: "form-group",

        ctaText: "Contact Form",
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
            id: "first_naame",

            validationRule: "required|name",
            model: "",
            visible: true,
          },
          {
            type: "text",
            label: {
              name: "",

              required: true,
            },
            placeholder: "Last Name",
            name: "last_name",
            id: "last_name",

            validationRule: "required|name",
            model: "",
            visible: true,
          },
          {
            type: "select",
            label: {
              name: "",
              required: true,
            },
            options: cities,
            name: "city",
            id: "city",

            validationRule: "required",
            model: "City",
            selected: "",
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
            type: "text",
            label: {
              name: "",
              required: true,
            },
            placeholder: "Mobile No.",
            name: "mobileNo",
            id: "phone-number",

            validationRule: "required|phone",
            model: "",
            visible: true,
          },

          {
            type: "textArea",

            label: {
              name: "",
              required: true,
            },
            placeholder: "Message",
            name: "message",

            id: "message",

            validationRule: "",
            model: "",

            visible: true,
          },
        ],
      },
    };
  },

  fetchDelay: 0,
  async fetch() {
    await this.$store.dispatch("contactus/getPageData");
  },
  computed: {
    returnData() {
      return this.$store.state.contactus.pageData;
    },
  },
  mounted() {
    if (process.client && window) {
      window.scrollTo(0, 0);
    }
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
