This package provides a simple api to subscribe to browser history events.

# add-history-listener

[![size](https://img.shields.io/bundlephobia/minzip/@issimo/add-history-listener)](https://bundlephobia.com/result?p=@issimo/add-history-listener)
[![downloads](https://img.shields.io/npm/dw/@issimo/add-history-listener)](https://www.npmjs.com/package/@issimo/add-history-listener)
[![npm](https://img.shields.io/npm/v/@issimo/add-history-listener)](https://www.npmjs.com/package/@issimo/add-history-listener)
[![GitHub](https://img.shields.io/github/license/issimoteam/add-history-listener)](https://github.com/issimoteam/add-history-listener)

This package provides a simple API to subscribe to browser history events.

```ts
const cleanup = addHistoryListener((prev, next) => {
  console.log(next);
});

history.replaceState(42, undefined, "/somewhere#over-the-rainbow");
// Prints { state: 42, pathname: "/somewhere", hash: "#over-the-rainbow", ...other useful things}
```
