import { RenderResult, render } from '@testing-library/react';
import { Helper } from '@/presentation/test';
import SignUp from './signup';

type SutTypes = {
  sut: RenderResult;
}

const makeSut = (): SutTypes => {
  const sut = render(
    <SignUp />,
  );
  return {
    sut,
  };
};

describe('Signup Component', () => {
  test('should start with initial state', () => {
    const validationError = 'Campo obrigatório';
    const { sut } = makeSut();
    Helper.testChildCount(sut, 'error-wrap', 0);
    Helper.testButtonIsDisabled(sut, 'submit', true);
    Helper.testStatusForFiled(sut, 'name', validationError);
    Helper.testStatusForFiled(sut, 'email', validationError);
    Helper.testStatusForFiled(sut, 'password', validationError);
    Helper.testStatusForFiled(sut, 'passwordConfirmation', validationError);
  });
});
