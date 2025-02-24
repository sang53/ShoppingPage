import { expect, beforeEach, vi, afterAll } from "vitest";
import * as matchers from "@testing-library/jest-dom/matchers";
import userEvent from "@testing-library/user-event";

expect.extend(matchers);

beforeEach(() => {
  const user = userEvent.setup();
  vi.stubGlobal("user", user);

  return () => {
    vi.restoreAllMocks();
  };
});

afterAll(() => {
  vi.unstubAllGlobals();
  vi.resetModules();
});
