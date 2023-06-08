FROM node:18
LABEL authors="Lolp1ke"

WORKDIR /todo

COPY backend/package.json .
COPY backend .
COPY shared /shared

RUN yarn

ENV PORT=8000

EXPOSE 8000

CMD ["yarn", "start"]