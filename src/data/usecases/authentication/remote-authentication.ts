import { AuthenticationParams } from '@/domain/usecases/authentication';
import { IHttpPostClient } from '@/data/protocols/http/http-post-client';
import { HttpStatusCode } from '@/data/protocols/http/http-response';
import { InvalidCredentialsError } from '@/domain/model/errors/invalid-credentials-error';
import { UnexpectedError } from '@/domain/model/errors/unexpected-error';
import { AccountModel } from '@/domain/model/account-model';

export class RemoteAuthentication {
  constructor(
    private readonly url: string,
    private readonly httpPostClient: IHttpPostClient<AuthenticationParams, AccountModel>,
  ) {}

  async auth(params: AuthenticationParams): Promise<void> {
    const httpResponse = await this.httpPostClient.post({
      url: this.url,
      body: params,
    });
    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok: break;
      case HttpStatusCode.unathorized: throw new InvalidCredentialsError();
      default: throw new UnexpectedError();
    }
  }
}
