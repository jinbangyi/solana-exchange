import { SetMetadata } from "@nestjs/common";
import { PublicKey } from "@solana/web3.js";

/**
 * Common token addresses used across the toolkit
 */
export const TOKENS = {
  USDC: new PublicKey("EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"),
  USDT: new PublicKey("Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB"),
  USDS: new PublicKey("USDSwr9ApdHk5bvJKMjzff41FfuX8bSxdKcR81vTwcA"),
  SOL: new PublicKey("So11111111111111111111111111111111111111112"),
  jitoSOL: new PublicKey("J1toso1uCk3RLmjorhTtrVwY9HJ7X8V9yYac6Y7kGCPn"),
  bSOL: new PublicKey("bSo13r4TkiE4KumL71LsHTPpL2euBYLFx6h9HP3piy1"),
  mSOL: new PublicKey("mSoLzYCxHdYgdzU16g5QSh3i5K3z3KZK7ytfqcJm7So"),
  BONK: new PublicKey("DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263"),
} as const;

/**
 * Default configuration options
 * @property {number} SLIPPAGE_BPS - Default slippage tolerance in basis points (300 = 3%)
 * @property {number} TOKEN_DECIMALS - Default number of decimals for new tokens
 */
export const DEFAULT_OPTIONS = {
  SLIPPAGE_BPS: 300,
  TOKEN_DECIMALS: 9,
} as const;

/**
 * Jupiter API URL
 */
export const JUP_API = "https://quote-api.jup.ag/v6";
export const JUP_PRICE_ENDPOINT = "https://api.jup.ag/price/v2";
export const JUP_TOKEN_ENDPOINT = "https://tokens.jup.ag/tokens";

export const CREATE_GIBWORK_TASK_ENPOINT =
  "https://api2.gib.work/tasks/public/transaction";

export const DEXSCREENER_SEARCH_ENDPOINT =
  "https://api.dexscreener.com/latest/dex/search";

export const CREATE_PUMPFUN_TRANSACTION_ENDPOINT =
  "https://pumpportal.fun/api/trade-local";
export const UPLOAD_PUMPFUN_METADATA_ENDPOINT = "https://pump.fun/api/ipfs";

export const LULO_LEND_ENDPOINT = "https://blink.lulo.fi/actions";

export const PYTH_HERMES_ENDPOINT = "https://hermes.pyth.network";

export const SOLANA_RPC_ENDPOINT = "https://api.mainnet-beta.solana.com";

export const RUN_ENV = process.env.RUN_ENV || "dev";

export const IS_PUBLIC_KEY = "isPublic";
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
