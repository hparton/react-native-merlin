module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          'react-native-safe-area-view': '../src/index',
        },
      },
    ],
  ],
};
