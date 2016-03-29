const expect = require('expect');

const pathMirror = require('../src/index');

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

  xit('should mirror array keys', function () {
    const result = pathMirror({
      blue: {
        'foo': null,
        'bar': [
          'red',
          {
            orange: null
          },
          {
            purple: {
              foo: null
            }
          }
        ]
      },
      white: null
    });

    expect(result).toEqual({
      blue: {
        foo: 'blue_foo',
        bar: [
          'blue_bar_0',
          {
            orange: 'blue_bar_1_orange'
          },
          {
            purple: {
              foo: 'blue_bar_2_purple_foo'
            }
          }
        ]
      }
    });
  });

  it('should throw an error on non object', function () {
    expect(pathMirror).toThrow();
  });

  describe('separator', function () {
    it('should allow a separator as default option', function () {
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

    it('should allow custom seperator', function () {
      const result = pathMirror({
        blue: {
          'foo': null,
          'bar': null
        },
        white: null
      }, {
        separator: '.'
      });

      expect(result).toEqual({
        blue: {
          foo: 'blue.foo',
          bar: 'blue.bar'
        },
        white: 'white'
      });
    });

    it('should allow a customer seperator function', function () {
      const result = pathMirror({
        blue: {
          'foo': null,
          'bar': null
        },
        white: {
          'foo': null,
          'bar': null
        }
      }, {
        separator: (path) => path[0] === 'blue' ? ':' : '.'
      });

      expect(result).toEqual({
        blue: {
          foo: 'blue:foo',
          bar: 'blue:bar'
        },
        white: {
          foo: 'white.foo',
          bar: 'white.bar'
        }
      });
    });
  });

  describe('prefix', function () {
    it('should allow a string prefix', function () {
      const result = pathMirror({
        blue: {
          'foo': null,
          'bar': null
        },
        white: null
      }, {
        prefix: 'test/'
      });

      expect(result).toEqual({
        blue: {
          foo: 'test/blue_foo',
          bar: 'test/blue_bar'
        },
        white: 'test/white'
      });
    });

    it('should allow a prefix function', function () {
      const result = pathMirror({
        blue: {
          'foo': null,
          'bar': null
        },
        white: null
      }, {
        prefix: (path) => path[0] === 'blue' ? 'foo/' : 'bar/'
      });

      expect(result).toEqual({
        blue: {
          foo: 'foo/blue_foo',
          bar: 'foo/blue_bar'
        },
        white: 'bar/white'
      });
    });
  });

  describe('suffix', function () {
    it('should allow a string suffix', function () {
      const result = pathMirror({
        blue: {
          'foo': null,
          'bar': null
        },
        white: null
      }, {
        suffix: '/test'
      });

      expect(result).toEqual({
        blue: {
          foo: 'blue_foo/test',
          bar: 'blue_bar/test'
        },
        white: 'white/test'
      });
    });

    it('should allow a suffix function', function () {
      const result = pathMirror({
        blue: {
          'foo': null,
          'bar': null
        },
        white: null
      }, {
        suffix: (path) => path[0] === 'blue' ? '/1' : '/2'
      });

      expect(result).toEqual({
        blue: {
          foo: 'blue_foo/1',
          bar: 'blue_bar/1'
        },
        white: 'white/2'
      });
    });
  });

  describe('transform', function () {
    it('should allow the definition of a tranform function', function () {
      const result = pathMirror({
        blue: {
          'foo': null,
          'bar': null
        },
        white: null
      }, {
        transform: key => key.toUpperCase()
      });

      expect(result).toEqual({
        blue: {
          foo: 'BLUE_FOO',
          bar: 'BLUE_BAR'
        },
        white: 'WHITE'
      });
    });
  });
});
