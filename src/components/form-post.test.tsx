import { render, screen, prettyDOM, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import FormPost from "./form-post";

describe("FormPost", () => {
  it("should render inputs and buttons", () => {
    render(<FormPost />);

    expect(screen.getByPlaceholderText(/title/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/content/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /save draft/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /save and publish/i })
    ).toBeInTheDocument();
  });

  it("should render event onSubmit", async () => {
    const onSubmit = jest.fn();
    const user = userEvent.setup();
    render(<FormPost onSubmit={onSubmit} />);

    const inputTitle = screen.getByPlaceholderText(/title/i);
    const inputContent = screen.getByPlaceholderText(/content/i);
    const buttonSaveDraft = screen.getByRole("button", { name: /save draft/i });
    const buttonSaveAndPublish = screen.getByRole("button", {
      name: /save and publish/i,
    });

    fireEvent.change(inputTitle, { target: { value: "My title" } });
    fireEvent.change(inputContent, { target: { value: "My content" } });

    expect(inputTitle).toHaveValue("My title");
    expect(inputContent).toHaveValue("My content");

    expect(onSubmit).not.toHaveBeenCalled();
    await user.click(buttonSaveDraft);
    expect(onSubmit).toHaveBeenCalledTimes(1);
    await user.click(buttonSaveAndPublish);
    expect(onSubmit).toHaveBeenCalledTimes(2);
  });
});
