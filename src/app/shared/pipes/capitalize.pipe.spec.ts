import { CapitalizePipe } from './capitalize.pipe';

describe('CapitalizePipe', () => {
  let pipe: CapitalizePipe;

  beforeEach(() => {
    pipe = new CapitalizePipe();
  });

  it('should capitalize the first letter and lowercase the rest of the string', () => {
    expect(pipe.transform('hello')).toBe('Hello');

    expect(pipe.transform('HeLLo')).toBe('Hello');

    expect(pipe.transform('')).toBe('');

    expect(pipe.transform('h')).toBe('H');

    expect(pipe.transform('Hello')).toBe('Hello');
  });
});
