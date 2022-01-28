export default class Transformer {
    static uuidToBase64(uuid: string): string {
        const hex = uuid.replace(/-/g, "");
        return Buffer.from(hex, "hex").toString("base64");
    }
}
