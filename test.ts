import { equal, test } from "zora";

global.location = {
  hash: "",
  pathname: "",
  search: "",
} as any;

global.history = {
  state: undefined,
  go(data: any) {
    global.location.pathname = data;
    global.location.hash = data;
    global.location.search = data;
    this.state = data;
  },
  back() {
    global.location.pathname = "back";
    global.location.hash = "back";
    global.location.search = "back";
    this.state = "back";
  },
  forward() {
    global.location.pathname = "forward";
    global.location.hash = "forward";
    global.location.search = "forward";
    this.state = "forward";
  },
  pushState(data: any, _: string, path: string) {
    global.location.pathname = path;
    global.location.hash = path;
    global.location.search = path;
    this.state = data;
  },
  replaceState(data: any, _: string, path: string) {
    global.location.pathname = path;
    global.location.hash = path;
    global.location.search = path;
    this.state = data;
  },
} as any;

import addHistoryListener from "./index";

test("history.back", () => {
  let prev: any = {},
    next: any = {};

  history.pushState("muad", "", "dib");

  addHistoryListener((...args) => {
    prev = args[0];
    next = args[1];
  });

  history.back();

  equal(prev.hash, "dib");
  equal(prev.pathname, "dib");
  equal(prev.search, "dib");
  equal(prev.state, "muad");
  equal(next.hash, "back");
  equal(next.pathname, "back");
  equal(next.search, "back");
  equal(next.state, "back");
});

test("history.forward", () => {
  let prev: any = {},
    next: any = {};

  history.pushState("muad", "", "dib");

  addHistoryListener((...args) => {
    prev = args[0];
    next = args[1];
  });

  history.forward();

  equal(prev.hash, "dib");
  equal(prev.pathname, "dib");
  equal(prev.search, "dib");
  equal(prev.state, "muad");
  equal(next.hash, "forward");
  equal(next.pathname, "forward");
  equal(next.search, "forward");
  equal(next.state, "forward");
});

test("history.go", () => {
  let prev: any = {},
    next: any = {};

  history.pushState("muad", "", "dib");

  addHistoryListener((...args) => {
    prev = args[0];
    next = args[1];
  });

  history.go(100);

  equal(prev.hash, "dib");
  equal(prev.pathname, "dib");
  equal(prev.search, "dib");
  equal(prev.state, "muad");
  equal(next.hash, 100);
  equal(next.pathname, 100);
  equal(next.search, 100);
  equal(next.state, 100);
});

test("history.pushState", () => {
  let prev: any = {},
    next: any = {};

  history.pushState("muad", "", "dib");

  addHistoryListener((...args) => {
    prev = args[0];
    next = args[1];
  });

  history.pushState("paul", "", "atreides");

  equal(prev.hash, "dib");
  equal(prev.pathname, "dib");
  equal(prev.search, "dib");
  equal(prev.state, "muad");
  equal(next.hash, "atreides");
  equal(next.pathname, "atreides");
  equal(next.search, "atreides");
  equal(next.state, "paul");
});

test("history.replaceState", () => {
  let prev: any = {},
    next: any = {};

  history.pushState("muad", "", "dib");

  addHistoryListener((...args) => {
    prev = args[0];
    next = args[1];
  });

  history.replaceState("paul", "", "atreides");

  equal(prev.hash, "dib");
  equal(prev.pathname, "dib");
  equal(prev.search, "dib");
  equal(prev.state, "muad");
  equal(next.hash, "atreides");
  equal(next.pathname, "atreides");
  equal(next.search, "atreides");
  equal(next.state, "paul");
});

test("cleanup", () => {
  let prev: any = 42,
    next: any = 42;

  const cleanup = addHistoryListener((...args) => {
    prev = args[0];
    next = args[1];
  });

  cleanup();

  history.go(100);
  equal(next, 42);
  equal(prev, 42);

  history.back();
  equal(next, 42);
  equal(prev, 42);

  history.forward();
  equal(next, 42);
  equal(prev, 42);

  history.replaceState("paul", "", "atreides");
  equal(next, 42);
  equal(prev, 42);

  history.pushState("paul", "", "atreides");
  equal(next, 42);
  equal(prev, 42);
});
