import { FormEvent, useState } from 'react';

import axios from 'axios';

import useSnackbarGlobal from '../../../../../hooks/useSnackbar';
import { useRouter } from '../../../../../hooks/routes/useRouter';
import { URL_API } from '../../../../../config/environments';
import { getHeader, set, setToken } from '../../../../../components/config/SessionSettings';

const useLogin = () => {
  const { handleNavigate } = useRouter();
  const { showSnackbar, SnackbarAlert } = useSnackbarGlobal();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async(event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    try {
      // @ts-ignore
      const form = new FormData(event.target);
      form.append('method', 'email');

      const getUser = await axios.post(`${URL_API}/api/auth/signin`, 
        {
          email: form.get('email'),
          password: form.get('password')
        }, 
        getHeader()
      );
      // actions login...
      if (getUser.status === 201 && getUser.data.token) {
        showSnackbar({ message: 'Inicio de sesión exitoso', severity: 'success' });
        setToken(getUser.data.token);
        set('idroles', JSON.stringify(getUser.data.role));
        set('fullName', getUser.data.fullName);
        handleNavigate("/dashboard/home");
      } else {
        showSnackbar({ message: getUser.data.message, severity: 'error' });
      }

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
        showSnackbar({ message: 'Correo o contraseña incorrectos', severity: 'error' });
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
    handleNavigate,
    handleLogin,
    showPassword,
    setShowPassword,
    loading,
    SnackbarAlert,
  }
}

export default useLogin
