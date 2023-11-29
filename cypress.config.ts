import { addCucumberPreprocessorPlugin, afterRunHandler } from '@badeball/cypress-cucumber-preprocessor';
import preprocessor from '@cypress/webpack-preprocessor';

import { defineConfig } from 'cypress';
import fs from 'fs';
import path from 'path';
import { getReportMetadata } from './scripts/get-report-metadata';
const dotenv = require('dotenv').config();

async function setupNodeEvents(
  on: Cypress.PluginEvents,
  config: Cypress.PluginConfigOptions
): Promise<Cypress.PluginConfigOptions> {
  config.env = dotenv?.parsed || {};
  // This is required for the preprocessor to be able to generate JSON reports after each run, and more,
  await addCucumberPreprocessorPlugin(on, config);
  on(
    'file:preprocessor',
    preprocessor({
      webpackOptions: {
        resolve: {
          extensions: ['.ts', '.js'],
          alias: {
            '@utils': path.resolve(__dirname, 'src/utils/index.ts'),
            '@common': path.resolve(__dirname, 'src/common/index.ts'),
            '@config': path.resolve(__dirname, 'src/config/index.ts'),
            '@locator': path.resolve(__dirname, 'src/locator'),
            '@apps': path.resolve(__dirname, 'src/'),
          },
          modules: [path.resolve(__dirname, 'src'), 'node_modules'],
        },
        module: {
          rules: [
            {
              test: /\.ts$/,
              exclude: [/node_modules/],
              use: [
                {
                  loader: 'ts-loader',
                },
              ],
            },
            {
              test: /\.feature$/,
              use: [
                {
                  loader: '@badeball/cypress-cucumber-preprocessor/webpack',
                  options: config,
                },
              ],
            },

            {
              test: /\.js$/,
              exclude: [/node_modules/],
              use: [
                {
                  loader: 'esbuild-loader',
                },
              ],
            },
          ],
        },
      },
    })
  );

  // on('file:preprocessor', cucumber());

  on('after:run', async (results: any) => {
    fs.rmdir(path.resolve(__dirname, 'reports'), (err) => {
      if (err) {
        console.log('Error');
      }
    });

    await afterRunHandler(config);

    getReportMetadata(results);

    return results;
  });

  // Make sure to return the config object as it might have been modified by the plugin.
  return config;
}

export default defineConfig({
  e2e: {
    specPattern: 'src/cypress/e2e/**/*.feature',
    supportFile: 'src/cypress/support/e2e.{js,jsx,ts,tsx}',
    baseUrl: 'https://staging.aquabyte.ai',
    setupNodeEvents,
    viewportWidth: 1920,
    viewportHeight: 1080,
    testIsolation: false,
    defaultCommandTimeout: 60000,
    pageLoadTimeout: 60000,
    video: false,
  },

  video: false,

  fixturesFolder: 'src/cypress/fixtures',
});
