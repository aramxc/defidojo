FROM node:20

WORKDIR /app

COPY package*.json ./
COPY hardhat.config.ts ./
COPY contracts ./contracts
COPY scripts ./scripts

RUN npm install

EXPOSE 8545

CMD ["npx", "hardhat", "node"]