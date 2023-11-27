import { extend } from "vee-validate";
import Vue from "vue";
import { ValidationProvider } from "vee-validate";
import { ValidationObserver } from "vee-validate";

import { required, email, regex } from "vee-validate/dist/rules";

extend("required", {
  ...required,
  message: "This field is required",
});
// name
/* eslint-disable */
extend("name", {
  validate(val) {
    const pattern = /^[a-zA-Z]+[\-'\s]?[a-zA-Z ]+$/;
    return pattern.test(val);
  },
  message: "Please enter a valid name"
});

extend("phone", {
  validate(val) {
    const pattern = /^(\[\-\s]?)?[0]?[789]\d{9}$/;
    return pattern.test(val);
  },
  message: "Please enter a valid phone number"
});
extend("email", {
  ...email,
  message: "Please enter a valid Email Id"
});



extend("regex", {
  ...regex,
  message: "Please enter a valid format"
});
/* eslint-enable */
Vue.component("ValidationProvider", ValidationProvider);
Vue.component("ValidationObserver", ValidationObserver);
