import "dotenv/config";
import * as child_process from "child_process";

import * as appRootPath from "app-root-path";

const opts: child_process.ExecSyncOptions = {
    cwd: `${appRootPath}`,
    stdio: "inherit",
};

child_process.execSync("adb reverse tcp:8545 tcp:8545", opts);

child_process.execSync("expo run:android", opts);
