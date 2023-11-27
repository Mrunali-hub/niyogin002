export const state = () => ({
  isLoading: false,
  bankingPartners: {},
  strategicPartners: {},
  niyoginFeed: [],
  menu: [],
  modal: false,
  loadPrio: true,
  formReset: false,
});

export const mutations = {
  updateStrategicPartners(state, data) {
    state.strategicPartners = data;
  },
  updateBankingPartners(state, data) {
    state.bankingPartners = data;
  },
  updateGlobalLoader(state, data) {
    state.isLoading = data;
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
  updateNiyoginFeedn(state, data) {
    state.niyoginFeed = data;
  },
  updateMenu(state, data) {
    state.menu = data;
  },
  updateModal(state, data) {
    state.modal = data;
  },
};

export const actions = {
  async updateGlobalLoader({ commit }, args) {
    commit("updateGlobalLoader", args);
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
          password: "GKPejXE}c",
        },
      }
    );
    if (res) {
      commit("updateFormReset", true);
    }

    commit("resetLoadPrio");
    return res;
  },
  async nuxtServerInit({ commit }, {}) {
    const [strategicPartners, bankingPartners, niyoginFeed, menu] =
      await Promise.all([
        this.$axios.$get("/strategic_partners"),
        this.$axios.$get("/banking-partners"),
        this.$axios.$get("/posts?_embed"),
        this.$axios.$get("/menu"),
      ]);

    commit("updateStrategicPartners", strategicPartners);
    commit("updateBankingPartners", bankingPartners);
    commit("updateNiyoginFeedn", niyoginFeed);
    commit("updateMenu", menu);
  },
};
