import { AccountModel } from '@/domain/model';
import { AddAccount, AddAccountParams } from '@/domain/usecases';
import { HttpStatusCode, IHttpPostClient } from '@/data/protocols/http';
import { EmailInUseError } from '@/domain/errors';

export class RemoteAddAccount implements AddAccount {
  constructor(
    private readonly url: string,
    private readonly httpPostClient: IHttpPostClient<AddAccountParams, AccountModel>,
  ) {}

  async add(params:AddAccountParams): Promise<AccountModel> {
    const httpResponse = await this.httpPostClient.post({
      url: this.url,
      body: params,
    });
    switch (httpResponse.statusCode) {
      case HttpStatusCode.forbiden: throw new EmailInUseError();
      default: return null;
    }
  }
}
