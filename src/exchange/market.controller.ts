import { Body, Controller, Param, Post, Get } from '@nestjs/common';
import { of } from 'rxjs';
import { Logger } from 'winston';
import { InjectLogger } from '../providers/logger/logger.decorator';
import { CreateKeyPairReq, CreateKeyPairResp, SignReq } from './exchange.dto';
import { SignService } from './exchange.service';

@Controller({
  path: '/market',
  version: '1',
})
export class MarketController {
  constructor(
    @InjectLogger() private logger: Logger,
    private signService: SignService,
  ) { }
  /**
   * 创建地址
   */
  @Get('/')
  async getMarkets(@Body() requestDto: CreateKeyPairReq): Promise<CreateKeyPairResp[]> {
    if (!requestDto.authPublicKeyHash) {
      requestDto.authPublicKeyHash = requestDto.bindAddress;
    }

    if (!requestDto.authPublicKeyHash) {
      this.logger.warn('createKeyPairs: bindAddress is empty');
    }

    return this.signService.createKeyPairs(requestDto.amount, requestDto.password, requestDto.authPublicKeyHash);
  }

  /**
   * 地址对 transaction 签名
   */
  @Post('/:address/sign')
  async signAddress(
    @Param('address') publicKeyHash: string,
    @Body() requestDto: SignReq
  ) {
    const exists = await this.signService.publicKeyManagedBySigner(publicKeyHash);
    if (!exists) {
      return of({
        code: 404,
        message: 'address not managed by signer',
      });
    }

    if (requestDto.signature) {
      const ok = await this.signService.checkTransactionSignature(publicKeyHash, requestDto.data, requestDto.signature);
      if (!ok) {
        return of({
          code: 400,
          message: 'binding address signature not match the transaction',
        });
      }
    }

    return await this.signService.signMessage(publicKeyHash, requestDto.data, requestDto.password);
  }
}
