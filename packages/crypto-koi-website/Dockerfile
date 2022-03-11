FROM node:16

WORKDIR /usr/app/

ENV NODE_ENV production
ENV PORT 3000

ENV NEXT_PUBLIC_CMS_HOST=https://cms.crypto-koi.io

EXPOSE 3000

COPY . .

RUN npm install

RUN NODE_OPTIONS=--max_old_space_size=4096 npm run build

CMD [ "npm", "start" ]
