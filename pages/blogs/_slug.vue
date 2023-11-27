<template>
  <div>
    <main v-if="!$fetchState.pending">
      <section class="hero-section pt-5 pb-5">
        <div class="container text-center">
          <nuxt-img
            v-if="
              returnData._embedded &&
              returnData._embedded['wp:featuredmedia'] &&
              returnData._embedded['wp:featuredmedia']['0']
            "
            :src="returnData._embedded['wp:featuredmedia']['0'].source_url"
            :alt="returnData._embedded['wp:featuredmedia']['0'].alt_text"
            class="img-fluid"
          />
        </div>
      </section>
      <section class="blog-details-section">
        <div class="container">
          <article>
            <header>
              <h2 class="section-title" v-html="returnData.title.rendered"></h2>
              <div class="extra">
                <time datetime="2021-05-20 20:00" class="time">
                  <nuxt-img src="/icons/calendar.svg" alt="" class="icon" />
                  {{ returnData.date }} |
                  <span class="last-read">{{ avgReadTime }} min read</span>
                </time>
                <ul class="list-unstyled">
                  <li>
                    <nfl-link
                      :to="socialMediaLinkCreator('facebook')"
                      target="_blank"
                    >
                      <nuxt-img src="/icons/facebook.svg" alt="" />
                    </nfl-link>
                  </li>
                  <li>
                    <nfl-link
                      :to="socialMediaLinkCreator('linkedin')"
                      target="_blank"
                    >
                      <nuxt-img src="/icons/linkedin.svg" alt="" />
                    </nfl-link>
                  </li>
                  <li>
                    <nfl-link
                      :to="socialMediaLinkCreator('twitter')"
                      target="_blank"
                    >
                      <nuxt-img src="/icons/twitter.svg" alt="" />
                    </nfl-link>
                  </li>
                  <li>
                    <nfl-link
                      :to="socialMediaLinkCreator('whatsapp')"
                      target="_blank"
                    >
                      <nuxt-img src="/icons/whatsapp.svg" alt="" />
                    </nfl-link>
                  </li>
                  <li>
                    <nfl-link
                      :to="socialMediaLinkCreator('share')"
                      target="_blank"
                    >
                      <nuxt-img src="/icons/share.svg" alt="" />
                    </nfl-link>
                  </li>
                </ul>
              </div>
            </header>

            <div
              class="article-body"
              v-html="returnData.content.rendered"
            ></div>
          </article>
          <div v-if="returnData._embedded['wp:term']" class="tags">
            <span class="title">Tags</span>
            <template v-for="(item, index) in returnData._embedded['wp:term']">
              <span v-if="item && item[0]" :key="`nfl-blogs-tags-${index}`">{{
                item[0].name
              }}</span>
            </template>
          </div>
          <div class="next-article">
            <div v-if="returnData.previous">
              <h4 class="title">Previous Post</h4>
              <div class="content">
                <p class="text" v-html="returnData.previous.title"></p>
                <time>
                  <span class="icon">
                    <nuxt-img
                      src="/icons/calendar.svg"
                      width="20"
                      height="20"
                      alt=""
                  /></span>
                  {{ returnData.previous.date }}
                </time>
              </div>
              <nfl-link :to="`/blogs/${returnData.previous.slug}`">
                <nuxt-img src="/icons/left_arrow.png" alt="" class="link" />
              </nfl-link>
            </div>
            <div v-if="returnData.next">
              <h4 class="title">Next Post</h4>
              <div class="content">
                <p class="text" v-html="returnData.next.title"></p>
                <time>
                  <span class="icon">
                    <nuxt-img src="/icons/calendar.svg" alt=""
                  /></span>
                  {{ returnData.next.date }}
                </time>
              </div>
              <nfl-link :to="`/blogs/${returnData.next.slug}`">
                <nuxt-img src="/icons/right_arrow.png" class="link" alt="" />
              </nfl-link>
            </div>
          </div>
          <div v-if="0" class="comments-section">
            <h4 class="title">Comments on</h4>
            <p class="text">
              Your email address will not be published. Mandatory fields are
              marked *
            </p>
            <div class="post-comment">
              <label for="comment">Comment</label>
              <textarea
                id="comment"
                name=""
                placeholder="Write your comment here..."
              ></textarea>
              <div class="text-right">
                <button class="btn btn-primary">Post Comment</button>
              </div>
            </div>
          </div>
          <ul v-if="0" class="list-unstyled comment-list">
            <li>
              <div class="comment">
                <div class="avatar">
                  <nuxt-img
                    src="https://via.placeholder.com/54x54"
                    alt=""
                    class="img-fluid"
                  />
                </div>
                <div class="content">
                  <p class="user-info">
                    <span class="user">
                      <nuxt-img
                        src="https://via.placeholder.com/17x17"
                        alt=""
                        class="icon"
                      />
                      Ashutosh Sharotri
                    </span>
                    <time>
                      <nuxt-img
                        src="https://via.placeholder.com/17x17"
                        alt=""
                        class="icon"
                      />
                      25 Nov, 2018
                    </time>
                  </p>
                  <p class="text">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum.
                  </p>
                </div>
              </div>
              <p class="text-right">
                <button class="btn btn-primary">REPLY</button>
              </p>
              <ul class="list-unstyled reply-list">
                <li>
                  <div class="comment">
                    <div class="avatar">
                      <nuxt-img
                        src="https://via.placeholder.com/54x54"
                        alt=""
                        class="img-fluid"
                      />
                    </div>
                    <div class="content">
                      <p class="user-info">
                        <span class="user">
                          <nuxt-img
                            src="https://via.placeholder.com/17x17"
                            alt=""
                            class="icon"
                          />
                          Ashutosh Sharotri
                        </span>
                        <time>
                          <nuxt-img
                            src="https://via.placeholder.com/17x17"
                            alt=""
                            class="icon"
                          />
                          25 Nov, 2018
                        </time>
                      </p>
                      <p class="text">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat. Duis aute irure dolor in
                        reprehenderit in voluptate velit esse cillum dolore eu
                        fugiat nulla pariatur. Excepteur sint occaecat cupidatat
                        non proident, sunt in culpa qui officia deserunt mollit
                        anim id est laborum.
                      </p>
                    </div>
                  </div>
                  <p class="text-right">
                    <button class="btn btn-primary">REPLY</button>
                  </p>
                </li>
              </ul>
            </li>
            <li>
              <div class="comment">
                <div class="avatar">
                  <nuxt-img
                    src="https://via.placeholder.com/54x54"
                    alt=""
                    class="img-fluid"
                  />
                </div>
                <div class="content">
                  <p class="user-info">
                    <span class="user">
                      <nuxt-img
                        src="https://via.placeholder.com/17x17"
                        alt=""
                        class="icon"
                      />
                      Ashutosh Sharotri
                    </span>
                    <time>
                      <nuxt-img
                        src="https://via.placeholder.com/17x17"
                        alt=""
                        class="icon"
                      />
                      25 Nov, 2018
                    </time>
                  </p>
                  <p class="text">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum.
                  </p>
                </div>
              </div>
              <p class="text-right">
                <button class="btn btn-primary">REPLY</button>
              </p>
            </li>
          </ul>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
import nflLink from "~/components/nfl-link.vue";
export default {
  components: { nflLink },
  // getPageData

  data: function () {
    return { returnData: {}, content: "" };
  },

  async fetch() {
    this.returnData = await this.$store.dispatch(
      "blog/getPageData",
      this.$nuxt.$route.params.slug
    );
    if (
      this.returnData &&
      this.returnData.title &&
      this.returnData.title.rendered
    ) {
      this.content = this.returnData.title.rendered;
    }
  },
  computed: {
    avgReadTime() {
      if (
        this.returnData &&
        this.returnData.content &&
        this.returnData.content.rendered
      ) {
        return (this.returnData.content.rendered.length / 25 / 60).toFixed(2);
      }
      return 0;
    },
  },
  mounted() {
    if (process.client && window) {
      window.scrollTo(0, 0);
    }
  },
  methods: {
    socialMediaLinkCreator(args) {
      if (process.client) {
        if (args === "facebook") {
          return (
            "https://www.facebook.com/sharer/sharer.php?u=" +
            window.location.origin +
            this.$route.fullPath
          );
        } else if (args === "twitter") {
          return (
            "http://twitter.com/share?text=" +
            this.content +
            "&url=" +
            window.location.origin +
            this.$route.fullPath
          );
        } else if (args === "whatsapp") {
          if (process.client) {
            return (
              "whatsapp://send?text=" +
              this.content +
              " " +
              window.location.origin +
              this.$route.fullPath
            );
          }
        } else {
          return (
            "subject= NFL Website  -  " +
            "&body= Hi, %0D%0A %0D%0A I read this article on the Niyogin website and thought you would enjoy it too- " +
            window.location.origin +
            this.$route.fullPath
          );
        }
        return args;
      }
    },
  },
  fetchDelay: 0,
};
</script>
