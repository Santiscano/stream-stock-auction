import { lazy } from 'react';

import { Navigate, Outlet, useRoutes } from 'react-router-dom';

import WithoutAuthentication from '../middlewares/WithoutAuthentication';
import WithAuthentication from '../middlewares/WithAuthentication';

// *Auth
export const LoginPage = lazy(() => import('../modules/Auth/pages/Login'));
export const SignUpPage = lazy(() => import('../modules/Auth/pages/SignUp'));
export const ForgotPasswordPage = lazy(() => import('../modules/Auth/pages/ForgotPassword'));
export const NewPasswordPage = lazy(() => import('../modules/Auth/pages/NewPassword'));

// *pages
export const ServerErrorPage = lazy(() => import('../modules/StatusCodes/pages/ServerError'));
export const NotFoundPage = lazy(() => import('../modules/StatusCodes/pages/NotFound'));

const objWithRoutes = () => {
  const routes = useRoutes([
    {
      element: <WithoutAuthentication/>,
      children: [
        { index: true, element: <LoginPage/> },
        { path: 'sign-in', element: <LoginPage/> },
        { path: 'sign-up', element: <SignUpPage/> },
        { path: 'forgot-password', element: <ForgotPasswordPage/> },
      ],
    },
    {
      element: <WithAuthentication/>,
      children: [
        {
          path: 'dashboard',
          element: (
            <div>
              <Outlet/>
            </div>
          ),
          children: [
            { path: 'home', element: null },
            { path: 'profile', element: null },
          ],
        },
      ],
    },
    {
      path:'500',
      element: <ServerErrorPage/>,
    },
    {
      path: '404',
      element: <NotFoundPage/>,
    },
    {
      path: '*',
      element: <Navigate to='404' replace/>
    }
  ]);
  return routes;
}

export default objWithRoutes
