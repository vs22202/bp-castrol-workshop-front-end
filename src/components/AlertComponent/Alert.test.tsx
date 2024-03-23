import { Alert, AlertProps } from './Alert';
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";

describe('Alert component', () => {
  const successtestprops: AlertProps = {
    type: 'success',
    message: 'This alert is successful!',
  };
  const errortestprops: AlertProps = {
    type: 'error',
    message: 'This alert has some errors!',
  };
  const infotestprops: AlertProps = {
    type: 'info',
    message: 'This alert has some info!',
  };
  const warningtestprops: AlertProps = {
    type: 'warning',
    message: 'This alert has a warning!',
  };

  //basic rendering
  it('renders alert with correct message', () => {
    const { getByRole } = render(<Alert {...successtestprops} />);

    //fetch alert component
    const alert = getByRole('alertcontainer');

    //check if alert was present or not
    expect(alert).toBeInTheDocument();

    //check if this alert has correct message
    expect(alert).toHaveTextContent("This alert is successful!")
  });
  
  //checks success alert
  it('renders success alert with message correctly', () => {
    const { getByRole } = render(<Alert {...successtestprops} />);

    //fetch alert component
    const alert = getByRole('alertcontainer');

    //check if alert was present or not
    expect(alert).toBeInTheDocument();

    //check if this alert has success alert test message
    expect(alert).toHaveTextContent("This alert is successful!")

    //check if alert class is applied
    expect(alert).toHaveClass("success")
  });

  //checks error alert
  it('renders error alert with message correctly', () => {
    const { getByRole } = render(<Alert {...errortestprops} />);

    //fetch alert component
    const alert = getByRole('alertcontainer');

    //check if alert was present or not
    expect(alert).toBeInTheDocument();

    //check if this alert has error alert test message
    expect(alert).toHaveTextContent("This alert has some errors!")

    //check if alert class is applied
    expect(alert).toHaveClass("error")
  });
  
  //checks info alert
  it('renders info alert with message correctly', () => {
    const { getByRole } = render(<Alert {...infotestprops} />);

    //fetch alert component
    const alert = getByRole('alertcontainer');

    //check if alert was present or not
    expect(alert).toBeInTheDocument();

    //check if this alert has info alert test message
    expect(alert).toHaveTextContent("This alert has some info!")

    //check if alert class is applied
    expect(alert).toHaveClass("info")
  });

  //checks warning alert
  it('renders warning alert with message correctly', () => {
    const { getByRole } = render(<Alert {...warningtestprops} />);

    //fetch alert component
    const alert = getByRole('alertcontainer');

    //check if alert was present or not
    expect(alert).toBeInTheDocument();

    //check if this alert has warning alert test message
    expect(alert).toHaveTextContent("This alert has a warning!")

    //check if alert class is applied
    expect(alert).toHaveClass("warning")

  });

  //checks alert rendering with blank message
  it('rendering of alert with blank message', () => {
    const { queryByRole } = render(
      <>
        <Alert type='success' message='' />
        <Alert type='error' message='' />
        <Alert type='warning' message='' />
        <Alert type='info' message='' />
      </>
      );

    //checks that blank alert(of any type) is not present in the output
    expect(queryByRole('alertcontainer')).not.toBeInTheDocument()
  });

  //check rendering an alert with long message
  it('renders alert with long message', () => {
    const msg = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    const { getByRole } = render(
      <>
        <Alert type='success' message={msg} />
      </>
      );

      //get the alert component
      const alert = getByRole('alertcontainer');

      //check if long message gets rendered
      expect(alert).toHaveTextContent(msg)
  });

  //checks rendering of multiple alerts
  it('rendering of alert with blank message', () => {
    const { getAllByRole } = render(
      <>
        <Alert type='success' message='success' />
        <Alert type='error' message='error' />
        <Alert type='warning' message='warning' />
        <Alert type='info' message='info' />
        <Alert type='error' message='error2' />
      </>
      );

    //fetch all the alerts
    const alert1 = getAllByRole("alertcontainer")[0]; //success
    const alert2 = getAllByRole("alertcontainer")[1];//error
    const alert3 = getAllByRole("alertcontainer")[2];//warning
    const alert4 = getAllByRole("alertcontainer")[3];//info
    const alert5 = getAllByRole("alertcontainer")[4];//error

    //check alert types through class applied on it
    expect(alert1).toHaveClass("success");
    expect(alert2).toHaveClass("error");
    expect(alert3).toHaveClass("warning");
    expect(alert4).toHaveClass("info");
    expect(alert5).toHaveClass("error");

    //check if theyre rendering the right text
    expect(alert1).toHaveTextContent("success")
    expect(alert2).toHaveTextContent("error")
    expect(alert3).toHaveTextContent("warning")
    expect(alert4).toHaveTextContent("info")
    expect(alert5).toHaveTextContent("error2")
  });
});
