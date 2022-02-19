import WalletConnectProvider from "@walletconnect/web3-provider";
import { ethers, utils } from "ethers";
import { Config } from "../config";
import CryptoKoi from "./abi/CryptoKoi.json";

export default class CryptoKoiSmartContract {
    private provider: ethers.providers.Web3Provider;
    private contract: ethers.Contract;
    private userAddress: string;

    constructor(walletConnectProvider: WalletConnectProvider) {
        this.provider = new ethers.providers.Web3Provider(
            walletConnectProvider
        );
        this.userAddress = walletConnectProvider.accounts[0];
        this.contract = new ethers.Contract(
            Config.contractAddress,
            CryptoKoi.abi,
            this.provider.getSigner()
        );
    }

    getUserAddress() {
        return this.userAddress;
    }

    async isSmartContract(address: string): Promise<boolean> {
        const bytecode = await this.provider.getCode(address);

        const isSmartContract =
            bytecode !== undefined && utils.hexStripZeros(bytecode) !== "0x";
        return isSmartContract;
    }
    checkIfValidNFT(tokenId: number) {
        return this.contract.ownerOf(tokenId);
    }

    redeem(tokenId: string, signature: unknown) {
        return this.contract.redeem(this.getUserAddress(), tokenId, signature);
    }

    static async ownerOf(tokenId: string) {
        const provider = ethers.getDefaultProvider(Config.chainUrl);

        const contract = new ethers.Contract(
            Config.contractAddress,
            CryptoKoi.abi,
            provider
        );
        return contract.ownerOf(tokenId);
    }

    ownBalance() {
        console.log(this.contract);
        return this.contract.balanceOf(this.getUserAddress());
    }
}
