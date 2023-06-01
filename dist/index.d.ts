export declare class RateLimiter {
    private args;
    private buckets;
    private lastCleanup;
    constructor(args: {
        tokensPerInterval: number;
        interval: number;
    });
    getTokensRemaining(key: unknown): number;
    tryRemoveTokens(key: unknown, numTokens: number): boolean;
}
