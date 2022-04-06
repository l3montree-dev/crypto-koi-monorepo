.PHONY: web native install

web: install
	yarn workspace @crypto-koi/web dev

native: install
	yarn workspace @crypto-koi/native android

native-start: install
	yarn workspace @crypto-koi/native start

install: apps/web/package.json apps/native/package.json packages/common/package.json
	yarn install || (npm i --global yarn && yarn install)

