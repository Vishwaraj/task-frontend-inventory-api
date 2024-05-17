import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
// import "@testing-library/jest-dom/extend-expect";
import "@testing-library/jest-dom";
import CustomersPage from "./CustomersPage";
import { CustomerService } from "../../services/customerService";
import { BrowserRouter as Router } from "react-router-dom";

test("renders without crashing", () => {
  const { asFragment } = render(
    <Router>
      <CustomersPage />
    </Router>
  );
  expect(asFragment()).toMatchSnapshot();
});

test("renders Navbar component", () => {
  const { asFragment } = render(
    <Router>
      <CustomersPage />
    </Router>
  );
  const navbar = screen.getByTestId("navbar");
  expect(navbar).toBeInTheDocument();
  expect(asFragment()).toMatchSnapshot();
});

test("renders Form component", () => {
  const { asFragment } = render(
    <Router>
      <CustomersPage />
    </Router>
  );
  const form = screen.getByTestId("form");
  expect(form).toBeInTheDocument();
  expect(asFragment()).toMatchSnapshot();
});

test("renders ResponsiveTable component with correct props", async () => {
  const customers = [
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      address: "123 Main St",
      hp: "555-1234",
    },
    {
      id: 2,
      name: "Jane Doe",
      email: "jane.doe@example.com",
      address: "456 Elm St",
      hp: "555-5678",
    },
  ];
  jest.spyOn(CustomerService, "getCustomers").mockResolvedValue(customers);

  const { asFragment } = render(
    <Router>
      <CustomersPage />
    </Router>
  );

  await waitFor(() => {
    const table = screen.getByTestId("responsive-table");
    expect(table).toBeInTheDocument();

    const rows = table.querySelectorAll("tr");
    expect(rows.length).toBe(3); // including header row

    const headerCells = rows[0].querySelectorAll("th");
    expect(headerCells[0]).toHaveTextContent("ID");
    expect(headerCells[1]).toHaveTextContent("Name");
    expect(headerCells[2]).toHaveTextContent("Email");
    expect(headerCells[3]).toHaveTextContent("Address");
    expect(headerCells[4]).toHaveTextContent("HP");

    const firstRowCells = rows[1].querySelectorAll("td");
    expect(firstRowCells[0]).toHaveTextContent("1");
    expect(firstRowCells[1]).toHaveTextContent("John Doe");
    expect(firstRowCells[2]).toHaveTextContent("john.doe@example.com");
    expect(firstRowCells[3]).toHaveTextContent("123 Main St");
    expect(firstRowCells[4]).toHaveTextContent("555-1234");

    const secondRowCells = rows[2].querySelectorAll("td");
    expect(secondRowCells[0]).toHaveTextContent("2");
    expect(secondRowCells[1]).toHaveTextContent("Jane Doe");
    expect(secondRowCells[2]).toHaveTextContent("jane.doe@example.com");
    expect(secondRowCells[3]).toHaveTextContent("456 Elm St");
    expect(secondRowCells[4]).toHaveTextContent("555-5678");
  });
  expect(asFragment()).toMatchSnapshot();
});
