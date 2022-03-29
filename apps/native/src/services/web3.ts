import { switchOrAddNetworkFactory } from "@crypto-koi/common/lib/web3";
import log from "../utils/logger";

export const switchOrAddNetwork = switchOrAddNetworkFactory(log);
