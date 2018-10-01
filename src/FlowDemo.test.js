import React from "react";
import ReactDOM from "react-dom";
import FlowDemo from "./FlowDemo";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<FlowDemo />, div);
});
