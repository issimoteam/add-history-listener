# add-history-listener

This package provides a simple API to subscribe to browser history events.

```ts
const cleanup = addHistoryListener((prev, next) => {
  console.log(next);
});

history.replaceState(42, undefined, "/somewhere#over-the-rainbow");
// Prints { state: 42, pathname: "/somewhere", hash: "#over-the-rainbow", ...other useful things}
```
