const { defineConfig } = require('cypress')
const createBundler = require('@bahmutov/cypress-esbuild-preprocessor')
const preprocessor = require('@badeball/cypress-cucumber-preprocessor')
const createEsbuildPlugin = require('@badeball/cypress-cucumber-preprocessor/esbuild')

async function setupNodeEvents(on, config) {
  
  await preprocessor.addCucumberPreprocessorPlugin(on, config)

  on(
    'file:preprocessor',
    createBundler({
      plugins: [createEsbuildPlugin.default(config)],
    })
  )

  on('task', {
    log(args) {
      console.log(...args)
      return null
    },
  })

  return config
}

module.exports = defineConfig({
  projectId: 'h9vwxz',
  e2e: {
    watchForFileChanges:false,
    setupNodeEvents,
    specPattern: 'cypress/e2e/**/*.feature',
    baseUrl: 'https://parabank.parasoft.com/',
    chromeWebSecurity: false,
    env: {} 
  },
})
