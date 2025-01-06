export type Int = number | undefined;
type int = number;
export type Str = string | undefined;
type Strings = string[] | undefined;
export type Num = number | undefined;
export type Bool = boolean | undefined;
// must be an integer in other langs
type IndexType = number | string;
type OrderSide = "buy" | "sell" | string;
type OrderType = "limit" | "market" | string;
interface Dictionary<T> {
  [key: string]: T;
}
export type MarketType =
  | "spot"
  | "margin"
  | "swap"
  | "future"
  | "option"
  | "delivery"
  | "index";
type SubType = "linear" | "inverse" | undefined;

interface MinMax {
  min: Num;
  max: Num;
}

interface MarketMarginModes {
  isolated: boolean;
  cross: boolean;
}

// https://github.com/ccxt/ccxt/wiki/manual#network-structure
/**
 * {
    'id':       'tron',         // string literal for referencing within an exchange
    'network':  'TRC20'         // unified network
    'name':     'Tron Network', // string, human-readable name, if specified
    'active':    true,          // boolean, currency status (tradeable and withdrawable)
    'fee':       0.123,         // withdrawal fee, flat
    'precision': 8,             // number of decimal digits "after the dot" (depends on exchange.precisionMode)
    'deposit':   true           // boolean, deposits are available
    'withdraw':  true           // boolean, withdraws are available
    'limits': {                 // value limits when placing orders on this market
        'amount': {
            'min': 0.01,        // order amount should be > min
            'max': 1000,        // order amount should be < max
        },
        'withdraw': { ... },    // withdrawal limits
        'deposit': {...},       // deposit limits
    },
    'info': { ... },            // the original unparsed currency info from the exchange
}
 */

export interface NetworkInterface {
  id: string;
  network: string;
  name: string;
  active: boolean;
  fee: number;
  precision: number;
  deposit: boolean;
  withdraw: boolean;
  limits: {
    amount: {
      min: number;
      max: number;
    };
    withdraw: {
      min: number;
      max: number;
    };
    deposit: {
      min: number;
      max: number;
    };
  };
}

// https://github.com/ccxt/ccxt/wiki/manual#currency-structure
/**
 * {
    'id':       'btc',       // string literal for referencing within an exchange
    'code':     'BTC',       // uppercase unified string literal code the currency
    'name':     'Bitcoin',   // string, human-readable name, if specified
    'active':    true,       // boolean, currency status (tradeable and withdrawable)
    'fee':       0.123,      // withdrawal fee, flat
    'precision': 8,          // number of decimal digits "after the dot" (depends on exchange.precisionMode)
    'deposit':   true        // boolean, deposits are available
    'withdraw':  true        // boolean, withdraws are available
    'limits': {              // value limits when placing orders on this market
        'amount': {
            'min': 0.01,     // order amount should be > min
            'max': 1000,     // order amount should be < max
        },
        'withdraw': { ... }, // withdrawal limits
        'deposit': {...},
    },
    'networks': {...}        // network structures indexed by unified network identifiers (ERC20, TRC20, BSC, etc)
    'info': { ... },         // the original unparsed currency info from the exchange
}
 */
export interface CurrencyInterface {
  id: string;
  code: string;
  numericId?: Int;
  precision: number;
  type?: Str;
  margin?: Bool;
  name?: Str;
  active?: Bool;
  deposit?: Bool;
  withdraw?: Bool;
  fee?: Num;
  limits: {
    // order amount should be
    amount: {
      min?: Num;
      max?: Num;
    };
    // withdrawal limits
    withdraw: {
      min?: Num;
      max?: Num;
    };
  };
  networks: Record<string, NetworkInterface>;
}

// https://github.com/ccxt/ccxt/wiki/manual#market-structure
/**
 * {
    'id':      'btcusd',      // string literal for referencing within an exchange
    'symbol':  'BTC/USD',     // uppercase string literal of a pair of currencies
    'base':    'BTC',         // uppercase string, unified base currency code, 3 or more letters
    'quote':   'USD',         // uppercase string, unified quote currency code, 3 or more letters
    'baseId':  'btc',         // any string, exchange-specific base currency id
    'quoteId': 'usd',         // any string, exchange-specific quote currency id
    'active':   true,         // boolean, market status
    'type':    'spot',        // spot for spot, future for expiry futures, swap for perpetual swaps, 'option' for options
    'spot':     true,         // whether the market is a spot market
    'margin':   true,         // whether the market is a margin market
    'future':   false,        // whether the market is a expiring future
    'swap':     false,        // whether the market is a perpetual swap
    'option':   false,        // whether the market is an option contract
    'contract': false,        // whether the market is a future, a perpetual swap, or an option
    'settle':   'USDT',       // the unified currency code that the contract will settle in, only set if `contract` is true
    'settleId': 'usdt',       // the currencyId of that the contract will settle in, only set if `contract` is true
    'contractSize': 1,        // the size of one contract, only used if `contract` is true
    'linear':   true,         // the contract is a linear contract (settled in quote currency)
    'inverse':  false,        // the contract is an inverse contract (settled in base currency)
    'expiry':  1641370465121, // the unix expiry timestamp in milliseconds, undefined for everything except market['type'] `future`
    'expiryDatetime': '2022-03-26T00:00:00.000Z', // The datetime contract will in iso8601 format
    'strike': 4000,           // price at which a put or call option can be exercised
    'optionType': 'call',     // call or put string, call option represents an option with the right to buy and put an option with the right to sell
    // note, 'taker' and 'maker' compose extended data for markets, however it might be better to use `fetchTradingFees` for more accuracy
    'taker':    0.002,        // taker fee rate, 0.002 = 0.2%
    'maker':    0.0016,       // maker fee rate, 0.0016 = 0.16%
    'percentage': true,       // whether the taker and maker fee rate is a multiplier or a fixed flat amount
    'tierBased': false,       // whether the fee depends on your trading tier (your trading volume)
    'feeSide': 'get',         // string literal can be 'get', 'give', 'base', 'quote', 'other'
    'precision': {            // number of decimal digits "after the dot"
        'price': 8,           // integer or float for TICK_SIZE roundingMode, might be missing if not supplied by the exchange
        'amount': 8,          // integer, might be missing if not supplied by the exchange
        'cost': 8,            // integer, very few exchanges actually have it
    },
    'limits': {               // value limits when placing orders on this market
        'amount': {
            'min': 0.01,      // order amount should be > min
            'max': 1000,      // order amount should be < max
        },
        'price': { ... },     // same min/max limits for the price of the order
        'cost':  { ... },     // same limits for order cost = price * amount
        'leverage': { ... },  // same min/max limits for the leverage of the order
    },
    'marginModes': {
        'cross': false,       // whether pair supports cross-margin trading
        'isolated': false,    // whether pair supports isolated-margin trading
    },
    'info':      { ... },     // the original unparsed market info from the exchange
}
 */
export interface MarketInterface {
  id: Str;
  numericId?: Num;
  uppercaseId?: Str;
  lowercaseId?: Str;
  symbol: string;
  base: Str;
  quote: Str;
  baseId: Str;
  quoteId: Str;
  active: Bool;
  type: MarketType;
  subType?: SubType;
  spot: boolean;
  margin: boolean;
  swap: boolean;
  future: boolean;
  option: boolean;
  contract: boolean;
  settle: Str;
  settleId: Str;
  contractSize: Num;
  linear: Bool;
  inverse: Bool;
  quanto?: boolean;
  expiry: Int;
  expiryDatetime: Str;
  strike: Num;
  optionType: Str;
  taker?: Num;
  maker?: Num;
  percentage?: Bool;
  tierBased?: Bool;
  feeSide?: Str;
  precision: {
    amount: Num;
    price: Num;
    cost?: Num;
  };
  marginModes?: MarketMarginModes;
  limits: {
    amount?: MinMax;
    cost?: MinMax;
    leverage?: MinMax;
    price?: MinMax;
    market?: MinMax;
  };
  created: Int;
}

// https://github.com/ccxt/ccxt/wiki/manual#balance-structure
/**
 * {
    'info':  { ... },    // the original untouched non-parsed reply with details
    'timestamp': 1499280391811, // Unix Timestamp in milliseconds (seconds * 1000)
    'datetime': '2017-07-05T18:47:14.692Z', // ISO8601 datetime string with milliseconds

    //-------------------------------------------------------------------------
    // indexed by availability of funds first, then by currency

    'free':  {           // money, available for trading, by currency
        'BTC': 321.00,   // floats...
        'USD': 123.00,
        ...
    },

    'used':  { ... },    // money on hold, locked, frozen, or pending, by currency

    'total': { ... },    // total (free + used), by currency

    'debt': { ... },     // debt, by currency

    //-------------------------------------------------------------------------
    // indexed by currency first, then by availability of funds

    'BTC':   {           // string, three-letter currency code, uppercase
        'free': 321.00   // float, money available for trading
        'used': 234.00,  // float, money on hold, locked, frozen or pending
        'total': 555.00, // float, total balance (free + used)
    },

    'USD':   {           // ...
        'free': 123.00   // ...
        'used': 456.00,
        'total': 579.00,
    },

    ...
}
 */
interface Balance {
  free: Num;
  used: Num;
  total: Num;
  debt?: Num;
}

export interface Balances extends Dictionary<Balance> {
  info: any;
  timestamp?: any; // we need to fix this later
  datetime?: any;
}

export interface BalanceAccount {
  free: Str;
  used: Str;
  total: Str;
}

export interface Account {
  id: Str;
  type: Str;
  code: Str;
  info: any;
}

export interface PartialBalances extends Dictionary<number> {}

export type OHLCV = [Num, Num, Num, Num, Num, Num];

