FROM node:18 AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# 실행 권한 추가 (vite + tsc 둘 다)
RUN chmod +x ./node_modules/.bin/vite
RUN chmod +x ./node_modules/.bin/tsc || true  # 없어도 에러 안 나게

RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
