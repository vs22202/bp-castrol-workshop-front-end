import { lazy, Suspense,useEffect,useState } from "react";
import { Navbar } from "./components/NavbarComponent/Navbar";
import { FooterWithLogo } from "./components/FooterComponent/Footer";
import "./App.css";
import { Alert } from "./components/AlertComponent/Alert";
import AlertContext, { AlertContextProps } from "./contexts/AlertContext";
import { useContext } from "react";
import RequireAuth from "./components/RequireAuthComponent/RequireAuth";
import { Routes, Route } from "react-router-dom";

//lazy loading the pages
const HomePage = lazy(() => import("./views/HomePage/HomePage"));
const LoginPage = lazy(() => import("./views/LoginPage/LoginPage"));
const SignupPage = lazy(() => import("./views/SignupPage/SignupPage"));
const ResetPasswordPage = lazy(
  () => import("./views/ResetPasswordPage/ResetPasswordPage")
);
const LogoutPage = lazy(() => import("./views/LogoutPage/LogoutPage"));
const ApplicationUpload = lazy(
  () => import("./views/ApplicationUploadPage/ApplicationUpload")
);
const ProfilePage = lazy(() => import("./views/ProfilePage/ProfilePage"));
const PageNotFound = lazy(() => import("./views/PageNotFound/PageNotFound"));

function App() {
  const { alert, sendAlert } = useContext(AlertContext) as AlertContextProps;
  const [retry,setRetry] = useState(0)
  useEffect(()=>{
    const checkBackendStatus = async () => {
      try{
      const result = await fetch(
        `${
          process.env.VITE_BACKEND_URL || "http://localhost:3000"
        }/dbConnStatus`,
      );
      const res = await result.json();
      return res;
      } catch (err) {
        console.log('Backend server is starting')
        return { output: "fail" };
      }
    }
    checkBackendStatus().then((res) => {
      if (res.output == "fail") {
        console.log(retry);
        if (retry > 10) {
          sendAlert({ message: "Backend services are down, please contact admin.", type: "error" })
          return;
        }
        sendAlert({message:"Backend services are still booting please wait.",type:"error"})
        setTimeout(() => {
          setRetry(s=>s+1);
        },30000)
      }
      else{
        console.log("Backend services are up.")
        sendAlert({ message: "Backend services are up.", type: "success" })
      }
    })
  },[retry])
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
                  <Suspense fallback={<>...</>}>
                    <LoginPage />
                  </Suspense>
                </RequireAuth>
              }
            />
            <Route
              path="/resetpassword"
              element={
                <RequireAuth requireAuth={false}>
                  <Suspense fallback={<>...</>}>
                    <ResetPasswordPage />
                  </Suspense>
                </RequireAuth>
              }
            />
            <Route
              path="/signup"
              element={
                <RequireAuth requireAuth={false}>
                  <Suspense fallback={<>...</>}>
                    <SignupPage />
                  </Suspense>
                </RequireAuth>
              }
            />
            <Route
              path="/upload"
              element={
                <RequireAuth>
                  <Suspense fallback={<>...</>}>
                    <ApplicationUpload />
                  </Suspense>
                </RequireAuth>
              }
            />
            <Route
              path="/profile"
              element={
                <RequireAuth>
                  <Suspense fallback={<>...</>}>
                    <ProfilePage />
                  </Suspense>
                </RequireAuth>
              }
            />
            <Route
              path="/logout"
              element={
                <RequireAuth>
                  <Suspense fallback={<>...</>}>
                    <LogoutPage />
                  </Suspense>
                </RequireAuth>
              }
            />
            <Route
              path="*"
              element={
                <Suspense fallback={<>...</>}>
                  <PageNotFound />
                </Suspense>
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
