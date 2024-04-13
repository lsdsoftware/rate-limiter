export declare function makeRateLimiter({ tokensPerInterval, interval }: {
    tokensPerInterval: number;
    interval: number;
}): {
    getTokensRemaining(key: unknown): number;
    tryRemoveTokens(key: unknown, numTokens: number): boolean;
};
