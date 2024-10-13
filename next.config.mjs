// const { withKumaUI } = require("@kuma-ui/next-plugin");
import { withKumaUI } from "@kuma-ui/next-plugin";

/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
};

// module.exports = withKumaUI(nextConfig, {
export default withKumaUI(nextConfig, {
	// The destination to emit an actual CSS file. If not provided, the CSS will be injected via virtual modules.
	outputDir: "./.kuma", // Optional
	// Enable WebAssembly support for Kuma UI. Default is false and will use Babel to transpile the code.
	wasm: true // Optional
});