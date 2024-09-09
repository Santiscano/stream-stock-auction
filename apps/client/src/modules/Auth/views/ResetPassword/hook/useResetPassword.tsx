import { FormEvent, useState } from 'react'
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

import { URL_API } from '../../../../../config/environments';
import useSnackbarGlobal from '../../../../../hooks/useSnackbar';

const useResetPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const location = useLocation();
  const { showSnackbar, SnackbarAlert } = useSnackbarGlobal();

  const handleRestartPassword = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    try {
      const queryParams = new URLSearchParams(location.search);
      const token = queryParams.get('token');

      // @ts-ignore
      const form = new FormData(event.target);

      if (!token) {
        showSnackbar({ message: 'No tienes los permisos para este proceso', severity: 'error' });
        return;
      }
      // @ts-ignore
      const { email } = jwtDecode(token);

      const saveNewPassword = await axios.post(`${URL_API}/api/auth/reset-password`,
        {
          email,
          newPassword: form.get('password'),
        },
        {
          headers: {
            "Content-Type": "application/json",
            api_key: import.meta.env.VITE_API_KEY,
            Authorization: `Bearer ${token}`,
          }
        }
      );
      showSnackbar({ message: saveNewPassword.data.message, severity: 'success' });
    } catch (error) {
      console.log('error: ', error);
      // @ts-ignore
      const statusCode = error?.response?.status;
      // @ts-ignore
      const msgs = error.response.data.message;
      if(statusCode == 400) {
        if (msgs) {
          showSnackbar({ message: msgs.join(',\n'), severity: 'error' });
        }
        return;
      }
      if(statusCode == 401) {
        showSnackbar({ message: 'No tienes permisos para realizar este proceso o el tiempo limite de recuperacion termino', severity: 'error' });
        return;
      }
      showSnackbar({ 
        message: 'Error en el servidor contacta con un administrador para solucionar el error', 
        severity: 'error' 
      });
    } finally {
      setLoading(false);
    }
  };
  
  return {
    handleRestartPassword,
    showPassword,
    setShowPassword,
    loading,
    SnackbarAlert,
  }
}

export default useResetPassword
