FROM node:22-alpine AS builder
WORKDIR /app
COPY package.json yarn.lock* ./
# Install all dependencies (including devDeps) to run the build
RUN yarn install --frozen-lockfile

COPY . .
# Generate SvelteKit types/metadata to fix tsconfig warnings and build errors
RUN yarn prepare
RUN yarn build

# --- Production Stage ---
FROM node:22-alpine AS runner
WORKDIR /app

# Copy the built application
COPY --from=builder /app/build build/
COPY --from=builder /app/drizzle drizzle/
COPY ./entrypoint.sh /app/entrypoint.sh
# Copy only production dependencies to keep the image small
COPY package.json yarn.lock* ./
RUN chmod +x /app/entrypoint.sh
RUN yarn install --production --frozen-lockfile

EXPOSE 3000
ENV NODE_ENV=production


ENTRYPOINT [ "/app/entrypoint.sh" ]
# SvelteKit adapter-node default entry point is build/index.js
CMD [ "node", "build/index.js" ]