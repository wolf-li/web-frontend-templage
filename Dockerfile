# date: 2024/9/17
# os: ubuntu 20.0.4
# glibc: Ubuntu GLIBC 2.31-0ubuntu9.16 （与 node 18 有版本要求）
# docker hub mirror: aws ecr
# docker-ce version: 27.2.1

# 项目ant design pro 6.0.0 需要使用高版本 node ,支持 node 18+
FROM public.ecr.aws/docker/library/node:18.18-alpine AS builder

# 创建工作目录
WORKDIR /app

# 复制 package.json 和 package-lock.json
COPY package*.json .

# 安装依赖，建议配置阿里云比较稳定，我这里配置自己的镜像源
# RUN npm config set registry https://registry.npmmirror.com -g
RUN npm config set registry http://192.168.1.23:8081/repository/npm_taobo/ -g && npm i --no-cache

# 复制项目源码
COPY . .

# 构建项目
RUN npm run build

# 建议使用 alpine 小
FROM public.ecr.aws/docker/library/nginx:alpine AS production

COPY --from=builder /app/dist/ /usr/share/nginx/html/
COPY ./deploy/default.conf.template /etc/nginx/templates/default.conf.template

# 如果 nginx 配置模板使用非 80 端口使用下面的语句
# EXPOSE port