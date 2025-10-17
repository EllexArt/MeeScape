import * as path from 'path';
import type { Configuration } from 'webpack';

import { rules } from './webpack.rules';
import { plugins } from './webpack.plugins';

rules.push({
  test: /\.(png|jpe?g|gif|svg)$/i,
  type: 'asset/resource',
});

rules.push({
  test: /\.css$/i,
  use: ['style-loader', 'css-loader'],
});

export const rendererConfig: Configuration = {
  target: 'web', // ← Très important : renderer process = environnement navigateur
  entry: {
    renderer: './src/renderer.tsx',
    preload: './src/preload.ts',
  },
  output: {
    path: path.resolve(__dirname, '.webpack/renderer'),
    filename: 'renderer.js',
  },
  module: {
    rules,
  },
  plugins,
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css'],
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    port: 3000,
    hot: true,
    historyApiFallback: true,
  },
};
