import { Contract, ethers } from "ethers";
import { Config } from "../config";
import CryptoKoi from "./abi/CryptoKoi.json";

export default class Web3 {
    private provider: ethers.providers.BaseProvider;
    private readonly contract: Contract;
    constructor(readonly url: string, contractAddress: string) {
        this.provider = ethers.getDefaultProvider(url);
        this.contract = new ethers.Contract(
            contractAddress,
            CryptoKoi.abi,
            this.provider
        );
    }

    checkIfValidNFT(tokenId: string) {
        this.contract.ownerOf(tokenId);
    }
}

export const web3 = new Web3(Config.chainUrl, Config.contractAddress);
