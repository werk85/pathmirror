# pathmirror

Advanced key mirror function that can mirror nested object keys. Intended for the generation of flux action type names.

## Installation

```
npm install pathmirror --save
```

## Usage

```js
import pathMirror from 'pathmirror';

const mirrored = pathMirror({
    foo: {
        bar: {
            baz: null
        }
    }
});

console.log(foo.bar.baz); // foo_bar_baz
```

You can change the default delimiter via the second parameter.

```js
import pathMirror from 'pathmirror';

const mirrored = pathMirror({
    foo: {
        bar: {
            baz: null
        }
    }
}, '.');

console.log(mirrored.foo.bar.baz); // foo.bar.baz
```

### Advanced Options

There are several hooks to manipulate the produced output.

For example can you add a prefix or suffix to your created paths, change the separator or transform the path before creating the `mirrored` object.

```js
import pathMirror from 'pathmirror';

const mirrored = pathMirror({
    foo: {
        bar: {
            baz: null
        }
    }
}, {
    separator: '_',
    prefix: 'prefix/',
    suffix: '/suffix',
    transform: (key, value, path) => key.toUpperCase()
});

console.log(mirrored.foo.bar.baz); // prefix/FOO_BAR_BAZ/suffix
```

For more advanced scenarios each string option can be a function which is called with the resulting path.

```js
import pathMirror from 'pathmirror';

const mirrored = pathMirror({
    foo: {
        bar: null
    },
    baz: {
        foobar: null
    }
}, {
    separator: (path) => path[0] === 'foo' ? ':' : '.',
    prefix: (path) => path[0] === 'foo' ? '1/' : '2/',
    suffix: (path) => path[1] === 'foobar' ? '/1' : '/2',
});

console.log(mirrored.foo.bar); // 1/foo:bar/2
console.log(mirrored.baz.foobar); // 2/baz.foobar/1
```

## Use Case

This module is intended for generating hierachical action names when working with flux:

```js
import pathMirror from 'pathmirror';

const actions = pathMirror({
    APP: {
        INIT: null
    },
    POSTS: {
        REQUEST: null,
        FETCHED: null,
        ERROR: null
    }
});

console.log(actions);
/*
{
    APP: {
        INIT: 'APP_INIT'
    },
    POSTS: {
        REQUEST: 'POSTS_REQUEST',
        FETECHED: 'POSTS_FETECHED',
        ERROR: 'POSTS_ERROR'
    }
}
 */
```
