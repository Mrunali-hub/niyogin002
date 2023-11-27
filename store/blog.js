export const state = () => ({
  pageData: {},
  allBlogs: [],
  pagination: {},
  hero: {},
});

export const mutations = {
  updatePageData(state, data) {
    state.pageData = data;
  },
  updateBlogsData(state, data) {
    state.allBlogs = data;
  },
  updatePagination(state, data) {
    state.pagination = data;
  },
  updateBlogHero(state, data) {
    state.hero = data;
  },
};

export const actions = {
  async getPageData({ commit, state }, slug) {
    for (let i in state.pageData) {
      return false;
    }

    const res = await this.$axios.$get(`/posts?_embed&slug=${slug}`);
    commit("updatePageData", res[0]);
    return res[0];
  },
  updatePagination({ commit }, pagination) {
    commit("updatePagination", pagination);
  },
  async getBlogHero({ commit }) {
    const res = await this.$axios.$get("/pages?slug=blogs");
    commit("updateBlogHero", res[0]);
  },
  async getAllBlogs({ commit }, params) {
    const res = await this.$axios.$get(`/posts`, { params });
    commit("updateBlogsData", res);
    return res[0];
  },
};
