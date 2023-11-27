export const state = () => ({
  pageData: {},
  documentData: {},
  documentCategories: {},
});

export const mutations = {
  updatePageData(state, data) {
    state.pageData = data;
  },
  updateDocumentData(state, data) {
    state.documentData = data;
  },
  updateDocumentCategories(state, data) {
    state.documentCategories = data;
  },
};

export const actions = {
  async getPageData({ commit, state }) {
    for (let i in state.pageData) {
      return false;
    }
    const res = await this.$axios.$get("/pages?slug=investors-relations");
    commit("updatePageData", res[0]);
  },

  async getDocumentData({ commit }) {
    const res = await this.$axios.$get(
      "investor-documents?per_page=100&page=1"
    );
    commit("updateDocumentData", res);
  },
  async getDocumentCategories({ commit }) {
    const res = await this.$axios.$get("investor-docs-categories");
    commit("updateDocumentCategories", res);
  },
};
