import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { FerramentasDaListagem } from "./FerramentasDaListagem";

describe("FerramentasDaListagem", () => {
   it("should render the search input when showSearchInput is true", () => {
      // Render the FerramentasDaListagem component with the prop mostrarInputBusca set to true
      // and textoDaBusca set to "test". This should cause the search input to be displayed.
      render(<FerramentasDaListagem mostrarInputBusca={true} textoDaBusca="test" />);

      // Use screen.getByPlaceholderText to find the input element by its placeholder text "Buscar...".
      // This verifies that the input element is present in the document.
      const inputElement = screen.getByPlaceholderText("Buscar...");
      expect(inputElement).toBeInTheDocument();

      // Check that the value of the input element is "test", as provided through the textoDaBusca prop.
      expect(inputElement).toHaveValue("test");
   });

   it("should not render the search input when showSearchInput is false", () => {
      // Render the FerramentasDaListagem component with the prop mostrarInputBusca set to false.
      // This should prevent the search input from being displayed.
      render(<FerramentasDaListagem mostrarInputBusca={false} />);

      // Use screen.queryByPlaceholderText to attempt to find the input element by its placeholder text "Buscar...".
      // Since mostrarInputBusca is false, the input should not be present, so queryByPlaceholderText should return null.
      const inputElement = screen.queryByPlaceholderText("Buscar...");
      expect(inputElement).not.toBeInTheDocument();
   });

   it("should call aoMudarTextDeBusca when the search input changes", () => {
      // Create a mock function to pass as the aoMudarTextDeBusca prop.
      const mockAoMudarTextDeBusca = jest.fn();

      // Render the FerramentasDaListagem component with the prop mostrarInputBusca set to true.
      // This should cause the search input to be displayed.
      render(<FerramentasDaListagem mostrarInputBusca={true} aoMudarTextDeBusca={mockAoMudarTextDeBusca} />);

      // Use screen.getByPlaceholderText to find the input element by its placeholder text "Buscar...".
      const inputElement = screen.getByPlaceholderText("Buscar...");

      // Use fireEvent to simulate user input in the search input.
      fireEvent.change(inputElement, { target: { value: "test" } });

      // Check that the mock function mockAoMudarTextDeBusca was called with the correct value "test".
      expect(mockAoMudarTextDeBusca).toHaveBeenCalledWith("test");
   });
});
