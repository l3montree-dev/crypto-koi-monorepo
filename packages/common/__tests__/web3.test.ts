import { chainId2Hex, hexChainId2Number } from "../lib/web3";

describe('@crypto-koi/common', () => {
    it('should convert a chain id to hex', () => {
       expect(hexChainId2Number(chainId2Hex(80001))).toEqual(80001);
    });
});
