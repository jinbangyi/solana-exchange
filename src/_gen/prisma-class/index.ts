import { ApiKeyAccount as _ApiKeyAccount } from "./api_key_account";
import { Exchange as _Exchange } from "./exchange";
import { Market as _Market } from "./market";
import { Token as _Token } from "./token";
import { User as _User } from "./user";

export namespace PrismaModel {
  export class User extends _User {}
  export class ApiKeyAccount extends _ApiKeyAccount {}
  export class Token extends _Token {}
  export class Exchange extends _Exchange {}
  export class Market extends _Market {}

  export const extraModels = [User, ApiKeyAccount, Token, Exchange, Market];
}
