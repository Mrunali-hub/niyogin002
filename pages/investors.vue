<template>
  <div>
    <main v-if="!$fetchState.pending">
      <section class="hero-section investors-relations">
        <span class="circle one"></span>
        <span class="circle two"></span>
        <span class="circle three"></span>
        <span class="circle four"></span>
        <nuxt-img
          v-if="returnData.acf.hero.image"
          :src="returnData.acf.hero.image.url"
          :name="returnData.acf.hero.image.name"
          :alt="returnData.acf.hero.image.alt"
          class="img-fluid bg-img"
        />
        <div class="container">
          <h1 class="section-title text-lg-left">
            {{ returnData.acf.hero.text }}
          </h1>
        </div>
      </section>
      <section class="investor-services-section">
        <div class="container">
          <h4 class="section-title">
            {{ returnData.acf.investor_services.title }}
          </h4>
          <div class="section-desc">
            <div v-html="returnData.acf.investor_services.content"></div>
          </div>

          <div class="services-tab">
            <ul class="list-unstyled services-list">
              <li
                v-for="(item, index) in returnDocumentCategories.categories"
                :key="`nfl-investors-documents-${index}`"
                :class="`${index == activeCategory ? 'active' : null} `"
                @click="activeCategory = index"
              >
                <div class="icon">
                  <nuxt-img
                    v-if="item.image"
                    :src="item.image.url"
                    :name="item.image.name"
                    :alt="item.image.alt"
                    class="img-fluid"
                  />
                </div>
                <div class="content">
                  <h4 class="title">{{ item.name }}</h4>
                </div>
              </li>
            </ul>
            <div class="services-tab-content">
              <client-only>
                <div class="grid-content">
                  <div class="heading">
                    <h4 class="title">
                      {{
                        returnDocumentCategories.categories[activeCategory].name
                      }}
                    </h4>
                    <div
                      class="text"
                      v-html="
                        returnDocumentCategories.categories[activeCategory]
                          .detailed_description
                      "
                    ></div>
                  </div>
                  <div class="accordion style-4" role="tablist">
                    <b-card
                      v-for="(item, index) in returnDocumentCategories
                        .categories[activeCategory].tabs"
                      :key="`nfl-investors-categories-${index}`"
                      no-body
                    >
                      <b-card-header header-tag="header" class="p-1" role="tab">
                        <b-button
                          v-b-toggle="`accordion-${index}`"
                          block
                          variant="info"
                          >{{ item.name }}</b-button
                        >
                      </b-card-header>
                      <b-collapse
                        :id="`accordion-${index}`"
                        accordion="my-accordion"
                        role="tabpanel"
                      >
                        <b-card-body>
                          <b-tabs content-class="mt-3">
                            <template
                              v-for="(
                                subItem, subIndex
                              ) in returnInvestorDocuments"
                            >
                              <b-tab
                                v-if="
                                  subItem.categories.indexOf(
                                    returnDocumentCategories.categories[
                                      activeCategory
                                    ].cat_ID
                                  ) !== -1 &&
                                  subItem.categories.indexOf(item.cat_ID) !== -1
                                "
                                :key="`nfl-investors-documents-${subIndex}`"
                                :title="subItem.acf.accordion_details.title"
                              >
                                <ul class="list-unstyled presentation-list">
                                  <li
                                    v-for="(grandChild, grandIndex) in subItem
                                      .acf.accordion_details.files"
                                    :key="`nfl-investors-files-${grandIndex}`"
                                  >
                                    <div class="content">
                                      <p class="title">{{ grandChild.name }}</p>
                                    </div>
                                    <span class="icon">
                                      <nfl-link blank :to="grandChild.file"
                                        ><nuxt-img src="/icons/fullscreen.svg"
                                      /></nfl-link>
                                    </span>
                                  </li>
                                </ul>
                              </b-tab>
                            </template>
                          </b-tabs>
                        </b-card-body>
                      </b-collapse>
                    </b-card>
                  </div>
                </div>
              </client-only>
            </div>
          </div>
        </div>
      </section>
      <section class="investors-contact-details">
        <div class="container">
          <h1 class="section-title text-center">Investor Contact Details</h1>
          <p class="section-desc text-center">Registered Office Address</p>
          <div class="row">
            <div class="col-lg-6">
              <div class="investors-card">
                <h4 class="title">Registered Office Address</h4>
                <address class="text">
                  MIG 944, Ground Floor, TNHB Colony, 1st Main Road, Velachery,
                  Chennai , Tamil Nadu- 600042
                </address>
                <p class="text">Tel: 044 47210437</p>
                <a href="mailto:investorrelations@niyogin.in" class="link"
                  >investorrelations@niyogin.in</a
                >
              </div>
            </div>
            <div class="col-lg-6">
              <div class="investors-card">
                <h4 class="title">Share Transfer Agent Office</h4>
                <address class="text">
                  Link Intime India Private Limited, LBS Marg, Vikhroli (West)
                  Mumbai - 400083
                </address>
                <p class="text">
                  Subhash Jadhav:<br />
                  Tel: 022 49186270<br />
                  Fax: 022 49186060
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <BlFeed />
    </main>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      activeCategory: 0,
    };
  },

  fetchDelay: 0,
  async fetch() {
    await Promise.all([
      this.$store.dispatch("investorsrelations/getPageData"),
      this.$store.dispatch("investorsrelations/getDocumentData"),
      this.$store.dispatch("investorsrelations/getDocumentCategories"),
    ]);
  },
  computed: {
    returnData() {
      return this.$store.state.investorsrelations.pageData;
    },
    returnInvestorDocuments() {
      return this.$store.state.investorsrelations.documentData;
    },
    returnDocumentCategories() {
      return this.$store.state.investorsrelations.documentCategories;
    },
  },
  mounted() {
    if (process.client && window) {
      window.scrollTo(0, 0);
    }
  },
};
</script>
