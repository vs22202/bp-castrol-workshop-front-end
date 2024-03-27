import  { useEffect } from 'react';
import { useContext } from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import AlertContext, { AlertContextProps } from '../../contexts/AlertContext';
import AuthContext, { AuthContextProps } from '../../contexts/AuthContext';

export default function RequireAuth({
  children,
  requireAuth = true,
}: {
  children: JSX.Element;
  requireAuth?: boolean;
}) {
  const { currentUser } = useContext(AuthContext) as AuthContextProps;
  const { sendAlert } = useContext(AlertContext) as AlertContextProps;
  const location = useLocation();

  useEffect(() => {
    if (requireAuth && !currentUser) {
      sendAlert({
        message: 'You need to login before you apply',
        type: 'error',
      });
    }
  }, [currentUser, requireAuth, sendAlert]);

  useEffect(() => {
    const navigateTo = (path: string) => {
      return <Navigate to={path} state={{ from: location }} replace />;
    };

    if (requireAuth && !currentUser) {
      navigateTo('/login');
    } else if (!requireAuth && currentUser) {
      navigateTo('/');
    }
  }, [currentUser, requireAuth, location]);

  return children;
}
