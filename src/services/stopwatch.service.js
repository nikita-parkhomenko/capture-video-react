
class Stopwatch {
    constructor() {
        this.startTime = null;
        this.updatedTime = null;
        // this.difference;
        this.timeInterval = null;
        // this.savedTime;
        this.paused = 0;
        this.running = 0;
    }

    start() {
        if (!this.running) {
            this.startTime = new Date().getTime();
            this.timeInterval = setInterval(() => {}, 1000);
        }
    }

    getShowTime() {
        this.updatedTime = new Date().getTime();
    }
}

export default Stopwatch;
