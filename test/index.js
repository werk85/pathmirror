import expect from 'expect';

import pathMirror from '../src/index';

describe('pathMirror', function () {
  it('should mirror a flat object', function () {
    const result = pathMirror({
      blue: null,
      white: null
    });

    expect(result).toEqual({
      blue: 'blue',
      white: 'white'
    });
  });

  it('should mirror a two deep hierachy', function () {
    const result = pathMirror({
      blue: {
        'foo': null,
        'bar': null
      },
      white: null
    });

    expect(result).toEqual({
      blue: {
        foo: 'blue_foo',
        bar: 'blue_bar'
      },
      white: 'white'
    });
  });

  it('should use custom separator', function () {
    const result = pathMirror({
      blue: {
        'foo': null,
        'bar': null
      },
      white: null
    }, '.');

    expect(result).toEqual({
      blue: {
        foo: 'blue.foo',
        bar: 'blue.bar'
      },
      white: 'white'
    });
  });

  it('should throw an error on non object', function () {
    expect(pathMirror).toThrow();
  });
});
