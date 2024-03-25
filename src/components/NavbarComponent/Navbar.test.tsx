import "@testing-library/jest-dom";
import AuthContext, { AuthContextProps } from '../../contexts/AuthContext';
import { Navbar } from './Navbar';
import { MemoryRouter } from 'react-router-dom';
import { fireEvent, render } from '@testing-library/react';
//import styles from "./Navbar.module.css"

// Mock AuthContext
const mockAuthContextValue: AuthContextProps = {
  currentUser: null,
  login: async () => 'success',
  loginMobile: async () => 'success',
  signup: async () => 'success',
  signupMobile: async () => 'success',
  generateOtp: async () => {},
  generateOtpMobile: async () => {},
  changePassword: async () => 'success',
  generateResetOtp: async () => {},
  resetPassword: async () => 'success',
  logout: () => {}
};

//mocking usenavigate
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom') as any,
  useNavigate: () => mockNavigate,
}));

//Before login tests
describe('Navbar Components before Login(UnAuth)', () => {
  //basic rendering
  it('renders without crashing', () => {//checks if all elements are present
    const { getAllByRole, getByRole, getByAltText, queryByTestId } = render(
      <MemoryRouter>
        <AuthContext.Provider value={mockAuthContextValue}>
          <Navbar />
        </AuthContext.Provider>
      </MemoryRouter>
    );

    // Assert that the castrol logo is rendered
    expect(getByAltText('Logo')).toBeInTheDocument();

    // Assert that the navigation menu is visible after clicking
    expect(getByRole('navigation')).toBeInTheDocument();

    // Assert that the cross icon and hamburger icon is not initially rendered
    expect(queryByTestId('cross')).not.toBeInTheDocument();
    expect(queryByTestId('hamburger')).not.toBeInTheDocument();

    // Check for presence of various buttons
    // in unauth
    const buttons = getAllByRole("button");
    expect(buttons[0].children[1]).toHaveTextContent("Login")
    expect(buttons[1].children[1]).toHaveTextContent("SignUp")
    expect(buttons[2].children[1]).toHaveTextContent("developer@bpcap.com")
    expect(buttons[3].children[1]).toHaveTextContent("+91 97000 09045")
  });

  //presence of side menu icon on reducing screen size
  it('renders hamburger and cross icon on window size reduce', async() => {
    //reduce screen width (<768px)
    global.innerWidth = 600;

    const { getByRole } = render(
      <MemoryRouter>
        <AuthContext.Provider value={mockAuthContextValue}>
          <Navbar />
        </AuthContext.Provider>
      </MemoryRouter>
    );

    //provide timeout
    await new Promise(resolve => setTimeout(resolve, 1000));
    //hamburger icon should appear on the screen
    const hamburgerIcon = getByRole('hamburger')
    expect(hamburgerIcon).toBeInTheDocument();

    //click on the hamburger icon to view cross icon
    fireEvent.click(hamburgerIcon);

    //cross icon should appear
    const crossicon = getByRole('cross')
    expect(crossicon).toBeInTheDocument()
  });

  //Castrol Icon link check
  it('Checks if castrol icon link leads to home page', () => {//castrol icon link should lead to the home page

    const { getByAltText } = render(
      <MemoryRouter initialEntries={['/login']}>
        <AuthContext.Provider value={mockAuthContextValue}>
          <Navbar />
        </AuthContext.Provider>
      </MemoryRouter>
    );

    //hamburger icon should appear on the screen
    const castrolIcon = getByAltText('Logo');

    //click on the icon
    fireEvent.click(castrolIcon);

    //check the location to be home page
    expect(window.location.href).toBe("http://localhost/");
  });

  //Links and buttons check
  it("Check the login and signup buttons and links",()=>{//checks login and signup buttons and links
    const { getByRole } = render(
      <MemoryRouter initialEntries={['/']}>
        <AuthContext.Provider value={mockAuthContextValue}>
          <Navbar />
        </AuthContext.Provider>
      </MemoryRouter>
    );

    //for bigger screen setup containing buttons
      //fetch login and signup buttons
      const loginBtn =  getByRole('button', { name: 'Login' });
      const signupBtn = getByRole('button', { name: 'SignUp' })

      //expect(getByRole("navigation")).toContain("kejf");

      //click on the login button
      fireEvent.click(loginBtn);

      //check location
      expect(mockNavigate).toHaveBeenCalledWith('/login', { replace: true })

      //click on the signup button
      fireEvent.click(signupBtn);

      //check location
      expect(mockNavigate).toHaveBeenCalledWith('/signup', {replace: true})
  })

});


const mockAuthContextValue1: AuthContextProps = {
  currentUser:{
    user_id: '123',
    user_email: 'test@example.com',
    user_mobile: '+1234567890',
    auth_token: 'mockAuthToken',
  },
  login: async () => 'success',
  loginMobile: async () => 'success',
  signup: async () => 'success',
  signupMobile: async () => 'success',
  generateOtp: async () => {},
  generateOtpMobile: async () => {},
  changePassword: async () => 'success',
  generateResetOtp: async () => {},
  resetPassword: async () => 'success',
  logout: () => {}
};
//After login tests
describe('Navbar Components after Login(Auth)', () => {
  //basic rendering
  it('renders without crashing', () => {//checks if all elements are present
    const { getAllByRole, getByRole, getByAltText, queryByTestId } = render(
      <MemoryRouter>
        <AuthContext.Provider value={mockAuthContextValue1}>
          <Navbar />
        </AuthContext.Provider>
      </MemoryRouter>
    );

    // Assert that the castrol logo is rendered
    expect(getByAltText('Logo')).toBeInTheDocument();

    // Assert that the navigation menu is visible after clicking
    expect(getByRole('navigation')).toBeInTheDocument();

    // Assert that the cross icon and hamburger icon is not initially rendered
    expect(queryByTestId('cross')).not.toBeInTheDocument();
    expect(queryByTestId('hamburger')).not.toBeInTheDocument();

    // Check for presence of buttons
    const buttons = getAllByRole("button");
    expect(buttons[0].children[1]).toHaveTextContent("developer@bpcap.com")
    expect(buttons[1].children[1]).toHaveTextContent("+91 97000 09045")

    //check for link options
    expect(getByRole("link", {name:'Applications'})).toBeInTheDocument();
    expect(getByRole("link", {name:'Profile'})).toBeInTheDocument();
    expect(getByRole("link", {name:'Logout'})).toBeInTheDocument();
  });

  //presence of side menu icon on reducing screen size
  it('renders hamburger and cross icon on window size reduce', async() => {
    //reduce screen width (<768px)
    global.innerWidth = 600;

    const { getByRole, queryByRole } = render(
      <MemoryRouter>
        <AuthContext.Provider value={mockAuthContextValue1}>
          <Navbar />
        </AuthContext.Provider>
      </MemoryRouter>
    );

    //provide timeout
    await new Promise(resolve => setTimeout(resolve, 1000));
    //hamburger icon should be present on the screen and cross icon shouldnt be on the screen
    expect(queryByRole('hamburger')).toBeInTheDocument();
    expect(queryByRole('cross')).not.toBeInTheDocument()

    //checks that the side menu div isnt active 
    expect(getByRole("navigation").children[1]).not.toHaveClass("active")

    //click on the hamburger icon to view cross icon
    fireEvent.click(getByRole('hamburger'));

    //checks that the side menu div is active 
    expect(getByRole("navigation").children[1]).toHaveClass("active")

    //cross icon should appear and hamburger should disappear
    expect(queryByRole('cross')).toBeInTheDocument()
    expect(queryByRole('hamburger')).not.toBeInTheDocument()
  });

  //Castrol Icon link check
  it('Checks if castrol icon link leads to home page', () => {//castrol icon link should lead to the home page

    const { getByAltText } = render(
      <MemoryRouter initialEntries={['/login']}>
        <AuthContext.Provider value={mockAuthContextValue1}>
          <Navbar />
        </AuthContext.Provider>
      </MemoryRouter>
    );

    //hamburger icon should appear on the screen
    const castrolIcon = getByAltText('Logo');

    //click on the icon
    fireEvent.click(castrolIcon);

    //check the location to be home page
    expect(window.location.href).toBe("http://localhost/");
  });

  //Links and buttons check
  it("Check the login and signup buttons and links",()=>{//checks all buttons and links
    const { getByRole } = render(
      <MemoryRouter initialEntries={['/']}>
        <AuthContext.Provider value={mockAuthContextValue1}>
          <Navbar />
        </AuthContext.Provider>
      </MemoryRouter>
    );

    //fetch options
    const AppBtn =  getByRole('link', { name: 'Applications' });
    const ProfileBtn = getByRole('link', { name: 'Profile' })
    const LogoutBtn = getByRole('link', { name: 'Logout' })

    //check links
    expect(AppBtn).toHaveAttribute("href", "/upload")
    expect(ProfileBtn).toHaveAttribute("href", "/profile")
    expect(LogoutBtn).toHaveAttribute("href", "/logout")
  })
});
