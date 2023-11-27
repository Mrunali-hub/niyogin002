export const state = () => ({
  pageData: {},
  questionData: {},
});

export const mutations = {
  updatePageData(state, data) {
    state.pageData = data;
  },
  updateQuestionData(state, data) {
    const tempArr = [];
    data.acf.faqs[0].question_category.forEach((element) => {
      if (element.tab_title) {
        tempArr.push(element);
      }
    });
    state.questionData = tempArr;
  },
};

export const actions = {
  async getPageData({ commit, state }) {
    for (let i in state.pageData) {
      return false;
    }
    const res = await this.$axios.$get("/pages?slug=faqs");
    commit("updatePageData", res[0]);
    commit("updateQuestionData", res[0]);
  },
};
