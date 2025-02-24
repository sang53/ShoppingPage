import PropTypes from "prop-types";
import { use } from "react";
import { useLocation } from "react-router";
import { vi } from "vitest";

// for use in components that call global fetch function
export function mockFetch({ success = true, value = [] } = {}) {
  const fetchMock = vi.fn(() => {
    return Promise.resolve({
      ok: success,
      json: () => Promise.resolve(value),
    });
  });
  vi.stubGlobal("fetch", fetchMock);
}

// for use in navigation components
export function LocationDisplay() {
  const location = useLocation();
  return <div data-testid="location-display">{location.pathname}</div>;
}

// for use in context wrapper components
export function ContextDisplay({ context }) {
  const contextValue = use(context);

  return (
    <div data-testid="context-display">{JSON.stringify(contextValue)}</div>
  );
}

ContextDisplay.propTypes = {
  context: PropTypes.context,
};
