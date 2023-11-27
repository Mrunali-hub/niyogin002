<template>
  <div>
    <main v-if="!$fetchState.pending">
      <section class="hero-section faq">
        <span class="circle one"></span>
        <span class="circle two"></span>
        <span class="circle three"></span>
        <span class="circle four"></span>
        <nuxt-img
          v-if="returnData.acf.hero.image"
          :src="returnData.acf.hero.image.url"
          :name="returnData.acf.hero.image.name"
          :alt="returnData.acf.hero.image.alt"
          class="bg-img img-fluid"
        />
        <div class="container">
          <h1 class="section-title">{{ returnData.acf.hero.title }}</h1>
        </div>
      </section>

      <section class="faq-section">
        <div class="container">
          <div class="faq-header">
            <h2 class="title">How can we help you?</h2>
            <form action="" class="keyword-form">
              <input type="text" placeholder="Type keywords to find answers" />
              <button class="btn link">
                <nuxt-img src="/icons/search.svg" alt="" />
              </button>
            </form>
          </div>
          <client-only>
            <b-tabs content-class="mt-1">
              <!-- start -->

              <b-tab
                v-for="(item, index) in returnQstData"
                :key="index"
                :title="index"
                :active="index === 0"
                @click="updateTab(index)"
              >
                <div class="faq-tab">
                  <div class="faq-list">
                    <h4 class="title"></h4>
                    <ul class="list-unstyled">
                      <li
                        v-for="(subItem, subIndex) in item"
                        :key="subIndex"
                        :ref="`sub-tab-${index}-${subIndex}`"
                        :class="`${
                          activeAccordian.activeIndex === subIndex
                            ? 'active'
                            : null
                        } `"
                        @click="
                          toggleActiveAccordian(
                            subItem.question_content,
                            subIndex
                          )
                        "
                      >
                        {{ subItem.question_category_title }}
                      </li>
                    </ul>
                  </div>

                  <div class="faq-tab-content">
                    <div class="accordion secondary reverse" role="tablist">
                      <b-card
                        v-for="(
                          grandChild, grandIndex
                        ) in activeAccordian.tableData"
                        :key="grandChild.uniquekey"
                        no-body
                        class="mb-2"
                      >
                        <b-card-header header-tag="header" role="tab">
                          <b-button
                            v-b-toggle="`accordion-${grandIndex}`"
                            block
                            variant="info"
                            >{{ grandChild.title }}</b-button
                          >
                        </b-card-header>
                        <b-collapse
                          :id="`accordion-${grandIndex}`"
                          accordion="my-accordion"
                          role="tabpanel"
                          :visible="grandIndex === 0"
                        >
                          <b-card-body v-html="grandChild.content">
                          </b-card-body>
                        </b-collapse>
                      </b-card>
                    </div>
                  </div>
                </div>
              </b-tab>
              <!-- end -->
            </b-tabs>
          </client-only>
        </div>
      </section>

      <BlFeed />
    </main>
  </div>
</template>

<script>
const _ = require("lodash");
export default {
  data: () => {
    return {
      returnQstData: [],
      activeAccordian: { tableData: [], activeIndex: 0 },
    };
  },
  fetchDelay: 0,
  async fetch() {
    await this.$store.dispatch("faq/getPageData");

    if (Object.keys(this.$store.state.faq.questionData).length === 0) {
      await this.$store.dispatch("faq/getPageData");
    }
    this.returnQstData = _.groupBy(
      JSON.parse(JSON.stringify(this.$store.state.faq.questionData)),
      "tab_title"
    );
    this.activeAccordian.tableData =
      this.returnQstData[
        Object.keys(this.returnQstData)[0]
      ][0].question_content;
    this.activeAccordian.tableData.forEach((e, i) => {
      e.uniquekey = "0" + "" + i;
    });
  },
  computed: {
    returnData() {
      return this.$store.state.faq.pageData;
    },
    activeTableData() {
      return this.toggleActiveAccordian.tableData;
    },
  },
  mounted() {
    if (process.client && window) {
      window.scrollTo(0, 0);
    }
  },
  methods: {
    updateTab(args) {
      this.activeAccordian.tableData =
        this.returnQstData[args][0].question_content;
      this.activeAccordian.activeIndex = 0;
      this.activeAccordian.tableData.forEach((e, i) => {
        e.uniquekey = args + "" + i;
      });
    },
    toggleActiveAccordian(tableData, activeIndex) {
      this.activeAccordian = { tableData, activeIndex };
    },
  },
};
</script>
