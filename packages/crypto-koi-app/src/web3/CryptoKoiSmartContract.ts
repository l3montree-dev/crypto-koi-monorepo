import WalletConnectProvider from "@walletconnect/web3-provider";
import { BigNumber, ethers, utils } from "ethers";
import { config } from "../config";
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
            config.contractAddress,
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

    async redeem(tokenId: string, signature: unknown) {
        // get the price.
        const price: BigNumber = await this.contract.getPrice();

        return this.contract.redeem(this.getUserAddress(), tokenId, signature, {
            value: price,
        });
    }

    static async ownerOf(tokenId: string) {
        const provider = ethers.getDefaultProvider(config.chainUrl);

        const contract = new ethers.Contract(
            config.contractAddress,
            CryptoKoi.abi,
            provider
        );
        return contract.ownerOf(tokenId);
    }

    ownBalance() {
        return this.contract.balanceOf(this.getUserAddress());
    }
}
