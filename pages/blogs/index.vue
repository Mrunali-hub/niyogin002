<template>
  <div>
    <main v-if="!$fetchState.pending">
      <section v-if="pageData.acf.hero" class="hero-section blogs">
        <span class="circle one"></span>
        <span class="circle two"></span>
        <span class="circle three"></span>
        <span class="circle four"></span>
        <nuxt-img
          v-if="pageData.acf.hero && pageData.acf.hero.image"
          :src="pageData.acf.hero.image.url"
          :alt="pageData.acf.hero.image.alt"
          class="bg-img img-fluid"
        />
        <div class="container">
          <h1 class="section-title">{{ pageData.acf.hero.text }}</h1>
        </div>
      </section>
      <section class="blogs-section">
        <div class="container">
          <div class="list-unstyled blogs-list">
            <!-- Blog Card start -->
            <nuxt-link
              v-for="(item, index) in returnData"
              :key="`nfl-feed-section-${index}`"
              :to="`/blogs/${item.slug}`"
            >
              <article>
                <nuxt-img
                  v-if="
                    item._embedded['wp:featuredmedia'] &&
                    item._embedded['wp:featuredmedia']['0']
                  "
                  :src="item._embedded['wp:featuredmedia']['0'].source_url"
                  :alt="item._embedded['wp:featuredmedia']['0'].alt_text"
                  width="483"
                  height="290"
                  class="img-fluid w-100"
                />
                <nuxt-img
                  v-else
                  src="https://via.placeholder.com/115x110"
                  width="483"
                  height="290"
                  alt=""
                  class="img-fluid"
                />
                <h4 class="title" v-html="item.title.rendered"></h4>
                <div class="text" v-html="item.excerpt.rendered"></div>
              </article>
            </nuxt-link>
            <!-- Blog Card End -->
          </div>
          <div v-if="pagination" class="list-unstyled pagination">
            <button
              v-for="(item, index) in parseInt(pagination.total_pages)"
              :key="`nfl-blog-${index}`"
              :class="`${index + 1 == page ? 'active' : null}`"
              @click="page = index + 1"
            >
              {{ index + 1 }}
            </button>
            <span v-if="0"
              ><nuxt-img src="https://via.placeholder.com/10x20" alt=""
            /></span>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      per_page: 8,
      page: 1,
      total: 0,
    };
  },

  fetchDelay: 0,
  async fetch() {
    const payload = {
      per_page: this.per_page,
      page: this.page,
      _embed: "true",
    };
    await this.$store.dispatch("blog/getAllBlogs", payload);
    await this.$store.dispatch("blog/getBlogHero");
  },
  computed: {
    returnData() {
      return this.$store.state.blog.allBlogs;
    },
    pageData() {
      return this.$store.state.blog.hero;
    },
    pagination() {
      return this.$store.state.blog.pagination;
    },
  },
  watch: {
    async page() {
      const payload = {
        per_page: this.per_page,
        page: this.page,
        _embed: "true",
      };
      await this.$store.dispatch("blog/getAllBlogs", payload);
    },
  },
  mounted() {
    if (process.client && window) {
      window.scrollTo(0, 0);
    }
  },
};
</script>
