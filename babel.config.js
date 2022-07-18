module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          extensions: ['.js', 'jsx', '.ts', '.tsx', '.json', '.png', '.jpg'],
          alias: {
            '@': './src',
            '@assets': './assets',
          },
        },
      ],
      'react-native-reanimated/plugin',
      'inline-dotenv',
    ],
  };
};
