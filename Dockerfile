# Official Playwright image with Node and browsers
FROM mcr.microsoft.com/playwright:v1.57.0-jammy

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and yarn.lock
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy the rest of the project
COPY . .

# Run tests in headless mode
CMD ["yarn", "run", "test"]
