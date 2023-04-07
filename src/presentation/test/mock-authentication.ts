import { IAuthentication, AuthenticationParams } from '@/domain/usecases';
import { AccountModel } from '@/domain/model';
import { mockAccountModel } from '@/domain/test/mock-account';

export class AuthenticationSpy implements IAuthentication {
  account = mockAccountModel();
  params: AuthenticationParams;
  callsCount = 0;

  async auth(params:AuthenticationParams): Promise<AccountModel> {
    this.params = params;
    this.callsCount++;
    return Promise.resolve(this.account);
  }
}
