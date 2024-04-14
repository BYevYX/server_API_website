# Многоэтапная сборка
# 1 этап: 
# сборка зависимостей
FROM node:21-alpine AS builder
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci --only=production

# 2 этап:
# сборка итогового образа
FROM node:21-alpine
WORKDIR /usr/src/app

# копирование зависимостей из предыдущего этапа
COPY --from=builder /usr/src/app/node_modules ./node_modules

# копирование остальных файлов
COPY ./app .

# установка временной зоны
ENV TZ=Europe/Moscow
RUN apk add --no-cache tzdata && \
    ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && \
    echo $TZ > /etc/timezone && \
    apk del tzdata

CMD ["npm", "start"]
