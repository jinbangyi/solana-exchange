import { IsInt, IsString, Max, Min, ValidateIf } from "class-validator";

export enum Blockchain {
  TON = "TON",
}

export class CreateKeyPairReq {
  // support: ["TON"]
  blockchain: Blockchain;

  // 1 <= amount < 6
  // limit amount 6 to prevent kms limit
  @IsInt()
  @Min(1)
  @Max(6)
  amount: number;

  // WARNING! if password lose, the private key also lose
  @IsString()
  password: string;

  // the generated address will be bind to this, only the transaction signed by this address can be sign
  // if the bindAddress not exists will sign directly else require the signature of the bindAddress
  authPublicKeyHash?: string;

  // @deprecated, same as authPublicKeyHash, if authPublicKeyHash exists, this will be ignored
  bindAddress?: string;
}

export class CreateKeyPairResp {
  // the public key to create the address
  publicKeyHash: string;
  // ton wallet address
  address: string;
  // the address version
  version: string;
}

export class BindingKeyPairInfo {
  // the hash key to auth signing transaction
  authPublishHashKey: string;

  bindingKeyPairs: ({
    // password encrypted
    mnemonic: string;
    // iv for decrypt mnemonic
    iv: string;
  } & CreateKeyPairResp)[];

  // @deprecated, use authPublishHashKey  instead
  address: string;

  // @deprecated, use bindingKeyPairs  instead
  bindingAddresses: ({
    // password encrypted
    mnemonic: string;
    // iv for decrypt mnemonic
    iv: string;
  } & CreateKeyPairResp)[];

  // the aws kms key to encrypt and decrypt this object
  kmsKeyId: string;
}

export class PublicKeyMapping {
  uuid: string;
  authPublishHashKey: string;

  // @deprecated, use authPublishHashKey  instead
  bindingAddress?: string;
}

/**
 * {
    # transaction data in hex format
    "data": "xx",
    # user's password to decode the encrypted sensitive data
    "password": "",
    # bindAddressSignature in hex format
    "signature": ""
}
 */

export class SignReq {
  @IsString()
  data: string;

  @IsString()
  password: string;

  @ValidateIf(() => false)
  signature: string;
}

/**
 * {
    # signature data in hex format
    "signature": "xx"
}
 */

export class SignResp {
  @IsString()
  signature: string;
}
