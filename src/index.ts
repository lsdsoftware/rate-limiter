
class Bucket {
  constructor(public count: number, private expire: number) {
  }
  isValid() {
    return this.expire > Date.now()
  }
}

export class RateLimiter {
  private buckets: Map<unknown, Bucket>
  private lastCleanup: number

  constructor(private args: {tokensPerInterval: number, interval: number}) {
    this.buckets = new Map()
    this.lastCleanup = Date.now()
  }

  getTokensRemaining(key: unknown): number {
    const bucket = this.buckets.get(key)
    return bucket?.isValid() ? bucket.count : this.args.tokensPerInterval
  }

  tryRemoveTokens(key: unknown, numTokens: number): boolean {
    if (Date.now()-this.lastCleanup > 2*this.args.interval) {
      this.lastCleanup = Date.now()
      for (const [key, bucket] of this.buckets) if (!bucket.isValid()) this.buckets.delete(key)
    }

    let bucket = this.buckets.get(key)
    if (!bucket?.isValid()) {
      bucket = new Bucket(this.args.tokensPerInterval, Date.now()+this.args.interval)
      this.buckets.set(key, bucket)
    }

    if (numTokens <= bucket.count) {
      bucket.count -= numTokens
      return true
    }
    else {
      return false
    }
  }
}
