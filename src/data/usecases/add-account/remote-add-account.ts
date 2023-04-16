import { AccountModel } from '@/domain/model';
import { AddAccount, AddAccountParams } from '@/domain/usecases';
import { IHttpPostClient } from '@/data/protocols/http';

export class RemoteAddAccount implements AddAccount {
  constructor(
    private readonly url: string,
    private readonly httpPostClient: IHttpPostClient<AddAccountParams, AccountModel>,
  ) {}

  async add(params:AddAccountParams): Promise<AccountModel> {
    await this.httpPostClient.post({
      url: this.url,
      body: params,
    });
    return null;
  }
}
