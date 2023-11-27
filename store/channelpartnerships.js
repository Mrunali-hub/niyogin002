export const state = () => ({
  pageData: {},
  loadPrio: true,
  formReset: false,
});

export const mutations = {
  updatePageData(state, data) {
    state.pageData = data;
  },
  updateFormReset(state, data) {
    state.formReset = data;
  },
  falsifyLoadPrio(state) {
    state.loadPrio = false;
  },
  resetLoadPrio(state) {
    if (state.loadPrio !== true) state.loadPrio = true;
  },
};

export const actions = {
  async getPageData({ commit, state }) {
    for (let i in state.pageData) {
      return false;
    }
    const res = await this.$axios.$get("/pages?slug=channel-partnerships");
    commit("updatePageData", res[0]);
  },
  async sendContactForm({ commit }, args) {
    commit("falsifyLoadPrio");

    let object = {};
    args.forEach((value, key) => (object[key] = value));
    object.source = "web";
    const res = await this.$axios.$post(
      "https://pisoauat.niyogin.in/gates/1.0/sweeps/createContactUs",
      object,
      {
        auth: {
          username: "xSgqh",
          password: "",
        },
      }
    );
    if (!res) {
      commit("updateFormReset", true);
    }
    commit("resetLoadPrio");
    return res;
  },
};
