# React-sexperiments
My first steps with fully isomorphic SPA app in React.

It failed in many ways :)
- [flux](https://github.com/facebook/flux) from facebook does not work in node environment well, cuz stores have state
- Gulp and browserify cannot be used to write ES6, use [webpack](https://github.com/webpack/webpack) instead
- do not try to write this again, you should rather study [Este todomvc](https://github.com/steida/este-todomvc), 
which is one of the best stacks flux + react + immutable + webpack + isomorphism 
- try to wire database integration to flux + react apps, that seems to be bigger challenge now

Install:
```
$ npm install
```

Develop / build:
```
$ gulp
```

Run:
```
$ npm start
```

Absolutely not ready for production. Just for inspirational purposes.
