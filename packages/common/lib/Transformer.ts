import { BigNumber, utils } from 'ethers'

export default class Transformer {
    static uuidToBase64(uuid: string): string {
        const hex = uuid.replace(/-/g, '')
        return utils.base64.encode('0x' + hex)
    }

    static uuidToUint256(uuid: string): string {
        const hex = uuid.replace(/-/g, '')
        const bigN = BigNumber.from('0x' + hex)
        return bigN.toString()
    }
}
