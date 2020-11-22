export { HistoryCallback, HistoryCleanup };
export default addHistoryListener;

/**
 * A function to be called after history has changed.
 */
type HistoryCallback = () => void;

/**
 * A function to clean up a subscription to the browser history.
 */
type HistoryCleanup = () => void;

const LISTENERS = new Set<HistoryCallback>();
const HISTORY_METHODS = ["go", "forward", "pushState", "replaceState"] as const;
for (const fnName of HISTORY_METHODS) {
  const symbol = Symbol(fnName);
  // @ts-expect-error
  history[symbol] = history[fnName];
  history[fnName] = (...args: unknown[]) => {
    // @ts-expect-error
    history[symbol](...args);
    handleHistoryChange();
  };
}

window.addEventListener("popstate", () => {
  handleHistoryChange();
});

/**
 * Subscribe to browser history changes
 * @param callback will be called when "history.go", "history.forward",
 *                 "history.pushState" or "history.replaceState" are called,
 *                 or when the "popstate" event is emitted
 * @returns a cleanup callback to unsubscribe
 */
function addHistoryListener(callback: HistoryCallback): HistoryCleanup {
  LISTENERS.add(callback);
  return () => {
    LISTENERS.delete(callback);
  };
}

function handleHistoryChange() {
  for (const cb of LISTENERS) cb();
}
