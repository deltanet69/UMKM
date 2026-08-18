const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");
const path = require("path");

const config = getDefaultConfig(__dirname);

// Let Expo handle EXPO_ROUTER_APP_ROOT natively

module.exports = withNativeWind(config, { input: "./global.css" });
