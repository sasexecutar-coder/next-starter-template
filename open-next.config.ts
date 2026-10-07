import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import staticAssetsIncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/static-assets-incremental-cache";

// The blog is fully static (Markdown in `_posts` is read at build time only —
// Workers have no filesystem). Serving the prerendered pages from the static
// assets binding means no request ever re-renders a page or touches `fs`.
export default {
	...defineCloudflareConfig({
		incrementalCache: staticAssetsIncrementalCache,
		enableCacheInterception: true,
	}),
	// `npm run build` runs the OpenNext build, so OpenNext must call Next
	// directly instead of the `build` script (which would recurse).
	buildCommand: "next build",
};
