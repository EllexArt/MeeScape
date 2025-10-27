import type { ForgeConfig } from '@electron-forge/shared-types';
import { MakerSquirrel } from '@electron-forge/maker-squirrel';
import { MakerZIP } from '@electron-forge/maker-zip';
import { MakerDeb } from '@electron-forge/maker-deb';
import { MakerRpm } from '@electron-forge/maker-rpm';
import { AutoUnpackNativesPlugin } from '@electron-forge/plugin-auto-unpack-natives';
import { WebpackPlugin } from '@electron-forge/plugin-webpack';
import { FusesPlugin } from '@electron-forge/plugin-fuses';
import { FuseV1Options, FuseVersion } from '@electron/fuses';

import path from 'path';
import { mainConfig } from './webpack.main.config';
import { rendererConfig } from './webpack.renderer.config';

const config: ForgeConfig = {
  packagerConfig: {
    asar: true,

    // 1. Icône de l’application (.ico pour Windows)
    icon: path.resolve(__dirname, 'assets/icon'), // sans extension

    // 2. Métadonnées Windows
    win32metadata: {
      CompanyName: 'TechQuack Studios',
      FileDescription: 'MEEscape - A Discord Adventure Game',
      ProductName: 'MEEscape',
      OriginalFilename: 'MEEscape.exe',
    },

    // 3. Empêche la console noire (mode silencieux)
    quiet: true,
  },

  rebuildConfig: {},

  makers: [
    // Installeur Windows (.exe)
    new MakerSquirrel({
      name: 'MEEscape',
      setupIcon: path.resolve(__dirname, 'assets/icon.ico'), // icône du setup
    }),

    // Mac et Windows zip
    new MakerZIP({}, ['darwin', 'win32']),

    // Linux
    new MakerRpm({}),
    new MakerDeb({}),
  ],

  plugins: [
    new AutoUnpackNativesPlugin({}),
    new WebpackPlugin({
      mainConfig,
      renderer: {
        config: rendererConfig,
        entryPoints: [
          {
            html: './src/index.html',
            js: './src/renderer.tsx',
            name: 'main_window',
            preload: {
              js: './src/preload.ts',
            },
          },
        ],
      },
    }),

    // Fuses Plugin : protège l'exe final
    new FusesPlugin({
      version: FuseVersion.V1,
      [FuseV1Options.RunAsNode]: false,
      [FuseV1Options.EnableCookieEncryption]: true,
      [FuseV1Options.EnableNodeOptionsEnvironmentVariable]: false,
      [FuseV1Options.EnableNodeCliInspectArguments]: false,
      [FuseV1Options.EnableEmbeddedAsarIntegrityValidation]: true,
      [FuseV1Options.OnlyLoadAppFromAsar]: true,
    }),
  ],
};

export default config;
