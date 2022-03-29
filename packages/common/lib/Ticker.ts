class Ticker {
    private interval: NodeJS.Timeout | number;

    private tickers: { [s: string]: () => void | Promise<void> } = {};

    constructor() {
        this.interval = setInterval(() => {
            this.tick();
        }, 1000);
    }

    tick() {
        Object.values(this.tickers).forEach((ticker) => {
            ticker();
        });
    }

    addTickHandler(id: string, fn: () => void) {
        this.tickers[id] = fn;
    }

    removeTickHandler(id: string) {
        delete this.tickers[id];
    }

    clear() {
        clearInterval(this.interval as NodeJS.Timeout);
    }
}

export const ticker = new Ticker();
