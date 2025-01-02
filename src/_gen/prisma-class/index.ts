import { User as _User } from "./user";
import { ApiKeyAccount as _ApiKeyAccount } from "./api_key_account";
import { Token as _Token } from "./token";
import { Exchange as _Exchange } from "./exchange";
import { Market as _Market } from "./market";

export namespace PrismaModel {
  export class User extends _User {}
  export class ApiKeyAccount extends _ApiKeyAccount {}
  export class Token extends _Token {}
  export class Exchange extends _Exchange {}
  export class Market extends _Market {}

  export const extraModels = [User, ApiKeyAccount, Token, Exchange, Market];
}
