FROM node:16.14

WORKDIR /usr/app/

ENV NODE_ENV production
ENV PORT 3000

ARG API_HOST
ENV NEXT_PUBLIC_API_HOST=$API_HOST
ARG CMS_HOST
ENV NEXT_PUBLIC_CMS_HOST=$CMS_HOST

EXPOSE 3000

COPY . .

RUN yarn install

RUN NODE_OPTIONS=--max_old_space_size=4096 yarn workspace @crypto-koi/web build

RUN cd apps/web
CMD [ "next", "start" ]
