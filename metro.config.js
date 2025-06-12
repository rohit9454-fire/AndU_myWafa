const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');
const {
  wrapWithReanimatedMetroConfig,
} = require('react-native-reanimated/metro-config');

// Step 1: Define your custom Metro configuration
const customConfig = {
  // Add your custom configurations here (if any)
  events: require.resolve('events'),
  timers: require.resolve('timers'),
};

// Step 2: Merge the default Metro configuration with your custom configuration
const baseConfig = mergeConfig(getDefaultConfig(__dirname), customConfig);

// Step 3: Wrap the merged configuration with Reanimated's Metro configuration
module.exports = wrapWithReanimatedMetroConfig(baseConfig);
