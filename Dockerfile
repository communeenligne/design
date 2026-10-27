# Image du dépôt design : développement du site (astro dev), commandes (tests, construction) et aperçu du site
# construit servi par nginx. Versions fixes.

FROM node:24.22.1-alpine AS base
WORKDIR /app
RUN chown node:node /app
USER node
COPY --chown=node:node package.json package-lock.json ./
COPY --chown=node:node packages/design/package.json packages/design/
COPY --chown=node:node site/package.json site/
RUN npm ci --no-audit --no-fund

# Développement : le dépôt est monté dans /app par compose.yml, les dépendances restent celles de l'image.
FROM base AS dev
EXPOSE 4321
CMD ["npm", "run", "dev", "-w", "site", "--", "--host", "0.0.0.0", "--port", "4321"]

# Construction vérifiée : tests du paquet, site, liens internes.
FROM base AS build
COPY --chown=node:node . .
RUN npm test && npm run build && npm run links

# Aperçu du site tel qu'il sera publié.
FROM nginx:1.29-alpine AS preview
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/site/dist /usr/share/nginx/html
