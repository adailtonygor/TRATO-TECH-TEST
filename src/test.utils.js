import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "store";

const Provedores = ({ children }) => (
  <Provider store={store}>
    <BrowserRouter>{children}</BrowserRouter>
  </Provider>
);

export const renderComProvedores = (ui, options) =>
  render(ui, {
    wrapper: Provedores,
    ...options,
  });

export * from "@testing-library/react";

export { renderComProvedores as render };