const { withAppBuildGradle } = require('@expo/config-plugins');

const withAndroidOptimizations = (config) => {
  return withAppBuildGradle(config, (config) => {
    let buildGradle = config.modResults.contents;
    
    // Add abiFilters for fast compilation on New Architecture
    if (!buildGradle.includes('abiFilters "arm64-v8a"')) {
      buildGradle = buildGradle.replace(
        /defaultConfig\s*\{/,
        'defaultConfig {\n        ndk {\n            abiFilters "arm64-v8a"\n        }'
      );
    }
    
    // Disable lint to avoid lintVitalAnalyzeRelease crash
    if (!buildGradle.includes('checkReleaseBuilds false')) {
      buildGradle = buildGradle.replace(
        /android\s*\{/,
        'android {\n    lint {\n        checkReleaseBuilds false\n        abortOnError false\n    }'
      );
    }
    
    config.modResults.contents = buildGradle;
    return config;
  });
};

module.exports = withAndroidOptimizations;
