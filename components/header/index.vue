<template>
  <header class="header" :class="{ 'navbar--hidden': !showNavbar }">
    <div class="container">
      <div class="header-content">
        <nuxt-link to="/"
          ><nuxt-img src="/logo1.svg" alt="" class="img"
        /></nuxt-link>
        <button class="menu-toggle" @click="toggleMenu()">
          <!-- Revisit -->
          <transition name="fade">
            <img
              v-if="!isActiveMenu"
              width="25"
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAAAKElEQVRIiWNgGAXDHjAisf/TwmwmKhs6CgYhGE1Fo4ByMJqKRsEQAADWCQMKYvEFtQAAAABJRU5ErkJggg=="
            />
            <img
              v-else
              width="25"
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAABmJLR0QA/wD/AP+gvaeTAAACYUlEQVR4nO3cP2/TQBiA8YfwEVAD6ddgATqzw1o+bVjYofwRXRkQG1KzEgb3hrRxfHZ8vjv7+Ulek/fyVGnksw4kSZIkSZIkSZIkSYV4muh1L4G3wDPgF7BP9D5TWwFXwEvgL3CXd5w4H4AdTYQ98BF4nnWicaxp1hLWtQOus04U4ZLDGOH6St1R1sANj9e1AzYZ5+r0nsdD1x6lLUa43uUbrdsV7YPXGKUrxh54nW26CCtgyzyixMTY0qy5aBfAZ04v5Adlf/eugS+cXsN3yl7DgZqjzC5GUGOU2cYIaooy+xhBDVEWEyMoOcriYgQlRllsjKCkKIuPEZQQxRgP5IxijBY5ohijw5RRjBFpiijG6CllFGMMlCKKMc40ZhRjjGSMKMYY2TlRjJHIkCjGSKxPFGNMJCbKLc2HbYyJxEQxxsSGRjFGQn2jGGMCF8A3umPcUmGM4p+6O+LJ/aUCxPy09StrIn1jGCWhoTGMkkBMjJ90/6M3ygj63A6J+UlslDMMuTdllETOuVFolJGNcdfWKCMZ8xa6Uc6UYj/DKAOl3FwySk9T7PQZJdKU265G6ZBjD9woLXI+kGCUB0p4OsQo90qIESw+SkkxgsVGKTFGsLgoJccIFhOlhhjB7KPUFCOYbZQaYwSzi1JzjGA2UVYcHqV67LqhiVa6mD+s4o/46zoEs5YYQUyUN9mmi3DqmNjaYgRdUYo+JnbD8YOUa40RtEW5A15knCvKNYdRttQdI1hzeARukqPGUz1FvgFeAX+AT8C/RO8ztRXNwclrmnX9zjuOJEmSJEmSJEmSJCmh/3Wl0yDXnEkpAAAAAElFTkSuQmCC"
            />
          </transition>

          <!-- <nuxt-img src="https://via.placeholder.com/33x30" alt="" /> -->
        </button>
        <div :class="{ active: isActiveMenu }" class="mobile-menu">
          <ul class="list-unstyled main-menu">
            <li
              v-for="(item, index) in returnData"
              :key="`nfl-header-${index}`"
              :class="`${item.submenu.length ? `sub-menu` : null}`"
            >
              <nfl-link
                :to="item.url"
                @click="isActiveMenu = !isActiveMenu"
                v-html="item.title"
              ></nfl-link>

              <ul v-if="item.submenu.length" class="list-unstyled">
                <li
                  v-for="(subItem, subIndex) in item.submenu"
                  :key="`nfl-header-${subIndex}-${index}`"
                >
                  <nfl-link
                    :to="subItem.url"
                    @click.native="isActiveMenu = !isActiveMenu"
                    v-html="subItem.title"
                  ></nfl-link>
                </li>
              </ul>
            </li>
          </ul>
          <ul class="list-unstyled extra-menu">
            <li>
              <a
                href="https://www.niyogin.com/login"
                target="_blank"
                class="btn btn-primary"
                >LOGIN</a
              >
            </li>
            <!-- <li>
              <p class="mb-0">Niyogin 89.65</p>
              <span>+4.25</span> <span>+0.15%</span>
            </li> -->
          </ul>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  data: function () {
    return {
      isActiveMenu: false,
      showNavbar: true,
      lastScrollPosition: 0,
    };
  },
  computed: {
    returnData() {
      return this.$store.state.menu.header;
    },
  },
  mounted() {
    window.addEventListener("scroll", this.onScroll);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.onScroll);
  },
  methods: {
    toggleMenu: function () {
      this.isActiveMenu = !this.isActiveMenu;
    },
    onScroll() {
      // Get the current scroll position
      const currentScrollPosition =
        window.pageYOffset || document.documentElement.scrollTop;
      // Because of momentum scrolling on mobiles, we shouldn't continue if it is less than zero
      if (currentScrollPosition < 0) {
        return;
      }
      // Stop executing this function if the difference between
      // current scroll position and last scroll position is less than some offset
      if (Math.abs(currentScrollPosition - this.lastScrollPosition) < 60) {
        return;
      }
      // Here we determine whether we need to show or hide the navbar
      this.showNavbar = currentScrollPosition < this.lastScrollPosition;
      // Set the current scroll position as the last scroll position
      this.lastScrollPosition = currentScrollPosition;
    },
  },
};
</script>
