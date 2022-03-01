import WalletConnectProvider from "@walletconnect/web3-provider";
import { BigNumber, ethers, providers, utils } from "ethers";
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
        // disable polling - real time events are not necessary.
        // this.provider.polling = false;
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
        const price: BigNumber = await this.contract.getPrice();
        const response = (await this.contract.redeem(
            this.getUserAddress(),
            tokenId,
            signature,
            {
                value: price,
            }
        )) as providers.TransactionResponse;
        return response.wait();
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
