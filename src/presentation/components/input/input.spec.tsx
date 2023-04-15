import { RenderResult, render } from '@testing-library/react';
import Context from '@/presentation/contexts/form/form-context';
import Input from './Input';

const makeSut = (): RenderResult => render(
  <Context.Provider value={{ state: {} }}>
    <Input name="field" />
  </Context.Provider>,
);

describe('Input Component', () => {
  test('Should begin with readOnly', () => {
    const sut = makeSut();
    const input = sut.getByTestId('field') as HTMLInputElement;
    expect(input.readOnly).toBe(true);
  });
});
