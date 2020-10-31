export { HistoryItem, HistoryCallback, HistoryCleanup };
export default addHistoryListener;

/**
 * Represents the state of the browser history.
 */
type HistoryItem<STATE = any> = {
  readonly state: STATE;
  readonly hash: string;
  readonly pathname: string;
  readonly search: string;
};

/**
 * A function to be called after history has changed.
 */
type HistoryCallback<STATE = any> = (prev: HistoryItem<STATE>, next: HistoryItem<STATE>) => void;

/**
 * A function to clean up a subscription to the browser history.
 */
type HistoryCleanup = () => void;

const LISTENERS = new Set<HistoryCallback>();
const HISTORY_METHODS = ["go", "back", "forward", "pushState", "replaceState"] as const;
for (const fnName of HISTORY_METHODS) {
  const symbol = Symbol(fnName);
  // @ts-expect-error
  history[symbol] = history[fnName];
  history[fnName] = (...args: unknown[]) => {
    const prevHistoryItem = makeHistoryItem();
    // @ts-expect-error
    history[symbol](...args);
    handleHistoryChange(prevHistoryItem);
  };
}

/**
 * Subscribe to browser history changes
 * @param callback will be called when "history.go", "history.back", "history.forward",
 *                 "history.pushState" or "history.replaceState" are called
 * @returns a cleanup callback to unsubscribe
 */
function addHistoryListener<STATE = any>(callback: HistoryCallback<STATE>): HistoryCleanup {
  LISTENERS.add(callback);
  return () => {
    LISTENERS.delete(callback);
  };
}

function handleHistoryChange(prev: HistoryItem) {
  const currentHistoy = makeHistoryItem();
  for (const cb of LISTENERS) cb(prev, currentHistoy);
}

function makeHistoryItem(): HistoryItem {
  return Object.freeze({
    state: history.state,
    hash: location.hash,
    pathname: location.pathname,
    search: location.search,
  });
}
