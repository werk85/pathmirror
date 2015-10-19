# pathmirror

Advanced key mirror function that can mirror nested object keys. Intended for the generation of flux action names.

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

console.log(foo.bar.baz); // foo.bar.baz
```

## Use Case

This module is intended for generating hierachical action names when working with flux:

```js
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
}
```
