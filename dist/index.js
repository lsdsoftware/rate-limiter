"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RateLimiter = void 0;
class Bucket {
    constructor(count, expire) {
        this.count = count;
        this.expire = expire;
    }
    isValid() {
        return this.expire > Date.now();
    }
}
class RateLimiter {
    constructor(args) {
        this.args = args;
        this.buckets = new Map();
        this.lastCleanup = Date.now();
    }
    getTokensRemaining(key) {
        const bucket = this.buckets.get(key);
        return (bucket === null || bucket === void 0 ? void 0 : bucket.isValid()) ? bucket.count : this.args.tokensPerInterval;
    }
    tryRemoveTokens(key, numTokens) {
        if (Date.now() - this.lastCleanup > 2 * this.args.interval) {
            this.lastCleanup = Date.now();
            for (const [key, bucket] of this.buckets)
                if (!bucket.isValid())
                    this.buckets.delete(key);
        }
        let bucket = this.buckets.get(key);
        if (!(bucket === null || bucket === void 0 ? void 0 : bucket.isValid())) {
            bucket = new Bucket(this.args.tokensPerInterval, Date.now() + this.args.interval);
            this.buckets.set(key, bucket);
        }
        if (numTokens <= bucket.count) {
            bucket.count -= numTokens;
            return true;
        }
        else {
            return false;
        }
    }
}
exports.RateLimiter = RateLimiter;
