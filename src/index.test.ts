import { RateLimiter } from "./index"
import * as assert from "assert"

runTest()
  .then(() => console.log("Test successful"))
  .catch(console.error)


async function runTest() {
  const limiter = new RateLimiter({
    tokensPerInterval: 5,
    interval: 2000
  })

  assert(limiter.getTokensRemaining("k1") == 5)
  assert(limiter.tryRemoveTokens("k1", 3) == true)
  assert(limiter.getTokensRemaining("k1") == 2)
  assert(limiter.tryRemoveTokens("k1", 4) == false)
  assert(limiter.tryRemoveTokens("k2", 4) == true)

  await new Promise(f => setTimeout(f, 1500))
  assert(limiter.tryRemoveTokens("k1", 4) == false)
  assert(limiter.getTokensRemaining("k1") == 2)

  await new Promise(f => setTimeout(f, 1000))
  assert(limiter.tryRemoveTokens("k1", 4) == true)
  assert(limiter.getTokensRemaining("k1") == 1)
}
