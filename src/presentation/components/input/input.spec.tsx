import faker from 'faker';
import { RenderResult, fireEvent, render } from '@testing-library/react';
import Context from '@/presentation/contexts/form/form-context';
import Input from './Input';

const makeSut = (fieldName:string): RenderResult => render(
  <Context.Provider value={{ state: {} }}>
    <Input name={fieldName} />
  </Context.Provider>,
);

describe('Input Component', () => {
  test('Should begin with readOnly', () => {
    const field = faker.database.column();
    const sut = makeSut(field);
    const input = sut.getByTestId(field) as HTMLInputElement;
    expect(input.readOnly).toBe(true);
  });

  test('Should remove readOnly on focus', () => {
    const field = faker.database.column();
    const sut = makeSut(field);
    const input = sut.getByTestId(field) as HTMLInputElement;
    fireEvent.focus(input);
    expect(input.readOnly).toBe(false);
  });

  test('Should focus input on label click', () => {
    const field = faker.database.column();
    const sut = makeSut(field);
    const input = sut.getByTestId(field);
    const label = sut.getByTestId(`${field}-label`);
    fireEvent.click(label);
    expect(document.activeElement).toBe(input);
  });
});
