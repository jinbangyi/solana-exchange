export class Trade {
  "signature": string;
  "mint": string;
  "traderPublicKey": string;
  "txType": "buy" | "sell";
  "bondingCurveKey": string;
  "vTokensInBondingCurve": number;
  "vSolInBondingCurve": number;
  "marketCapSol": number;
  "timestamp": number;
  "pool": "pump";
  "tokenAmount": number;
  "newTokenBalance": number;
  "solAmount": number;
}
