import Analytics from "analytics";
import segmentPlugin from "@analytics/segment";
import Router from "next/router";


const analytics = Analytics({
  debug: process.env.NODE_ENV !== "production",
  plugins: [
    segmentPlugin({
      // writeKey: process.env.NEXT_PUBLIC_SEGMENT_WRITE_KEY,
      writeKey: 'toreplace later',
    }),
  ],
});

// Track initial pageview
if (typeof window !== "undefined") {
  analytics.page();
}

// Track pageview on route change
Router.events.on("routeChangeComplete", (url) => {
  analytics.page();
});

export default analytics;
