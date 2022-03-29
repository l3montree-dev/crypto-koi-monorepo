import { BigNumber } from "ethers";

export default class Transformer {
    static uuidToBase64(uuid: string): string {
        const hex = uuid.replace(/-/g, "");
        return Buffer.from(hex, "hex").toString("base64");
    }

    static uuidToUint256(uuid: string): string {
        const hex = uuid.replace(/-/g, "");
        const bigN = BigNumber.from("0x" + hex);
        return bigN.toString();
    }
}
