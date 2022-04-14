FROM node:16.14

WORKDIR /usr/app/

ENV NODE_ENV production
ENV PORT 3000

ARG API_HOST
ENV NEXT_PUBLIC_API_HOST=$API_HOST
ARG CMS_HOST
ENV NEXT_PUBLIC_CMS_HOST=$CMS_HOST
ARG SENTRY_AUTH_TOKEN
ENV SENTRY_AUTH_TOKEN=$SENTRY_AUTH_TOKEN

EXPOSE 3000

COPY . .

RUN touch apps/web/.sentryclirc
RUN echo "[auth]" >> apps/web/.sentryclirc
RUN echo "$SENTRY_AUTH_TOKEN" >> apps/web/.sentryclirc

RUN yarn install

RUN cd apps/web && NODE_OPTIONS=--max_old_space_size=4096 yarn run build

CMD [ "yarn", "workspace", "@crypto-koi/web", "start" ]
