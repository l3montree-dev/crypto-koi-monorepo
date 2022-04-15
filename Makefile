.PHONY: web native install

web: install
	yarn workspace @crypto-koi/web dev

web-https: install
	yarn workspace @crypto-koi/web dev-https

native-android: install
	yarn workspace @crypto-koi/native android

native-ios: install
	yarn workspace @crypto-koi/native ios

native-start: install
	yarn workspace @crypto-koi/native start

install: apps/web/package.json apps/native/package.json packages/common/package.json
	yarn install || (npm i --global yarn && yarn install)

