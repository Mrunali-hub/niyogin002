<template>
  <div>
    <main v-if="!$fetchState.pending">
      <section class="hero-section business-correspondent">
        <span class="circle one"></span>
        <span class="circle two"></span>
        <span class="circle three"></span>
        <span class="circle four"></span>
        <nuxt-img
          :v-if="returnData.acf.hero.image"
          :src="returnData.acf.hero.image.link"
          :name="returnData.acf.hero.image.name"
          :alt="returnData.acf.hero.image.alt"
          class="bg-img img-fluid"
        />
        <div class="container">
          <h1 class="section-title">
            {{ returnData.acf.hero.title }}
          </h1>
        </div>
      </section>
      <section class="bc-section">
        <div class="container">
          <h2 class="bc-heading">
            {{ returnData.acf.title }}
          </h2>
          <div class="request-section">
            <div class="row">
              <div class="col-lg-6">
                <h4 class="title">{{ returnData.acf.benefits_title }}</h4>
                <ul class="list-unstyled star-list">
                  <li
                    v-for="(item, index) in returnData.acf.Benefits"
                    :key="`nfl-benefits-${index}`"
                  >
                    {{ item.title }}
                  </li>
                </ul>
              </div>
              <div class="col-lg-6">
                <h4 class="title">To become a Business Correspondent now</h4>
                <div class="button-group">
                  <nfl-link
                    :to="returnData.acf.benefits_buttons.button_left.link"
                    class="btn btn-primary"
                  >
                    {{ returnData.acf.benefits_buttons.button_left.text }}
                  </nfl-link>
                  <nfl-link
                    a
                    :to="returnData.acf.benefits_buttons.button_right.link"
                    class="btn btn-primary"
                  >
                    {{ returnData.acf.benefits_buttons.button_right.text }}
                  </nfl-link>
                </div>
              </div>
            </div>
          </div>
          <h3 v-if="0" class="bc-title">Who can be our Partner?</h3>

          <div
            v-if="0" 
            class="bc-text"
            v-html="returnData.acf.benefits_group[0].content"
          ></div>

          <h3 class="bc-title" v-if="0" >How much can you earn</h3>
          <p class="bc-text" v-if="0" >
            Minimum retailers/touch points: 30 <br />
            Business Volume: 10-20 Lakhs per month <br />
            Having a keen interest in the financial inclusion sector.
          </p>

          <h3 class="bc-title" v-if="0" >What do you have to do?</h3>
          <p class="bc-text" v-if="0" >
            <span class="heading">Financial Inclusion</span> - AEPS, Aadharpay,
            Micro ATM, Insurance
            <br />
            <span class="heading">Neo-Banking & Cards</span> - CASA, PPI, Debit
            Cards, Investments
            <br />
            <span class="heading">Transactional Banking</span> - DMT, Payout,
            UPI, Fastag, BBPS, CMS, ENACH, Virtual Accounts,
            <br />
            <span class="heading">POS Lending</span> - BNPL, Retail
            Establishment, Lending as a service
          </p>
          <div class="accordion style-3" role="tablist">
            <client-only>
              <b-card
                v-for="(item, index) in returnData.acf.benefits_group"
                :key="`nfl-benefits-group-${index}`"
                no-body
              >
                <b-card-header header-tag="header" role="tab">
                  <b-button
                    v-b-toggle="`accordion-${index}`"
                    block
                    variant="info"
                    >{{ item.title }}</b-button
                  >
                </b-card-header>
                <b-collapse
                  :id="`accordion-${index}`"
                  accordion="my-accordion"
                  role="tabpanel"
                >
                  <b-card-body v-html="item.content"> </b-card-body>
                </b-collapse>
              </b-card>
            </client-only>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
export default {
  data: function () {
    return {};
  },

  fetchDelay: 0,
  async fetch() {
    await this.$store.dispatch("businesscorrespondent/getPageData");
  },
  computed: {
    returnData() {
      return this.$store.state.businesscorrespondent.pageData;
    },
  },
  mounted() {
    if (process.client && window) {
      window.scrollTo(0, 0);
    }
  },
};
</script>
