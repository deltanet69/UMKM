const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");
const path = require("path");

const config = getDefaultConfig(__dirname);

// Fix: Ensure EXPO_ROUTER_APP_ROOT is resolved at build time for web export
process.env.EXPO_ROUTER_APP_ROOT = path.join(__dirname, "app");

module.exports = withNativeWind(config, { input: "./global.css" });
