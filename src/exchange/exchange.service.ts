import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Logger } from 'winston';
import { InjectLogger } from '../providers/logger/logger.decorator';

@Injectable()
export class ExchangeService {

  constructor(
    @InjectLogger() private logger: Logger,
    configService: ConfigService,
  ) {

  }

  // --------------- start publicKeyHash mapping ---------------

  // --------------- end publicKeyHash mapping ---------------

  // 通过 address 逆向查找私钥等信息
  getpublicKeyMappingKey(publicKeyHash: string) {
    return `blockchain-signer/address-mapping/${publicKeyHash}`;
  }

  // 获取存放地址信息的 key
  getKeyPairInfoKey(uuid: string, authPublicKeyHash?: string) {
    // 由于使用 authPublicKeyHash 分组有可能触发 kms key 限制，所以暂时不使用 authPublicKeyHash 分组
    // 同时，使用 authPublicKeyHash 还需要解决并发问题
    // if (authPublicKeyHash) {
    //   return `blockchain-signer/binding-address-info/${authPublicKeyHash}`;
    // }

    return `blockchain-signer/uuid-info/${uuid}`;
  }
}
