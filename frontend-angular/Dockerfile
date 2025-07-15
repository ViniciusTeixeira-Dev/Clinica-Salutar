# Stage 1: Build the Angular application
FROM node:18-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build --configuration=production

# Stage 2: Serve the Angular application with Nginx
FROM nginx:alpine
RUN mkdir -p /var/www/clinicasalutar
COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist/salutar-front/. /var/www/clinicasalutar/
RUN chmod -R 755 /var/www/clinicasalutar && chown -R nginx:nginx /var/www/clinicasalutar
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
