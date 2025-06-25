// jest-domのimportはそのままでOK
import "@testing-library/jest-dom";

// TextEncoder polyfill
import { TextEncoder, TextDecoder } from "util";

import "whatwg-fetch";

global.TextEncoder = TextEncoder as any;
global.TextDecoder = TextDecoder as any;

// setupTests.ts
global.BroadcastChannel = class {
  constructor() {}
  postMessage() {}
  close() {}
  onmessage = () => {};
};
