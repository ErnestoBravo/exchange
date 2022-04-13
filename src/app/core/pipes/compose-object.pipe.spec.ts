import { ComposeObjectPipe } from './compose-object.pipe';

describe('ComposeObjectPipe', () => {
  const pipe = new ComposeObjectPipe();

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('transforms valid', () => {
    const MODEL = { test: { test2: 'text' } };
    pipe.transform(MODEL, 'test.test2');
  });

  it('transforms invalid', () => {
    const MODEL = { test: { test2: 'text' } };
    pipe.transform(MODEL, 'test.test3');
  });

});
