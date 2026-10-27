# Image for the design repository: site development (astro dev), commands (tests, build) and a preview of the built
# site served by nginx. Pinned versions.

FROM node:24.22.1-alpine AS base
WORKDIR /app
RUN chown node:node /app
USER node
COPY --chown=node:node package.json package-lock.json ./
COPY --chown=node:node packages/design/package.json packages/design/
COPY --chown=node:node site/package.json site/
RUN npm ci --no-audit --no-fund

# Development: compose.yml mounts the repository in /app, dependencies stay those of the image.
FROM base AS dev
EXPOSE 4321
CMD ["npm", "run", "dev", "-w", "site", "--", "--host", "0.0.0.0", "--port", "4321"]

# Checked build: package tests, site, internal links.
FROM base AS build
COPY --chown=node:node . .
RUN npm test && npm run build && npm run links

# Preview of the site as it will be published.
FROM nginx:1.29-alpine AS preview
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/site/dist /usr/share/nginx/html
