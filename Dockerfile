FROM cypress/base:16.14.2-slim

USER root

RUN apt-get update && apt-get install -y wget gnupg ca-certificates \
    libgtk2.0-0 libgtk-3-0 libgbm-dev libnotify-dev libnss3 libxss1 libasound2 libxtst6 xauth xvfb

# Install Google Chrome
RUN node -p "process.arch === 'arm64' ? 'Not downloading Chrome since we are on arm64: https://crbug.com/677140' : process.exit(1)" || \
  (wget --no-verbose -O /usr/src/google-chrome-stable_current_amd64.deb "http://dl.google.com/linux/chrome/deb/pool/main/g/google-chrome-stable/google-chrome-stable_100.0.4896.88-1_amd64.deb" && \
  dpkg -i /usr/src/google-chrome-stable_current_amd64.deb ; \
  apt-get install -f -y && \
  rm -f /usr/src/google-chrome-stable_current_amd64.deb)
# Set up the working directory
WORKDIR /app

# Copy app files
COPY . .

# Install dependencies
RUN yarn

RUN npx cypress run --browser chrome --e2e








