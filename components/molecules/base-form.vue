<template>
  <client-only>
    <ValidationObserver
      v-if="!formSubmitted"
      ref="observer"
      v-slot="{ invalid }"
    >
      <form ref="form" :class="formClass" @submit.prevent="onSubmit">
        <div
          v-for="(item, index) in formFields"
          :key="`niyogin-form-${index}`"
          :class="formFieldClass"
        >
          <ValidationProvider
            v-slot="{ valid, errors }"
            :name="item.name"
            :rules="item.validationRule"
          >
            <!-- input -->
            <b-form-group
              v-if="
                item.type === 'text' ||
                item.type === 'email' ||
                item.type === 'search' ||
                item.type === 'url' ||
                item.type === 'number' ||
                item.type === 'phone' ||
                item.type === 'name' ||
                item.type === 'hidden'
              "
              :class="{ 'd-none': !item.visible }"
              label-for="input-customer-name"
              class="text-12 error"
              @input="valid"
            >
              <template #label>
                {{ item.label.name }}
                <span
                  v-if="item.validationRule.indexOf('required') !== -1"
                  class="text-danger"
                ></span>
              </template>

              <b-form-input
                id="input-customer-name"
                v-model="item.model"
                class="form-control"
                :type="item.type"
                :error="errors"
                v-bind="item"
                :state="errors[0] ? false : valid ? true : null"
              ></b-form-input>
              <b-form-invalid-feedback>
                {{ errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
            <!-- /input -->

            <!-- radio -->
            <b-form-group
              v-if="item.type === 'radio'"
              v-slot="{ ariaDescribedby }"
              :label="item.label.name"
            >
              <b-form-radio-group
                :id="item.id"
                v-model="item.model"
                :options="item.options"
                :aria-describedby="ariaDescribedby"
                name="radio-options"
              ></b-form-radio-group>
            </b-form-group>
            <!-- /radio -->
            <!-- dropdown -->
            <b-form-group
              v-if="item.type === 'select'"
              :label="item.label.name"
              :class="{ 'd-none': !item.visible }"
            >
              <template #label>
                {{ item.label.name }}
                <span
                  v-if="item.validationRule.indexOf('required') !== -1"
                  class="text-danger"
                ></span>
              </template>
              <vSelect
                v-model="item.model"
                :name="item.name"
                class="form-control"
                :options="item.options"
              >
                <!-- incase of placeholder -->
                <template #first>
                  <b-form-select-option :value="item.name" disabled>{{
                    item.name
                  }}</b-form-select-option>
                </template>
              </vSelect>
              <input v-model="item.model" type="hidden" :name="item.name" />
            </b-form-group>
            <!-- /dropdown -->
            <!-- checkbox -->

            <!-- /checkbox -->
            <!-- textarea -->
            <b-form-group
              v-if="item.type === 'textArea'"
              :label="item.label.name"
              :label-for="item.id"
            >
              <template #label>
                {{ item.label.name }}
                <span
                  v-if="item.validationRule.indexOf('required') !== -1"
                  class="text-danger"
                ></span>
              </template>
              <b-form-textarea
                :id="item.id"
                v-model="item.model"
                :name="item.name"
                class="form-control"
                :placeholder="item.placeholder"
                rows="3"
                max-rows="6"
              ></b-form-textarea>
            </b-form-group>

            <!-- textarea -->
          </ValidationProvider>
        </div>
        <b-button
          v-if="isButtonVissible"
          type="submit"
          tag="button"
          class="btn-rounded btn-block mt-2 m-auto w-auto"
          variant="primary mt-2"
          :disabled="loading || invalid"
        >
          <b-spinner v-if="loading" small label="Spinning"></b-spinner>
          {{ ctaButtonText }}</b-button
        >
      </form>
    </ValidationObserver>
    <h2 v-else class="text-center">
      Thanks for your interest! Our team will connect with you shortly
    </h2>
  </client-only>
</template>
<script>
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";

export default {
  components: { vSelect },
  props: {
    formFields: {
      type: Array,
      default: () => [],
    },

    formClass: {
      type: String,
      default: "",
    },
    formFieldClass: {
      type: String,
      default: "",
    },
    formTitle: {
      type: String,
      default: "",
    },
    ctaText: {
      type: String,
      default: "",
    },
    ctaButtonText: {
      type: String,
      default: "",
    },

    isButtonVissible: {
      type: Boolean,
      default: true,
    },
  },
  data: function () {
    return { formSubmitted: false, rerenderer: 0 };
  },
  computed: {
    loading() {
      return this.$store.state.updateGlobalLoader;
    },
  },
  watch: {
    "$store.state.formReset": function (arg) {
      if (arg === true) {
        this.formSubmitted = true;
      }
    },
  },

  methods: {
    async resetForm() {
      this.$emit("resetForm");
      // this.$refs.form.reset();
    },
    async onSubmit(e) {
      let formData = new FormData(e.target);
      await this.$emit("submit", formData);
      // this.$refs.form.reset();
    },
  },
};
</script>
<style>
.spinner.sm {
  height: 2em;
  width: 2em;
}
.vs__dropdown-toggle,
.vs__dropdown-menu {
  border: 1px;
}
</style>
