export const state = () => ({
  pageData: {},
  openJDs: {},
});

export const mutations = {
  updatePageData(state, data) {
    state.pageData = data;
  },
  updateOpenJDs(state, data) {
    state.openJDs = data;
  },
};

export const actions = {
  async getPageData({ commit, state }) {
    for (let i in state.pageData) {
      return false;
    }
    const res = await this.$axios.$get("/pages?slug=careers");
    commit("updatePageData", res[0]);
  },
  async getOpenJds({ commit, state }) {
    for (let i in state.openJDs) {
      return false;
    }
    const res = await this.$axios.$get("/job_openings");
    commit("updateOpenJDs", res);
  },
};
