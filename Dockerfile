FROM cypress/base:16.16.0
WORKDIR /app

# dependencies will be installed only if the package files change
COPY . .

# by setting CI environment variable we switch the Cypress install messages
# to small "started / finished" and avoid 1000s of lines of progress messages
# https://github.com/cypress-io/cypress/issues/1243
RUN yarn
# verify that Cypress has been installed correctly.
# running this command separately from "cypress run" will also cache its result
# to avoid verifying again when running the tests
RUN yarn test