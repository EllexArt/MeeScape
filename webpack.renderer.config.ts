import type { Configuration } from 'webpack';
import { plugins } from './webpack.plugins';
import { rendererRules } from './webpack.rules.renderer';

const rules = [...rendererRules];
// CSS
rules.push({
  test: /\.css$/,
  use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
});

// Images
rules.push({
  test: /\.(png|jpe?g|gif|svg|webp|jpg|ico)$/i,
  type: 'asset/resource',
  generator: {
    filename: 'assets/images/[name][ext]',
  },
});

// Fonts
rules.push({
  test: /\.(woff|woff2|eot|ttf|otf)$/i,
  type: 'asset/resource',
  generator: {
    filename: 'assets/fonts/[name][ext]',
  },
});

export const rendererConfig: Configuration = {
  module: {
    rules,
  },
  plugins,
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css'],
  },
  target: 'web',
  mode: 'development',
  devtool: 'source-map',
};