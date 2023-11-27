export const state = () => ({
  pageData: {},
});

export const mutations = {
  updatePageData(state, data) {
    state.pageData = data;
  },
};

export const actions = {
  async getPageData({ commit, state }) {
    for (let i in state.pageData) {
      return false;
    }
    const res = await this.$axios.$get("/pages?slug=iserveu");
    commit("updatePageData", res[0]);
  },
};
