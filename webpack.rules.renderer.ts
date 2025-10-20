import type { ModuleOptions } from 'webpack';

// ⚠️ Règles SANS asset-relocator-loader pour le renderer
export const rendererRules: Required<ModuleOptions>['rules'] = [
  {
    test: /\.tsx?$/,
    exclude: /(node_modules|\.webpack)/,
    use: {
      loader: 'ts-loader',
      options: {
        transpileOnly: true,
      },
    },
  },
];