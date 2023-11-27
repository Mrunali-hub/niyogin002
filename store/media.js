export const state = () => ({
  pageData: {},
  newsRoom: {},
});

export const mutations = {
  updatePageData(state, data) {
    state.pageData = data;
  },
  updateNewsRoomData(state, data) {
    state.newsRoom = data;
  },
};

export const actions = {
  async getPageData({ commit, state }) {
    for (let i in state.pageData) {
      return false;
    }
    const resNewsRoom = await this.$axios.$get("/media_releases?_embed");
    const resPage = await this.$axios.$get(
      "/pages?slug=media-resources-news-center"
    );

    commit("updateNewsRoomData", resNewsRoom);
    commit("updatePageData", resPage[0]);
  },
};
