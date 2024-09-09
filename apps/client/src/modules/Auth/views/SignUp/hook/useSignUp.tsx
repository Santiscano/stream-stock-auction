import { FormEvent, useState } from 'react';
import axios from 'axios';

import { getHeader } from '../../../../../components/config/SessionSettings';
import { URL_API } from '../../../../../config/environments';
import useSnackbarGlobal from '../../../../../hooks/useSnackbar';

const useSignUp = () => {
  const { showSnackbar, SnackbarAlert } = useSnackbarGlobal();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSignUp = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      // @ts-ignore
      const form = new FormData(e.target);

      const signUpUser = await axios.post(
        `${URL_API}/api/auth/signup`,
        {
          email: form.get('email'),
          password: form.get('password'),
          role: 4,
          fullName: form.get('fullName'),
        },
        getHeader()
      );
      showSnackbar({ message: signUpUser.data.message, severity: 'success' });
    } catch (error) {
      console.log('error: ', error);
      // @ts-ignore
      const statusCode = error?.response?.status;
      // @ts-ignore
      const msgs = error.response.data.message;
      if (statusCode == 400) {
        if (msgs && Array.isArray(msgs)) {
          showSnackbar({ message: msgs.join(',\n'), severity: 'error' });
        }
        if (msgs && !Array.isArray(msgs)) {
          showSnackbar({ message: msgs, severity: 'error' });
        }
        return;
      }
      if (statusCode == 500) {
        showSnackbar({ message: msgs, severity: 'error' });
        return;
      }
    } finally {
      setLoading(false);
    }
  };
  
  return {
    showPassword, 
    setShowPassword, 
    loading, 
    handleSignUp, 
    SnackbarAlert
  }
}

export default useSignUp
