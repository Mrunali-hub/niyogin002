/* eslint-disable */
export default function ({ $axios, redirect, store, $toast, error }) {
  const { i18n } = store.state;
  $axios.onError(async (err) => {
    err = {
      ...err,
    };
    // console.log({ err });
    let redirectToError = false;
    let returnVal = false;
    const res = err.response || { status: 500, success: false };
    store.commit("updateGlobalLoader", false);
    if (res.status == 400) {
      redirectToError = false;
      returnVal = res;
    }
    if (res && res.data && res.data.message) {
      // let toastMSgObj = {
      //   subtitle: res.data.message,
      //   iconClass: "error",
      // };
      // $toast.error($utils.parseToast(toastMSgObj));

      if (redirectToError) {
        // $toast.error(res.data.message);
      } else {
        // $toast.show(res.data.message);
      }
    }
    if (redirectToError) {
      error("Page not found");
      // redirect(`/error?status=${res.status}`);
    }
    return Promise.resolve(returnVal);
  });
  $axios.onRequest((req) => {
    // prepend locale data in url
    // console.log(route.params);
    // let urlPrepend = `/api/${route.params.country}/${route.params.lang}`;
    // if (process.client) {
    //   urlPrepend = `/api/${i18n.country}/${i18n.language}`;
    // }
    store.commit("updateGlobalLoader", true);
  });
  $axios.onResponse((response) => {
    store.commit("updateGlobalLoader", false);
    let metaPushData = { metaData: {}, swiftMeta: {} };
    // if (
    //   response &&
    //   response.data &&
    //   response.data.message &&
    //   response.data.success === true
    // ) {
    //   // let toastMSgObj = {
    //   //   subtitle: response.data.message,
    //   //   iconClass: "success",
    //   // };
    //   // $toast.success($utils.parseToast(toastMSgObj));
    //   // $toast.success(response.data.message);
    // }
    if (
      response &&
      response.data &&
      response.data[0] &&
      response.data[0].yoast_head_json &&
      response.config.url !== "/job_openings"
    ) {
      store.dispatch("meta/updateMeta", response.data[0].yoast_head_json);
    }
    if (
      response.headers &&
      response.headers["x-wp-total"] &&
      response.config.params &&
      response.config.params.page
    ) {
      store.dispatch("blog/updatePagination", {
        total: parseInt(response.headers["x-wp-total"]),
        total_pages: parseInt(response.headers["x-wp-totalpages"]),
      });
    }

    return response;
  });
}
