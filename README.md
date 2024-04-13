# rate-limiter
Basic rate limiter using the token bucket algorithm

## usage
```typescript
import { makeRateLimiter } from "@lsdsoftware/rate-limiter"

const limiter = makeRateLimiter({tokensPerInterval: 5, interval: 60*1000})

function handleRequest(userId, req) {
  if (limiter.tryRemoveTokens(userId, 1)) return processRequest(req)
  else throw "Rate limit exceeded"
}
```
