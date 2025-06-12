module.exports = function (api) {
  api.cache(false);
  return {
    presets: ['module:@react-native/babel-preset'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./src'],
          alias: {
            '@assets': './src/assets',
            '@components': './src/components',
            '@navigation': './src/navigation',
            '@network': './src/network',
            '@screens': './src/screens',
            '@services': './src/services',
            '@utils': './src/utils',
            '@home': './src/screens/HomeScreen',
            '@constants': './src/constants',
          },
        },
      ],
      'react-native-reanimated/plugin',
    ],
  };
};
