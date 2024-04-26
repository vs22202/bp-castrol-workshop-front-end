import "@testing-library/jest-dom";
import RequireAuth from "../../components/RequireAuthComponent/RequireAuth";
import { MemoryRouter } from "react-router-dom";
import { fireEvent, render, waitFor } from "@testing-library/react";
import ProfilePage from "./ProfilePage";
import AlertContext, { AlertContextProps } from "../../contexts/AlertContext";
import { AuthProvider } from "../../contexts/AuthContext";
import fetch, { enableFetchMocks } from "jest-fetch-mock";
import { createMemoryHistory } from "history";
enableFetchMocks();

/**
 * File: ProfilePage.test.js
 * Description: This file contains unit tests for the ProfilePage component.
 * Dependencies:
 *   - @testing-library/jest-dom
 *   - react-router-dom
 *   - @testing-library/react
 *   - jest-fetch-mock
 *   - history
 * Test suite for the Profile Page component:
 * - Renders all components successfully.
 * - Validates profile page.
 * - Successfully changes the password of user.
 * - Handles internal server error for change password.
 * - Handles old password does not match error for change password.
 * - Handles user not found error when change password button clicked.
 * - Handles user data not found error for profile page.
 * - Handles internal server error for profile page.
 * - Successfully changes the password of user through mobile number.
 */

const alert = null;
const sendAlert = jest.fn();

const mockContextValue: AlertContextProps = {
  alert,
  sendAlert,
};

const setup = () => {
  return render(
    <MemoryRouter>
      <AlertContext.Provider value={mockContextValue}>
        <AuthProvider>
          <RequireAuth requireAuth={false}>
            <ProfilePage />
          </RequireAuth>
        </AuthProvider>
      </AlertContext.Provider>
    </MemoryRouter>
  );
};

describe("Profile Page", () => {
  beforeEach(() => {
    fetchMock.mockClear();
  });

  test("Renders all components successfully", async () => {
    fetchMock.mockResponseOnce(
      JSON.stringify({
        output: "success",
        msg: "User data was avaliable",
        result: {
          user_id: 1,
          user_email: "Testexample@gmail.com",
          verified: "1",
        },
      }),
      { status: 200 }
    );

    const { getByRole, getByLabelText, getByText } = setup();

    await waitFor(() => {
      expect(fetch.mock.calls.length).toEqual(1);
      expect(fetch.mock.calls[0][0]).toEqual("http://localhost:3000/user/");
    });

    //all headings
    expect(getByText(/Profile/i)).toBeInTheDocument();
    expect(
      getByText(/Thank you for being part of our Castrol Community!/i)
    ).toBeInTheDocument();
    //all input fields
    const emailInput = getByRole("textbox", { name: "Email ID *" });
    const userOldPasswordInput = getByLabelText(
      "Old Password*"
    ) as HTMLInputElement;
    const userPasswordInput = getByLabelText(
      "New Password*"
    ) as HTMLInputElement;
    const userConfirmPasswordInput = getByLabelText(
      "Confirm New Password*"
    ) as HTMLInputElement;

    expect(emailInput).toBeInTheDocument();
    expect(userOldPasswordInput).toBeInTheDocument();
    expect(userPasswordInput).toBeInTheDocument();
    expect(userConfirmPasswordInput).toBeInTheDocument();

    //button
    const changePassword = getByRole("button", { name: "Change Password" });
    expect(changePassword).toBeInTheDocument();
  });

  test("Validation check of profile page", async () => {
    fetchMock.mockResponseOnce(
      JSON.stringify({
        output: "success",
        msg: "User data was avaliable",
        result: {
          user_id: 1,
          user_email: "Testexample@gmail.com",
          verified: "1",
        },
      }),
      { status: 200 }
    );
    const { getByLabelText, getByText } = setup();
    const userOldPasswordInput = getByLabelText(
      "Old Password*"
    ) as HTMLInputElement;
    fireEvent.change(userOldPasswordInput, {
      target: { value: "@Bpcastrol2001" },
    });
    const userPasswordInput = getByLabelText(
      "New Password*"
    ) as HTMLInputElement;
    fireEvent.change(userPasswordInput, { target: { value: "pcastrol2024" } });
    await waitFor(() =>
      expect(
        getByText(
          /Your password must contain at least 10 characters and include a mix of uppercase letters, lowercase letters, numbers, and special characters./i
        )
      ).toBeInTheDocument()
    );
    const userConfirmPasswordInput = getByLabelText(
      "Confirm New Password*"
    ) as HTMLInputElement;
    fireEvent.change(userConfirmPasswordInput, {
      target: { value: "@Bpcastrol2024" },
    });
  });

  test("Successfully changes the password of user", async () => {
    fetchMock.mockResponseOnce(
      JSON.stringify({
        output: "success",
        msg: "User data was avaliable",
        result: {
          user_id: 1,
          user_email: "Testexample@gmail.com",
          verified: "1",
        },
      }),
      { status: 200 }
    );

    const { getByRole, getByLabelText } = setup();
    await waitFor(() => {
      expect(fetch.mock.calls.length).toEqual(1);
      expect(fetch.mock.calls[0][0]).toEqual("http://localhost:3000/user/");
    });

    const userOldPasswordInput = getByLabelText(
      "Old Password*"
    ) as HTMLInputElement;
    fireEvent.change(userOldPasswordInput, {
      target: { value: "@Bpcastrol2001" },
    });

    const userPasswordInput = getByLabelText(
      "New Password*"
    ) as HTMLInputElement;
    fireEvent.change(userPasswordInput, {
      target: { value: "@Bpcastrol2024" },
    });

    const userConfirmPasswordInput = getByLabelText(
      "Confirm New Password*"
    ) as HTMLInputElement;
    fireEvent.change(userConfirmPasswordInput, {
      target: { value: "@Bpcastrol2024" },
    });

    const changePassword = getByRole("button", { name: "Change Password" });

    fetchMock.mockResponseOnce(
      JSON.stringify({
        output: "success",
        msg: "Password was changes successfully",
      }),
      { status: 200 }
    );

    fireEvent.click(changePassword);

    await waitFor(() => {
      expect(fetch.mock.calls.length).toEqual(2); // Two fetch calls: initial data fetch and form submission
      expect(fetch.mock.calls[1][0]).toEqual(
        "http://localhost:3000/user/changepassword"
      ); // Expecting change password endpoint to be called
      expect(sendAlert).toHaveBeenCalledWith({
        message: "Password Changed Successfully",
        type: "success",
      });
    });
    await waitFor(() => {
      const history = createMemoryHistory({ initialEntries: ["/profile"] }); // Set the initial path
      history.listen(() => {
        expect(history.location.pathname).toBe("/");
      });
    });
    await waitFor(() => {
      expect(getByRole("form")).toHaveFormValues({
        user_email_id: "Testexample@gmail.com",
        user_old_password: "@Bpcastrol2001",
        user_password: "@Bpcastrol2024",
        user_confirm_password: "@Bpcastrol2024",
      });
    });
  });
  test("Internal Server error so change password unsuccessful", async () => {
    fetchMock.mockResponseOnce(
      JSON.stringify({
        output: "success",
        msg: "User data was avaliable",
        result: {
          user_id: 1,
          user_email: "Testexample@gmail.com",
          verified: "1",
        },
      }),
      { status: 200 }
    );

    const { getByRole, getByLabelText } = setup();
    await waitFor(() => {
      expect(fetch.mock.calls.length).toEqual(1);
      expect(fetch.mock.calls[0][0]).toEqual("http://localhost:3000/user/");
    });

    const userOldPasswordInput = getByLabelText(
      "Old Password*"
    ) as HTMLInputElement;
    fireEvent.change(userOldPasswordInput, {
      target: { value: "@Bpcastrol2001" },
    });

    const userPasswordInput = getByLabelText(
      "New Password*"
    ) as HTMLInputElement;
    fireEvent.change(userPasswordInput, {
      target: { value: "@Bpcastrol2024" },
    });

    const userConfirmPasswordInput = getByLabelText(
      "Confirm New Password*"
    ) as HTMLInputElement;
    fireEvent.change(userConfirmPasswordInput, {
      target: { value: "@Bpcastrol2024" },
    });

    const changePassword = getByRole("button", { name: "Change Password" });

    fetchMock.mockResponseOnce(
      JSON.stringify({ output: "fail", msg: "Internal Server Error" }),
      { status: 500 }
    );

    fireEvent.click(changePassword);

    await waitFor(() => {
      expect(fetch.mock.calls.length).toEqual(2); // Two fetch calls: initial data fetch and form submission
      expect(fetch.mock.calls[1][0]).toEqual(
        "http://localhost:3000/user/changepassword"
      ); // Expecting change password endpoint to be called
    });
    await waitFor(() => {
      expect(sendAlert).toHaveBeenCalledWith({
        message: "Internal Server Error",
        type: "error",
      });
    });
    await waitFor(() => {
      const history = createMemoryHistory({ initialEntries: ["/profile"] }); // Set the initial path
      history.listen(() => {
        expect(history.location.pathname).toBe("/");
      });
    });
  });

  test("Old password does not match error so change password unsuccessful", async () => {
    fetchMock.mockResponseOnce(
      JSON.stringify({
        output: "success",
        msg: "User data was avaliable",
        result: {
          user_id: 1,
          user_email: "Testexample@gmail.com",
          verified: "1",
        },
      }),
      { status: 200 }
    );

    const { getByRole, getByLabelText } = setup();
    await waitFor(() => {
      expect(fetch.mock.calls.length).toEqual(1);
      expect(fetch.mock.calls[0][0]).toEqual("http://localhost:3000/user/");
    });

    const userOldPasswordInput = getByLabelText(
      "Old Password*"
    ) as HTMLInputElement;
    fireEvent.change(userOldPasswordInput, {
      target: { value: "@Bpcastrol2024" },
    });

    const userPasswordInput = getByLabelText(
      "New Password*"
    ) as HTMLInputElement;
    fireEvent.change(userPasswordInput, {
      target: { value: "@Bpcastrol2024" },
    });

    const userConfirmPasswordInput = getByLabelText(
      "Confirm New Password*"
    ) as HTMLInputElement;
    fireEvent.change(userConfirmPasswordInput, {
      target: { value: "@Bpcastrol2024" },
    });

    const changePassword = getByRole("button", { name: "Change Password" });

    fetchMock.mockResponseOnce(
      JSON.stringify({ output: "error", msg: "Old password does not match" }),
      { status: 201 }
    );

    fireEvent.click(changePassword);

    await waitFor(() => {
      expect(fetch.mock.calls.length).toEqual(2);
      expect(fetch.mock.calls[1][0]).toEqual(
        "http://localhost:3000/user/changepassword"
      );
    });
    await waitFor(() => {
      expect(sendAlert).toHaveBeenCalledWith({
        message: "Old password does not match",
        type: "error",
      });
    });
    await waitFor(() => {
      const history = createMemoryHistory({ initialEntries: ["/profile"] }); // Set the initial path
      history.listen(() => {
        expect(history.location.pathname).not.toBe("/");
      });
    });
  });

  test("User not found when change password button clicked", async () => {
    fetchMock.mockResponseOnce(
      JSON.stringify({
        output: "success",
        msg: "User data was avaliable",
        result: {
          user_id: 1,
          user_email: "Testexample@gmail.com",
          verified: "1",
        },
      }),
      { status: 200 }
    );

    const { getByRole, getByLabelText } = setup();
    await waitFor(() => {
      expect(fetch.mock.calls.length).toEqual(1);
      expect(fetch.mock.calls[0][0]).toEqual("http://localhost:3000/user/");
    });

    const userOldPasswordInput = getByLabelText(
      "Old Password*"
    ) as HTMLInputElement;
    fireEvent.change(userOldPasswordInput, {
      target: { value: "@Bpcastrol2024" },
    });

    const userPasswordInput = getByLabelText(
      "New Password*"
    ) as HTMLInputElement;
    fireEvent.change(userPasswordInput, {
      target: { value: "@Bpcastrol2024" },
    });

    const userConfirmPasswordInput = getByLabelText(
      "Confirm New Password*"
    ) as HTMLInputElement;
    fireEvent.change(userConfirmPasswordInput, {
      target: { value: "@Bpcastrol2024" },
    });

    const changePassword = getByRole("button", { name: "Change Password" });

    fetchMock.mockResponseOnce(
      JSON.stringify({ output: "error", msg: "User data was not found" }),
      { status: 201 }
    );

    fireEvent.click(changePassword);

    await waitFor(() => {
      expect(fetch.mock.calls.length).toEqual(2);
      expect(fetch.mock.calls[1][0]).toEqual(
        "http://localhost:3000/user/changepassword"
      );
    });
    await waitFor(() => {
      expect(sendAlert).toHaveBeenCalledWith({
        message: "User data was not found",
        type: "error",
      });
    });
    await waitFor(() => {
      const history = createMemoryHistory({ initialEntries: ["/profile"] }); // Set the initial path
      history.listen(() => {
        expect(history.location.pathname).not.toBe("/");
      });
    });
  });

  test("User data not found error for profile page", async () => {
    fetchMock.mockResponseOnce(
      JSON.stringify({
        output: "error", //output:"error"
        msg: "User data was not found",
      }),
      { status: 201 }
    );

    setup();

    await waitFor(() => {
      expect(fetch.mock.calls.length).toEqual(1);
      expect(fetch.mock.calls[0][0]).toEqual("http://localhost:3000/user/");
    });

    await waitFor(() => {
      expect(sendAlert).toHaveBeenCalledWith({
        message: "User data was not found",
        type: "error",
      });
    });
    await waitFor(() => {
      const history = createMemoryHistory({ initialEntries: ["/profile"] }); // Set the initial path
      history.listen(() => {
        expect(history.location.pathname).toBe("/");
      });
    });
  });

  test("Internal server error for profile page", async () => {
    fetchMock.mockResponseOnce(
      JSON.stringify({
        output: "fail", //output:"error"
        msg: "Internal Server Error",
      }),
      { status: 500 }
    );

    setup();

    await waitFor(() => {
      expect(fetch.mock.calls.length).toEqual(1);
      expect(fetch.mock.calls[0][0]).toEqual("http://localhost:3000/user/");
    });

    await waitFor(() => {
      expect(sendAlert).toHaveBeenCalledWith({
        message: "Internal Server Error",
        type: "error",
      });
    });
    await waitFor(() => {
      const history = createMemoryHistory({ initialEntries: ["/profile"] }); // Set the initial path
      history.listen(() => {
        expect(history.location.pathname).toBe("/");
      });
    });
  });

  test("Successfully changes the password of user through mobile number", async () => {
    jest.useFakeTimers();

    fetchMock.mockResponseOnce(
      JSON.stringify({
        output: "success",
        msg: "User data was avaliable",
        result: {
          user_id: 7,
          user_mobile: "917828806700",
          verified: "1",
        },
      }),
      { status: 200 }
    );

    const { getByRole, getByLabelText } = setup();
    jest.advanceTimersByTime(500);
    await waitFor(() => {
      expect(fetch.mock.calls.length).toEqual(1);
      expect(fetch.mock.calls[0][0]).toEqual("http://localhost:3000/user/");
    });

    await waitFor(() => {
      const userMobileInput = getByLabelText(
        "Mobile Number*"
      ) as HTMLInputElement;
      expect(userMobileInput.value).toBe("917828806700");
    });
    const userOldPasswordInput = getByLabelText(
      "Old Password*"
    ) as HTMLInputElement;
    fireEvent.change(userOldPasswordInput, {
      target: { value: "@Bpcastrol2001" },
    });

    const userPasswordInput = getByLabelText(
      "New Password*"
    ) as HTMLInputElement;
    fireEvent.change(userPasswordInput, {
      target: { value: "@Bpcastrol2024" },
    });

    const userConfirmPasswordInput = getByLabelText(
      "Confirm New Password*"
    ) as HTMLInputElement;
    fireEvent.change(userConfirmPasswordInput, {
      target: { value: "@Bpcastrol2024" },
    });

    const changePassword = getByRole("button", { name: "Change Password" });

    fetchMock.mockResponseOnce(
      JSON.stringify({
        output: "success",
        msg: "Password was changes successfully",
      }),
      { status: 200 }
    );

    fireEvent.click(changePassword);
    // jest.advanceTimersByTime(10000);
    await waitFor(() => {
      expect(fetch.mock.calls.length).toEqual(2); // Two fetch calls: initial data fetch and form submission
      expect(fetch.mock.calls[1][0]).toEqual(
        "http://localhost:3000/user/changepassword"
      ); // Expecting change password endpoint to be called
      expect(sendAlert).toHaveBeenCalledWith({
        message: "Password Changed Successfully",
        type: "success",
      });
    });
    await waitFor(() => {
      const history = createMemoryHistory({ initialEntries: ["/profile"] }); // Set the initial path
      history.listen(() => {
        expect(history.location.pathname).toBe("/");
      });
    });
    await waitFor(() => {
      expect(getByRole("form")).toHaveFormValues({
        user_mobile: "917828806700",
        user_old_password: "@Bpcastrol2001",
        user_password: "@Bpcastrol2024",
        user_confirm_password: "@Bpcastrol2024",
      });
    });
    jest.useRealTimers();
  });
});
