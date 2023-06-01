"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
const assert = require("assert");
runTest()
    .then(() => console.log("Test successful"))
    .catch(console.error);
async function runTest() {
    const limiter = new index_1.RateLimiter({
        tokensPerInterval: 5,
        interval: 2000
    });
    assert(limiter.getTokensRemaining("k1") == 5);
    assert(limiter.tryRemoveTokens("k1", 3) == true);
    assert(limiter.getTokensRemaining("k1") == 2);
    assert(limiter.tryRemoveTokens("k1", 4) == false);
    assert(limiter.tryRemoveTokens("k2", 4) == true);
    await new Promise(f => setTimeout(f, 1500));
    assert(limiter.tryRemoveTokens("k1", 4) == false);
    assert(limiter.getTokensRemaining("k1") == 2);
    await new Promise(f => setTimeout(f, 1000));
    assert(limiter.tryRemoveTokens("k1", 4) == true);
    //new bucket, won't expire until 2 seconds from now
    assert(limiter.getTokensRemaining("k1") == 1);
    assert(limiter.tryRemoveTokens("k1", 2) == false);
    await new Promise(f => setTimeout(f, 1900));
    assert(limiter.tryRemoveTokens("k1", 2) == false);
    assert(limiter.getTokensRemaining("k1") == 1);
    await new Promise(f => setTimeout(f, 200));
    assert(limiter.tryRemoveTokens("k1", 2) == true);
    assert(limiter.getTokensRemaining("k1") == 3);
}
