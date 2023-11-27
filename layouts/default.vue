<template>
  <div>
    <Header />
    <transition name="fade">
      <Nuxt v-show="!(isLoading && loadPrio)" key="1" />
    </transition>
    <transition name="fade">
      <div v-show="isLoading && loadPrio" key="2" class="text-center py-5 my-5">
        <img
          src="/loader.gif"
          alt="Niyogin Loader"
          class="py-5 my-5"
          width="200"
        />
      </div>
    </transition>

    <b-modal
      id="bc-modal"
      ref="leadModal"
      size="lg"
      hide-header
      hide-footer
      @hidden="$store.commit('updateModal', false)"
    >
      <template #default="{ hide }">
        <div class="modal-section" :class="isModalOpen">
          <button class="link close-btn" @click="hide()">
            <nuxt-img src="/icons/cross.svg" alt="close_btn" />
          </button>

          <h4 class="title">Request a call back</h4>
          <!-- <p class="desc">
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod
          </p> -->

          <base-form v-bind="formData" @submit="onSubmit" />
        </div>
      </template>
    </b-modal>

    <Footer />
  </div>
</template>
<script>
import cities from "@/assets/js/cities.js";

export default {
  data: function () {
    return {
      formData: {
        formClass: "material-form",
        formFieldClass: "form-group ",
        formTitle: "",
        ctaText: "Default form",
        ctaButtonText: "Call back",

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

              required: true,
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
            placeholder: "emailAddress",
            name: "emailAddress",

            id: "emailAddress",

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
            placeholder: "message",
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
  head() {
    return {
      title: this.$store.state.meta.metaTitle,
      meta: this.$store.state.meta.meta,
    };
  },
  computed: {
    isModalOpen() {
      return this.$store.state.modal;
    },
    isLoading() {
      return this.$store.state.isLoading;
    },
    loadPrio() {
      return this.$store.state.loadPrio;
    },
  },
  // bv::modal::hidden
  watch: {
    async $route(to) {
      this.$store.dispatch("meta/checkMetaUpdate", to.path);
    },
    isModalOpen() {
      if (this.$store.state.modal) {
        this.$refs.leadModal.toggle();
      } else {
        this.$refs.leadModal.hide();
      }
    },
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

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.6s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
