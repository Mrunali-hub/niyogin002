<template>
  <div>
    <main v-if="!$fetchState.pending">
      <section class="hero-section institutional-offerings">
        <span class="circle one"></span>
        <span class="circle two"></span>
        <span class="circle three"></span>
        <span class="circle four"></span>
        <nuxt-img
          src="https://via.placeholder.com/955x606"
          alt=""
          class="bg-img img-fluid"
        />
        <div class="container">
          <h1 class="section-title">Institutional offerings</h1>
        </div>
      </section>
      <section class="productdetail-section">
        <div class="container">
          <h4 class="section-title">Introduction</h4>
          <p class="section-desc">
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
            erat, sed diam voluptua. At vero eos et accusam et justo duo dolores
            et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est
            Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur
            sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore
            et dolore magna aliquyam erat, sed diam voluptua. At vero eos et
            accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren,
            no sea takimata sanctus est Lorem ipsum dolor sit amet
          </p>
          <client-only>
            <b-tabs class="secondary">
              <b-tab title="Corporate Treasury" active>
                <div class="row align-items-center">
                  <div class="col-lg-6">
                    <nuxt-img
                      src="https://via.placeholder.com/527x331"
                      alt=""
                      class="img-fluid w-100"
                    />
                  </div>
                  <div class="col-lg-6">
                    <h4 class="title">Corporate Treasury</h4>
                    <p>
                      Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
                      sed diam nonumy eirmod tempor invidunt ut labore et dolore
                      magna aliquyam erat, sed diam voluptua. At vero eos et
                      accusam et justo duo dolores et ea rebum. Stet clita kasd
                    </p>
                    <button class="btn btn-primary">Apply now</button>
                  </div>
                </div>
              </b-tab>
              <b-tab title="Analytical Solutions">
                <div class="row align-items-center">
                  <div class="col-lg-6">
                    <nuxt-img
                      src="https://via.placeholder.com/527x331"
                      alt=""
                      class="img-fluid w-100"
                    />
                  </div>
                  <div class="col-lg-6">
                    <h4 class="title">Analytical Solutions</h4>
                    <p>
                      Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
                      sed diam nonumy eirmod tempor invidunt ut labore et dolore
                      magna aliquyam erat, sed diam voluptua. At vero eos et
                      accusam et justo duo dolores et ea rebum. Stet clita kasd
                    </p>
                    <button class="btn btn-primary">Apply now</button>
                  </div>
                </div>
              </b-tab>
              <b-tab title="Hospital Cash Insurance">
                <div class="row align-items-center">
                  <div class="col-lg-6">
                    <nuxt-img
                      src="https://via.placeholder.com/527x331"
                      alt=""
                      class="img-fluid w-100"
                    />
                  </div>
                  <div class="col-lg-6">
                    <h4 class="title">Hospital Cash Insurance</h4>
                    <p>
                      Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
                      sed diam nonumy eirmod tempor invidunt ut labore et dolore
                      magna aliquyam erat, sed diam voluptua. At vero eos et
                      accusam et justo duo dolores et ea rebum. Stet clita kasd
                    </p>
                    <button class="btn btn-primary">Apply now</button>
                  </div>
                </div>
              </b-tab>
              <b-tab title="Health Insurance">
                <div class="row align-items-center">
                  <div class="col-lg-6">
                    <nuxt-img
                      src="https://via.placeholder.com/527x331"
                      alt=""
                      class="img-fluid w-100"
                    />
                  </div>
                  <div class="col-lg-6">
                    <h4 class="title">Health Insurance</h4>
                    <p>
                      Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
                      sed diam nonumy eirmod tempor invidunt ut labore et dolore
                      magna aliquyam erat, sed diam voluptua. At vero eos et
                      accusam et justo duo dolores et ea rebum. Stet clita kasd
                    </p>
                    <button class="btn btn-primary">Apply now</button>
                  </div>
                </div>
              </b-tab>
              <b-tab title="Hospital Cash Insurance">
                <div class="row align-items-center">
                  <div class="col-lg-6">
                    <nuxt-img
                      src="https://via.placeholder.com/527x331"
                      alt=""
                      class="img-fluid w-100"
                    />
                  </div>
                  <div class="col-lg-6">
                    <h4 class="title">Hospital Cash Insurance</h4>
                    <p>
                      Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
                      sed diam nonumy eirmod tempor invidunt ut labore et dolore
                      magna aliquyam erat, sed diam voluptua. At vero eos et
                      accusam et justo duo dolores et ea rebum. Stet clita kasd
                    </p>
                    <button class="btn btn-primary">Apply now</button>
                  </div>
                </div>
              </b-tab>
            </b-tabs>
          </client-only>
        </div>
      </section>
      <BlFeed />
    </main>
  </div>
</template>

<script>
export default {
  data: function () {
    return {};
  },
  mounted() {
    if (process.client && window) {
      window.scrollTo(0, 0);
    }
  },
};
</script>
