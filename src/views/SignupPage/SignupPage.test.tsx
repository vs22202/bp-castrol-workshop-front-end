import "@testing-library/jest-dom";
import RequireAuth from "../../components/RequireAuthComponent/RequireAuth";
import { MemoryRouter } from "react-router-dom";
import { fireEvent, render, waitFor } from "@testing-library/react";
import SignupPage from "./SignupPage";
import AlertContext, { AlertContextProps } from "../../contexts/AlertContext";
import { AuthProvider } from "../../contexts/AuthContext";
import fetch, { enableFetchMocks } from "jest-fetch-mock";
import { createMemoryHistory } from "history";
enableFetchMocks();

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
            <SignupPage />
          </RequireAuth>
        </AuthProvider>
      </AlertContext.Provider>
    </MemoryRouter>
  );
};

describe("SignupPage Component", () => {
  beforeEach(() => {
    fetchMock.mockClear();
  });

  test("Renders all components in the Signup page corectly", () => {
    const { getByRole, getByLabelText } = setup();
    //all input fields
    const emailInput = getByRole("textbox", { name: "Email ID / Phone Number *" });
    const passwordInput = getByLabelText(/Password/i, {
      selector: "#user_password",
    });
    const passwordConfirmInput = getByLabelText(/Confirm Password/i, {
      selector: "#user_password_confirm",
    });
    const otpInput = getByRole("textbox", { name: "OTP *" });

    //all buttons
    const LoginBtn = getByRole("button", { name: "Login" });
    const SignupBtn = getByRole("button", { name: "Sign Up" });
    const otpBtn = getByRole("button", { name: "Get OTP" });

    //all input fields are in the document
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(passwordConfirmInput).toBeInTheDocument();
    expect(otpInput).toBeInTheDocument();

    //all buttons are in the document
    expect(LoginBtn).toBeInTheDocument();
    expect(SignupBtn).toBeInTheDocument();
    expect(otpBtn).toBeInTheDocument();
  });

  test("Validation check of signup page", async () => {
    const { getByRole, getByLabelText, getByText } = setup();
    fireEvent.change(getByRole("textbox", { name: "Email ID / Phone Number *" }), {
      target: { value: "testexample.com" },
    });
    await waitFor(() =>
      expect(
        getByText("Please enter a valid email Id / phone number(with country code).")
      ).toBeInTheDocument()
    );
    fireEvent.change(
      getByLabelText(/Password/i, { selector: "#user_password" }),
      { target: { value: "testexample2001" } }
    );
    await waitFor(() =>
      expect(
        getByText(
          /Your password must contain at least 10 characters and include a mix of uppercase letters, lowercase letters, numbers, and special characters./i
        )
      ).toBeInTheDocument()
    );
    fireEvent.change(
      getByLabelText(/Confirm Password/i, {
        selector: "#user_password_confirm",
      }),
      { target: { value: "@Testexample2001" } }
    );
    expect(getByRole("button", { name: "Get OTP" })).toBeDisabled();
  });

  test("should signup successfully and navigate to login page", async () => {
    fetchMock.mockResponseOnce(
      JSON.stringify({ output: "success", msg: "OTP send successfully" }),
      { status: 200 }
    );

    const { getByRole, getByLabelText, getByText } = setup();
    const SignupForm = getByRole("form");
    fireEvent.change(getByRole("textbox", { name: "Email ID / Phone Number *" }), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(
      getByLabelText(/Password/i, { selector: "#user_password" }),
      { target: { value: "@Testexample2001" } }
    );
    fireEvent.change(
      getByLabelText(/Confirm Password/i, {
        selector: "#user_password_confirm",
      }),
      { target: { value: "@Testexample2001" } }
    );

    fireEvent.click(getByRole("button", { name: "Get OTP" }));

    await waitFor(()=>{
      expect(fetch.mock.calls.length).toEqual(1);
      expect(fetch.mock.calls[0][0]).toEqual("http://localhost:3000/generateOtp");
    })

    await waitFor(() => expect(getByText(/Resend OTP/i)).toBeInTheDocument());

    fireEvent.change(getByRole("textbox", { name: "OTP *" }), {
      target: { value: "123456" },
    });

    fetchMock.mockResponseOnce(
      JSON.stringify({
        output: "success",
        msg: "User registered successfully",
      }),
      { status: 200 }
    );

    const SignupBtn = getByRole("button", { name: "Sign Up" });
    await waitFor(() => fireEvent.click(SignupBtn));

    await waitFor(() => {
      expect(SignupForm).toHaveFormValues({
        user_id: "test@example.com",
        user_password: "@Testexample2001",
        user_password_confirm: "@Testexample2001",
        otp: "123456",
      });
    });

    await waitFor(()=>{
      expect(fetch.mock.calls.length).toEqual(2);
      expect(fetch.mock.calls[1][0]).toEqual("http://localhost:3000/register");
      expect(sendAlert).toHaveBeenCalledWith({
        message: "Your account has been created",
        type: "success",
      });
    })
    await waitFor(() => {
      const history = createMemoryHistory({ initialEntries: ["/signup"] }); // Set the initial path
      history.listen(() => {
        expect(history.location.pathname).toBe("/login");
      });
    });
  });

  test("otp sucessfully generated and verified but signup error", async () => {
    fetchMock.mockResponseOnce(
      JSON.stringify({ output: "success", msg: "OTP send successfully" }),
      { status: 200 }
    );

    const { getByRole, getByLabelText, getByText } = setup();
    fireEvent.change(getByRole("textbox", { name: "Email ID / Phone Number *" }), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(
      getByLabelText(/Password/i, { selector: "#user_password" }),
      { target: { value: "@Testexample2001" } }
    );
    fireEvent.change(
      getByLabelText(/Confirm Password/i, {
        selector: "#user_password_confirm",
      }),
      { target: { value: "@Testexample2001" } }
    );

    fireEvent.click(getByRole("button", { name: "Get OTP" }));

    await waitFor(()=>{
      expect(fetch.mock.calls.length).toEqual(1);
      expect(fetch.mock.calls[0][0]).toEqual("http://localhost:3000/generateOtp");
    })

    await waitFor(() => expect(getByText(/Resend OTP/i)).toBeInTheDocument());

    fireEvent.change(getByRole("textbox", { name: "OTP *" }), {
      target: { value: "123456" },
    });

    fetchMock.mockReject(new Error("Error adding user to Users table"));

    const SignupBtn = getByRole("button", { name: "Sign Up" });
    await waitFor(() => fireEvent.click(SignupBtn));

    expect(fetch.mock.calls.length).toEqual(2);
    expect(fetch.mock.calls[1][0]).toEqual("http://localhost:3000/register");
    await waitFor(() => {
      const history = createMemoryHistory({ initialEntries: ["/signup"] });
      history.listen(() => {
        expect(history.location.pathname).not.toBe("/login");
      });
    });
  });

  test("otp sucessfully generated and verified but signup internal server error", async () => {
    fetchMock.mockResponseOnce(
      JSON.stringify({ output: "success", msg: "OTP send successfully" }),
      { status: 200 }
    );

    const { getByRole, getByLabelText, getByText } = setup();
    fireEvent.change(getByRole("textbox", { name: "Email ID / Phone Number *" }), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(
      getByLabelText(/Password/i, { selector: "#user_password" }),
      { target: { value: "@Testexample2001" } }
    );
    fireEvent.change(
      getByLabelText(/Confirm Password/i, {
        selector: "#user_password_confirm",
      }),
      { target: { value: "@Testexample2001" } }
    );

    fireEvent.click(getByRole("button", { name: "Get OTP" }));

    expect(fetch.mock.calls.length).toEqual(1);
    expect(fetch.mock.calls[0][0]).toEqual("http://localhost:3000/generateOtp");

    await waitFor(() => expect(getByText(/Resend OTP/i)).toBeInTheDocument());

    fireEvent.change(getByRole("textbox", { name: "OTP *" }), {
      target: { value: "123456" },
    });

    fetchMock.mockResponseOnce(
      JSON.stringify({ output: "fail", msg: "Error inserting data" }),
      { status: 500 }
    );

    const SignupBtn = getByRole("button", { name: "Sign Up" });
    await waitFor(() => fireEvent.click(SignupBtn));

    expect(fetch.mock.calls.length).toEqual(2);
    expect(fetch.mock.calls[1][0]).toEqual("http://localhost:3000/register");
    expect(sendAlert).toHaveBeenCalledWith({
      message: "Error inserting data",
      type: "error",
    });
    await waitFor(() => {
      const history = createMemoryHistory({ initialEntries: ["/signup"] }); // Set the initial path
      history.listen(() => {
        expect(history.location.pathname).not.toBe("/login");
      });
    });
  });

  test("signup should fail due to incorrect otp", async () => {

    fetchMock.mockResponseOnce(
        JSON.stringify({ output: "success", msg: "OTP send successfully" }),
        { status: 200 }
      );

      const { getByRole, getByLabelText, getByText } = setup();
      fireEvent.change(getByRole("textbox", { name: "Email ID / Phone Number *" }), {
        target: { value: "test@example.com" },
      });
      fireEvent.change(
        getByLabelText(/Password/i, { selector: "#user_password" }),
        { target: { value: "@Testexample2001" } }
      );
      fireEvent.change(
        getByLabelText(/Confirm Password/i, {
          selector: "#user_password_confirm",
        }),
        { target: { value: "@Testexample2001" } }
      );
  
      fireEvent.click(getByRole("button", { name: "Get OTP" }));
  
      await waitFor(()=>{
        expect(fetch.mock.calls.length).toEqual(1);
        expect(fetch.mock.calls[0][0]).toEqual("http://localhost:3000/generateOtp");
      })
  
      await waitFor(() => expect(getByText(/Resend OTP/i)).toBeInTheDocument());
  
      fireEvent.change(getByRole("textbox", { name: "OTP *" }), {
        target: { value: "123456" },
      });

  fetchMock.mockResponseOnce(
    JSON.stringify({ output: "fail", msg: "Invalid OTP" }),
    { status: 400 }
  );

  const SignupBtn = getByRole("button", { name: "Sign Up" });
  await waitFor(() => fireEvent.click(SignupBtn));

  await waitFor(()=>{
    expect(fetch.mock.calls.length).toEqual(2);
    expect(fetch.mock.calls[1][0]).toEqual("http://localhost:3000/register");

    expect(sendAlert).toHaveBeenCalledWith({
      message: "Invalid OTP",
      type: "error",
    });
  })
  await waitFor(() => {
    const history = createMemoryHistory({ initialEntries: ["/signup"] }); // Set the initial path
    history.listen(() => {
      expect(history.location.pathname).not.toBe("/login");
    });
  });
  });

  test("signup unsuccessful due to OTP expiration", async () => {
    jest.useFakeTimers();
    fetchMock.mockResponseOnce(
          JSON.stringify({ output: "success", msg: "OTP send successfully" }),
          { status: 200 }
        );

    const { getByRole, getByLabelText, getByText } = setup();

    fireEvent.change(getByRole("textbox", { name: "Email ID / Phone Number *" }), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(
      getByLabelText(/Password/i, { selector: "#user_password" }),
      { target: { value: "@Testexample2001" } }
    );
    fireEvent.change(
      getByLabelText(/Confirm Password/i, {
        selector: "#user_password_confirm",
      }),
      { target: { value: "@Testexample2001" } }
    );

    fireEvent.click(getByRole("button", { name: "Get OTP" }));

    expect(fetch.mock.calls.length).toEqual(1);
    expect(fetch.mock.calls[0][0]).toEqual("http://localhost:3000/generateOtp");

    await waitFor(() => expect(getByText(/Resend OTP/i)).toBeInTheDocument());
    jest.advanceTimersByTime(120000); //to have 2 minutes time out for otp

    fireEvent.change(getByRole("textbox", { name: "OTP *" }), {
      target: { value: "123456" },
    });

    fetchMock.mockResponseOnce(
      JSON.stringify({ output: "fail", msg: "OTP expired, please regenerate" }),
      { status: 400 }
    );

    const SignupBtn = getByRole("button", { name: "Sign Up" });
    await waitFor(() => fireEvent.click(SignupBtn));

    await waitFor(() => {
      expect(fetch.mock.calls.length).toEqual(2);
      expect(fetch.mock.calls[1][0]).toEqual("http://localhost:3000/register");
    });
    expect(sendAlert).toHaveBeenCalledWith({
      message: "OTP expired, please regenerate",
      type: "error",
    });
    await waitFor(() => {
      const history = createMemoryHistory({ initialEntries: ["/signup"] }); // Set the initial path
      history.listen(() => {
        expect(history.location.pathname).not.toBe("/login");
      });
    });
    jest.useRealTimers();
  });

  test("otp expired so otp is regenrated and then signup is successful", async () => {
    jest.useFakeTimers();
    fetchMock.mockResponseOnce(
      JSON.stringify({ output: "success", msg: "OTP send successfully" }),
      { status: 400 }
    );

    const { getByRole, getByLabelText, getByText, queryByRole } = setup();

    fireEvent.change(getByRole("textbox", { name: "Email ID / Phone Number *" }), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(
      getByLabelText(/Password/i, { selector: "#user_password" }),
      { target: { value: "@Testexample2001" } }
    );
    fireEvent.change(
      getByLabelText(/Confirm Password/i, {
        selector: "#user_password_confirm",
      }),
      { target: { value: "@Testexample2001" } }
    );

    fireEvent.click(getByRole("button", { name: "Get OTP" }));

    expect(fetch.mock.calls.length).toEqual(1);
    expect(fetch.mock.calls[0][0]).toEqual("http://localhost:3000/generateOtp");

    await waitFor(() => expect(getByText(/Resend OTP/i)).toBeInTheDocument());
    jest.advanceTimersByTime(121000); //to have 2 minutes time out for otp
    await waitFor(() => {
      expect(queryByRole("button", { name: /Resend OTP/i })).toBeNull();
      expect(getByRole("button", { name: "Get OTP" })).toBeInTheDocument();
    });
    fetchMock.mockResponseOnce(
      JSON.stringify({ output: "success", msg: "OTP send successfully" }),
      { status: 200 }
    );

    fireEvent.click(getByRole("button", { name: "Get OTP" }));
    expect(fetch.mock.calls.length).toEqual(2);
    expect(fetch.mock.calls[1][0]).toEqual("http://localhost:3000/generateOtp");

    fireEvent.change(getByRole("textbox", { name: "OTP *" }), {
      target: { value: "123456" },
    });

    fetchMock.mockResponseOnce(
      JSON.stringify({
        output: "success",
        msg: "User registered successfully",
      }),
      { status: 200 }
    );

    const SignupBtn = getByRole("button", { name: "Sign Up" });
    await waitFor(() => fireEvent.click(SignupBtn));

    await waitFor(() => {
      expect(fetch.mock.calls.length).toEqual(3);
      expect(fetch.mock.calls[2][0]).toEqual("http://localhost:3000/register");
    });

    expect(sendAlert).toHaveBeenCalledWith({
      message: "Your account has been created",
      type: "success",
    });
    await waitFor(() => {
      const history = createMemoryHistory({ initialEntries: ["/signup"] }); // Set the initial path
      history.listen(() => {
        expect(history.location.pathname).toBe("/login");
      });
    });

    jest.useRealTimers();
  });

  //mobile registration
  test("Renders all components in the Signup mobile page corectly", () => {
    const { getByRole, getByLabelText } = setup();


    //all input fields
    const mobileInput = getByRole("textbox", { name: "Email ID / Phone Number *" });
    const passwordInput = getByLabelText(/Password/i, {
      selector: "#user_password",
    });
    const passwordConfirmInput = getByLabelText(/Confirm Password/i, {
      selector: "#user_password_confirm",
    });
    const otpInput = getByRole("textbox", { name: "OTP *" });

    //all buttons
    const LoginBtn = getByRole("button", { name: "Login" });
    const SignupBtn = getByRole("button", { name: "Sign Up" });
    const otpBtn = getByRole("button", { name: "Get OTP" });

    //all input fields are in the document
    expect(mobileInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(passwordConfirmInput).toBeInTheDocument();
    expect(otpInput).toBeInTheDocument();

    //all buttons are in the document
    expect(LoginBtn).toBeInTheDocument();
    expect(SignupBtn).toBeInTheDocument();
    expect(otpBtn).toBeInTheDocument();
  });

  test("Validation check of signup mobile page", async () => {
    const { getByRole, getByLabelText, getByText } = setup();


    fireEvent.change(getByRole("textbox", { name: "Email ID / Phone Number *" }), {
      target: { value: "testexample.com" },
    });
    await waitFor(() =>
      expect(
        getByText(
          /Email address must be at least 5 characters long./i
        )
      ).toBeInTheDocument()
    );
    fireEvent.change(
      getByLabelText(/Password/i, { selector: "#user_password" }),
      { target: { value: "testexample2001" } }
    );
    await waitFor(() =>
      expect(
        getByText(
          /Your password must contain at least 10 characters and include a mix of uppercase letters, lowercase letters, numbers, and special characters./i
        )
      ).toBeInTheDocument()
    );
    fireEvent.change(
      getByLabelText(/Confirm Password/i, {
        selector: "#user_password_confirm",
      }),
      { target: { value: "@Testexample2001" } }
    );
    expect(getByRole("button", { name: "Get OTP" })).toBeDisabled();
  });

  test("should signup with mobile successfully and navigate to login page", async () => {
    fetchMock.mockResponseOnce(
      JSON.stringify({ output: "success", msg: "OTP send successfully" }),
      { status: 200 }
    );

    const { getByRole, getByLabelText, getByText } = setup();

    const SignupForm = getByRole("form");
    fireEvent.change(getByRole("textbox", { name: "Email ID / Phone Number *" }), {
      target: { value: "911234567890" },
    });
    fireEvent.change(
      getByLabelText(/Password/i, { selector: "#user_password" }),
      { target: { value: "@Testexample2001" } }
    );
    fireEvent.change(
      getByLabelText(/Confirm Password/i, {
        selector: "#user_password_confirm",
      }),
      { target: { value: "@Testexample2001" } }
    );

    fireEvent.click(getByRole("button", { name: "Get OTP" }));

    await waitFor(()=>{
      expect(fetch.mock.calls.length).toEqual(1);
      expect(fetch.mock.calls[0][0]).toEqual(
        "http://localhost:3000/generateOtp/mobile"
      );
    })

    await waitFor(() => expect(getByText(/Resend OTP/i)).toBeInTheDocument());

    fireEvent.change(getByRole("textbox", { name: "OTP *" }), {
      target: { value: "123456" },
    });

    fetchMock.mockResponseOnce(
      JSON.stringify({
        output: "success",
        msg: "User registered successfully",
      }),
      { status: 200 }
    );

    const SignupBtn = getByRole("button", { name: "Sign Up" });
    await waitFor(() => fireEvent.click(SignupBtn));

    await waitFor(() => {
      expect(SignupForm).toHaveFormValues({
        user_id: "911234567890",
        user_password: "@Testexample2001",
        user_password_confirm: "@Testexample2001",
        otp: "123456",
      });
    });
    await waitFor(() => {
      expect(fetch.mock.calls.length).toEqual(2);
      expect(fetch.mock.calls[1][0]).toEqual(
        "http://localhost:3000/register/mobile"
      );
    });
    expect(sendAlert).toHaveBeenCalledWith({
      message: "Your account has been created",
      type: "success",
    });
    await waitFor(() => {
      const history = createMemoryHistory({ initialEntries: ["/signup"] }); // Set the initial path
      history.listen(() => {
        expect(history.location.pathname).toBe("/login");
      });
    });
  });

});
