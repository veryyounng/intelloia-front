# 1단계: 빌드 스테이지 (Node 환경)
FROM node:18 AS build
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . . 
RUN chmod +x ./node_modules/.bin/*

RUN npm run build

# 2단계: nginx로 정적 파일 서빙
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
