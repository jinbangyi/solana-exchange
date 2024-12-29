# Solana Exchage

## TODO

<https://github.com/ccxt/ccxt/wiki/Requirements>

- fetchMarkets
- fetchCurrencies
- fetchTradingLimits
- fetchTradingFees
- fetchTicker
- fetchOrderBook
- fetchTrades
- fetchOHLCV
- fetchBalance
- createOrder
- cancelOrder
- editOrder
- fetchAccounts
- fetchOrder
- fetchOpenOrders
- fetchOrders
- fetchMyTrades

- fetchFundingLimits

## Quick Start

```typescript
import { SolanaAgentKit, createSolanaTools } from "solana-agent-kit";

// Initialize with private key and optional RPC URL
const agent = new SolanaAgentKit(
  "your-wallet-private-key-as-base58",
);

// Create LangChain tools
const tools = createSolanaTools(agent);
```

## Usage Examples

### Deploy a New Token

```typescript
const result = await agent.deployToken(
  "my ai token", // name
  "uri", // uri
  "token", // symbol
  9, // decimals
  1000000 // initial supply
);

console.log("Token Mint Address:", result.mint.toString());
```

### Swap Tokens

```typescript
import { PublicKey } from "@solana/web3.js";

const signature = await agent.trade(
  new PublicKey("target-token-mint"),
  100, // amount
  new PublicKey("source-token-mint"),
  300 // 3% slippage
);
```

### Fetch Price Data from Pyth

```typescript

const price = await agent.pythFetchPrice(
  "0xe62df6c8b4a85fe1a67db44dc12de5db330f7ac66b72dc658afedf0f4a415b43"
);

console.log("Price in BTC/USD:", price);
```

## Dependencies

The toolkit relies on several key Solana and Metaplex libraries:

- @solana/web3.js
- @solana/spl-token
- @metaplex-foundation/mpl-token-metadata
- @metaplex-foundation/mpl-core
- @metaplex-foundation/umi
- @lightprotocol/compressed-token
- @lightprotocol/stateless.js
- @pythnetwork/price-service-client

## License

Apache-2 License
