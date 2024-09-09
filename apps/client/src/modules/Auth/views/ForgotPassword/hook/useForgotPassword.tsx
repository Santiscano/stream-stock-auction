import { FormEvent, useState } from 'react';

import { getHeader } from '../../../../../components/config/SessionSettings';
import axios from 'axios';
import { URL_API } from '../../../../../config/environments';
import useSnackbarGlobal from '../../../../../hooks/useSnackbar';


const useForgotPassword = () => {
  const { showSnackbar, SnackbarAlert } = useSnackbarGlobal();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);


  const handleForgotPassword = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      // @ts-ignore
      const form = new FormData(e.target);

      const sendEmail = await axios.post(`
        ${URL_API}/api/auth/forgot-password`,
        form,
        getHeader()
      );
      showSnackbar({ message: sendEmail.data.message, severity: 'success' });
    } catch (error) {
      console.log('error: ', error);
      // @ts-ignore
      const statusCode = error?.response?.status;
      // @ts-ignore
      const msgs = error.response.data.message;
      if (statusCode == 400) {
        if (msgs) {
          showSnackbar({ message: msgs.join(',\n'), severity: 'error' });
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

  }

  return {
    showPassword,
    setShowPassword,
    loading,
    handleForgotPassword,
    SnackbarAlert,
  }
}

export default useForgotPassword
