# Deprecated in favour of [issimoteam/add-history-listener](https://github.com/issimoteam/add-history-listener)

This package provides a simple api to subscribe to browser history events.

[![size](https://img.shields.io/bundlephobia/minzip/@sebastbake/add-history-listener)](https://bundlephobia.com/result?p=@sebastbake/add-history-listener)
[![downloads](https://img.shields.io/npm/dw/@sebastbake/add-history-listener)](https://www.npmjs.com/package/@sebastbake/add-history-listener)
[![npm](https://img.shields.io/npm/v/@sebastbake/add-history-listener)](https://www.npmjs.com/package/@sebastbake/add-history-listener)
[![GitHub](https://img.shields.io/github/license/sebastbake/add-history-listener)](https://github.com/SebastBake/add-history-listener)

# add-history-listener

This package provides a simple API to subscribe to browser history events.

```ts
const cleanup = addHistoryListener((prev, next) => {
  console.log(next);
});

history.replaceState(42, undefined, "/somewhere#over-the-rainbow");
// Prints { state: 42, pathname: "/somewhere", hash: "#over-the-rainbow", ...other useful things}
```
