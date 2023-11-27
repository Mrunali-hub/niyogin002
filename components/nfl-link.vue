<template>
  <a v-if="leadForm" href="JavaScript:void(0)" @click="showForm">
    <slot />
  </a>
  <a v-else-if="showATag && !download" :href="cTo" :target="target">
    <slot />
  </a>
  <a v-else-if="showATag && download" :href="cTo" download :target="target">
    <slot />
  </a>
  <a v-else-if="(a || blank) && !download" :href="cTo" :target="target">
    <slot />
  </a>
  <a v-else-if="externalLink" :href="cTo" :target="target">
    <slot />
  </a>
  <a
    v-else-if="hash && to === '#popup'"
    href="JavaScript:void(0)"
    @click="togglePopUp"
  >
    <slot />
  </a>
  <nuxt-link v-else-if="hash && to !== '#popup'" :to="{ hash: to }">
    <slot />
  </nuxt-link>

  <nuxt-link v-else :to="cTo">
    <slot />
  </nuxt-link>
</template>

<script>
export default {
  props: {
    to: {
      type: String,
      default: "",
    },
    blank: Boolean,
    download: Boolean,
    a: Boolean,
    externalLink: Boolean,
    leadForm: Boolean,
    modalType: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    showATag: function () {
      return (
        this.a ||
        this.blank ||
        this.download ||
        this.to.indexOf("https://") > -1 ||
        this.to.indexOf("http://") > -1
      );
    },
    cTo: function () {
      return this.to;
    },
    hash: function () {
      return this.to.indexOf("#") === 0;
    },
    target: function () {
      return this.blank ? "_blank" : "_self";
    },
  },
  methods: {
    togglePopUp() {
      this.$store.commit("updateModal", true);
    },
    showForm: function () {
      this.$store.commit("updateShowModal", {
        showModal: true,
        modalType: this.modalType,
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
