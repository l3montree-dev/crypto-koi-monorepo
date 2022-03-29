.PHONY: web native yarn

web: install
	yarn workspace @crypto-koi/web dev

native: install
	yarn workspace @crypto-koi/native android

install-native: yarn packages/native/package.json
	yarn workspace @crypto-koi/native install

install: apps/web/package.json apps/native/package.json packages/common/package.json
	yarn install || npm i --global yarn && yarn install

