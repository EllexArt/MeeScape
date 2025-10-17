import * as path from 'path';
import type { Configuration } from 'webpack';

export const preloadConfig: Configuration = {
  target: 'electron-preload',
  entry: './src/preload.ts', // ou preload.js si tu préfères
  output: {
    path: path.resolve(__dirname, '.webpack/renderer/main_window'),
    filename: 'preload.js',
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: 'ts-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
};
