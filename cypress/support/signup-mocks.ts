import faker from 'faker';
import * as Helper from './http-mocks';

export const mockEmailInUseError = ():void => Helper.mockEmailInUseError(/signup/);
export const mockUnexpectedError = ():void => Helper.mockUnexpectedError(/signup/, 'POST');
export const mockInvalidData = ():void => Helper.mockOk(/signup/, 'POST', { invalid: faker.random.uuid() });
export const mockOK = ():void => Helper.mockOk(/signup/, 'POST', { accessToken: faker.random.uuid() });
