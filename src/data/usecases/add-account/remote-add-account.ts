import { AccountModel } from '@/domain/model';
import { AddAccount, AddAccountParams } from '@/domain/usecases';
import { HttpStatusCode, IHttpPostClient } from '@/data/protocols/http';
import { EmailInUseError, UnexpectedError } from '@/domain/errors';

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
      case HttpStatusCode.ok: return null;
      case HttpStatusCode.forbiden: throw new EmailInUseError();
      default: throw new UnexpectedError();
    }
  }
}
