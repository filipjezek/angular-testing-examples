import { TitlePipe } from './title.pipe';

describe('TitlePipe', () => {
  // This pipe is a pure, stateless function so no need for BeforeEach
  let pipe = new TitlePipe();

  it('transforms "abc" to "Abc"', () => {
    expect(pipe.transform('abc')).toBe('Abc');
  });

  it('transforms "abc def" to "Abc Def"', () => {
    expect(pipe.transform('abc def')).toBe('Abc Def');
  });

  // ... more tests ...
});
