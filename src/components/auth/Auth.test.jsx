import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Auth from "./Auth";
import { BrowserRouter as Router } from "react-router-dom";

test("renders login form", () => {
  const { asFragment } = render(
    <Router>
      <Auth />
    </Router>
  );
  expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
  expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  expect(asFragment()).toMatchSnapshot();
});
