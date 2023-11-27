<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-content">
        <div>
          <nuxt-img
            src="/niyogin_logo.svg"
            alt=""
            class="footer-logo img-fluid"
          />
          <h4 class="logo-title">NIYOGIN FINTECH LIMITED</h4>
          <address>
            Neelkanth Corporate IT Park, 311/312, 3rd Floor, Kirol Road,
            Vidyavihar (w), Mumbai - 400086
          </address>
        </div>
        <div>
          <nfl-link to="#" class="toll-free" tel="1800-266-0266"
            >TOLL FREE NO. 1800-266-0266</nfl-link
          >
        </div>
        <div v-if="returnData[0]">
          <h4 class="title">{{ returnData[0].title }}</h4>
          <ul class="list-unstyled links">
            <li
              v-for="(item, index) in returnData[0].submenu"
              :key="`nfl-submenu-0-${index}`"
            >
              <nfl-link :to="item.url" v-html="item.title"></nfl-link>
            </li>
            <li></li>
          </ul>
        </div>
        <div v-if="returnData[1]">
          <h4 class="title">{{ returnData[1].title }}</h4>
          <ul
            v-for="(item, index) in returnData[1].submenu"
            :key="`nfl-submenu-1-${index}`"
            class="list-unstyled links"
          >
            <nfl-link :to="item.url" v-html="item.title"></nfl-link>
          </ul>
        </div>
        <div>
          <ul v-if="returnData[2]" class="list-unstyled menu-list">
            <li
              v-for="(item, index) in returnData[2].submenu"
              :key="`nfl-submenu-2-${index}`"
            >
              <nfl-link :to="item.url" v-html="item.title"></nfl-link>
            </li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <div class="row">
          <div class="col-lg-6">
            <div class="follow-us">
              <p>Follow us on:</p>
              <ul class="list-unstyled">
                <li>
                  <nfl-link to="https://www.facebook.com/fintech.niyogin"
                    ><nuxt-img
                      src="/social-facebook-circular-button.svg"
                      alt=""
                      class="img-fluid"
                  /></nfl-link>
                </li>
                <li>
                  <nfl-link to="https://twitter.com/NiyoginFintech"
                    ><nuxt-img
                      src="/social-twitter-circular-button.svg"
                      alt=""
                      class="img-fluid"
                  /></nfl-link>
                </li>
                <li>
                  <nfl-link to="https://www.linkedin.com/company/niyogin.in"
                    ><nuxt-img
                      src="/social-linkedin-circular-button.svg"
                      alt=""
                      class="img-fluid"
                  /></nfl-link>
                </li>
              </ul>
            </div>
          </div>
          <div class="col-lg-6">
            <p class="copy-text">@copyright2019 Astrika Infotech.</p>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  data: function () {
    return {};
  },
  computed: {
    returnData() {
      return this.$store.state.menu.footer;
    },
  },
};
</script>
