export const state = () => ({
  metaTitle: "Niyogin Fintech | Offers Small Business Loan in India",
  meta: [
    {
      hid: "utf-8",
      charset: "utf-8",
    },
    {
      hid: "viewport",
      name: "viewport",
      content: "width=device-width, initial-scale=1",
    },
    {
      hid: "description",
      name: "description",
      content: "Niyogin Fintech | Offers Small Business Loan in India",
    },
    {
      hid: "keywords",
      name: "keywords",
      content: "Niyogin Fintech | Offers Small Business Loan in India",
    },
  ],
  homeMeta: {},
  loadPrio: true,
  formReset: false,
});

export const getters = {
  meta: (state) => {
    return state.meta;
  },
  metaTitle: (state) => {
    return state.metaTitle;
  },
};

export const mutations = {
  updateMeta(state, data) {
    state.meta = data;
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
  updateHomeMeta(state, data) {
    state.homeMeta = data;
  },
  updateMetaTitle(state, data) {
    state.metaTitle = data.title;
    if (!state.homeMeta[data.key.path]) {
      state.homeMeta[data.key.path] = data.data;
    }
  },
  checkMetaUpdate(state, data) {
    if (state.homeMeta[data]) {
      state.meta = state.homeMeta[data];
      state.metaTitle = state.meta[state.meta.length - 1]["content"];
      // this.$store.dispatch("updateMeta", temp);
    }
  },
};

export const actions = {
  async updateMeta({ commit }, metaData) {
    let meta = [
      {
        hid: "utf-8",
        charset: "utf-8",
      },
      {
        hid: "viewport",
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        hid: "keywords",
        name: "keywords",
        content: "Niyogin Fintech",
      },
    ];
    if (metaData) {
      meta.push(
        {
          hid: "og:title",
          name: "og:title",
          content: metaData.og_title,
        },
        {
          hid: "og:localce",
          name: "og:locale",
          content: metaData.og_locale,
        },
        {
          hid: "og:image",
          name: "og:image",
          content:
            metaData.og_image &&
            metaData.og_image[0] &&
            metaData.og_image[0].url,
        },
        {
          hid: "twitter:title",
          name: "twitter:title",
          content: metaData.og_title,
        },
        {
          hid: "twitter:image",
          name: "twitter:image",
          content:
            metaData.og_image &&
            metaData.og_image[0] &&
            metaData.og_image[0].url,
        },
        {
          hid: "title",
          name: "title",
          content: metaData.title,
        }
      );
      if (metaData.title) {
        commit("updateMetaTitle", {
          title: metaData.title,
          data: meta,
          key: this.$router.currentRoute,
        });
      } else {
        commit(
          "updateMetaTitle",
          "Niyogin Fintech | Offers Small Business Loan in India"
        );
      }
    }
    await commit("updateMeta", meta);
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
    if (!res) {
      commit("updateFormReset", true);
    }
    commit("resetLoadPrio");
    return res;
  },
  async checkMetaUpdate({ commit }, data) {
    commit("checkMetaUpdate", data);
  },
};
