import { Navbar } from "./components/NavbarComponent/Navbar";
import { FooterWithLogo } from "./components/FooterComponent/Footer";
import { ApplicationUpload } from "./views/ApplicationUploadPage/ApplicationUpload";
import "./App.css";
import { LoginPage } from "./views/LoginPage/LoginPage";
import { SignupPage } from "./views/SignupPage/SignupPage";
import { Alert } from "./components/AlertComponent/Alert";
import AlertContext, { AlertContextProps } from "./contexts/AlertContext";
import { useContext } from "react";
import RequireAuth from "./components/RequireAuthComponent/RequireAuth";
import { Routes, Route } from "react-router-dom";
import HomePage from "./views/HomePage/HomePage";
import LogoutPage from "./views/LogoutPage/LogoutPage";
import { ProfilePage } from "./views/ProfilePage/ProfilePage";


function App() {
  const { alert } = useContext(AlertContext) as AlertContextProps;

  return (
    <>
      {alert && <Alert message={alert.message} type={alert.type} />}
      <Navbar />
      <div className="appContainer">
        <div className="contentContainer">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/login"
              element={
                <RequireAuth requireAuth={false}>
                  <LoginPage />
                </RequireAuth>
              }
            />
            <Route
              path="/signup"
              element={
                <RequireAuth requireAuth={false}>
                  <SignupPage />
                </RequireAuth>
              }
            />
            <Route
              path="/upload"
              element={
                <RequireAuth>
                  <ApplicationUpload />
                </RequireAuth>
              }
            />
            <Route
              path="/profile"
              element={
                <RequireAuth>
                  <ProfilePage />
                </RequireAuth>
              }
            />
            <Route
              path="/logout"
              element={
                <RequireAuth>
                  <LogoutPage />
                </RequireAuth>
              }
            />
          </Routes>
        </div>
        <FooterWithLogo />
      </div>
    </>
  );
}

export default App;
