# 빌드 스테이지
FROM node:18 AS build

WORKDIR /app
COPY . ./
RUN npm install
RUN npm run build

# 정적 파일 서빙용 nginx 컨테이너
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
