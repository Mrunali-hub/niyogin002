import Vue from "vue";
import BlFeed from "~/components/feed";
import BlBankingPartners from "~/components/bankingPartners";
import BlStrategicPartners from "~/components/strategicPartners";
import BaseForm from "~/components/molecules/base-form.vue";

const components = {
  BlFeed,
  BlBankingPartners,
  BlStrategicPartners,
  BaseForm,
};

Object.entries(components).forEach(([name, component]) => {
  Vue.component(name, component);
});
