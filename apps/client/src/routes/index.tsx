import { lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import WithoutAuthentication from '../middlewares/WithoutAuthentication';
import WithAuthentication from '../middlewares/WithAuthentication';
// import DashboardLayout from '../layout/dashboard';

// *Test
export const TestPage = lazy(() => import('../modules/TestView/pages/Test'));

// *pages
export const ServerErrorPage = lazy(() => import('../modules/StatusCodes/pages/ServerError'));
export const NotFoundPage = lazy(() => import('../modules/StatusCodes/pages/NotFound'));

// *Auth
export const SignUpPage = lazy(() => import('../modules/Auth/pages/SignUp'));
export const LoginPage = lazy(() => import('../modules/Auth/pages/Login'));
export const ForgotPasswordPage = lazy(() => import('../modules/Auth/pages/ForgotPassword'));
export const ResetPasswordPage = lazy(() => import('../modules/Auth/pages/ResetPassword'));

// *Dashboard
export const DashboardLayout = lazy(() => import('../modules/Dashboard/layout'));
export const HomePage = lazy(() => import('../modules/Dashboard/modules/Home/pages/Home'));
export const ComponentsPage = lazy(() => import('../modules/Dashboard/modules/Dev/pages/Components'));
// import DashboardLayout from


// export const HomePage = lazy(() => import('../pages/Home'));
// export const TestMeeting = lazy(() => import('../pages/Meetings/TestMeeting'));
// export const NotFoundPage = lazy(() => import('../pages/NotFound'));

// faltan por lazy loading
// import MeetingPage from '../pages/Meetings/Meeting';

// import HomeMeetingPage from '../pages/Meetings/HomeMeeting';
// import PersonalRoomPage from '../pages/Meetings/PersonalRoom';
// import PreviousPage from '../pages/Meetings/Previuos';
// import RecordingPage from '../pages/Meetings/Recording';
// import UpcomingPage from '../pages/Meetings/Upcoming';

// sin usar
// import LoginPage from '../pages/Login';
// import NewPasswordPage from '../pages/NewPassword';
// import ForgotPasswordPage from '../pages/ForgotPassword';
// import ServerErrorPage from '../pages/ServerError';
// import TestPage from '../pages/Test';
// import { WithRoleAllowedComponent } from '../middlewares/WithRoleAllowed';
// import ComponentsPage from '../pages/Components';


const AllRouters = () => {
  return (
    <Routes>

    {/* test drawer */}
    <Route path='test' element={ <TestPage/> } />

    {/* not protected */}
    <Route element={ <WithoutAuthentication/> }>
      <Route index element={ <LoginPage/> }/>
      <Route path='sign-up' element={ <SignUpPage/> }/>
      <Route path='sign-in' element={ <LoginPage/> }/>
      <Route path='forgot-password' element={ <ForgotPasswordPage/> }/>
      <Route path='reset-password' element={ <ResetPasswordPage/> } />
    </Route>

    <Route element={ <WithAuthentication/> }>
      <Route path='dashboard' element={ <DashboardLayout/> }>
        <Route path='home' element={ <HomePage/> }/>
        <Route path='components' element={ <ComponentsPage/>} />



        <Route path='home-2' element={ <TestPage/> }/>
        <Route path='collapsed/test' element={ <TestPage/> }/>
        <Route path='collapsed/test2' element={ <TestPage/> }/>
        <Route path='collapsed-2/test3' element={ <TestPage/> }/>
        <Route path='collapsed-2/test4' element={ <TestPage/> }/>
      </Route>
    </Route>

    <Route path='401' element={ <h4>Unauthorized 401 falta token</h4> }/>
    <Route path='404' element={ <NotFoundPage/> }/>
    <Route path='500' element={ <ServerErrorPage/> }/>
    <Route path='*' element={<Navigate to='404' replace/>}/>

    </Routes>
  )
}

export default AllRouters
