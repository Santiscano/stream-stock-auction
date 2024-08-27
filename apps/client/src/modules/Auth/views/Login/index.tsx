import { FormEvent, useState } from 'react';

import LoadingButton from '@mui/lab/LoadingButton';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import axios from 'axios';

import Iconify from '../../../../components/common/Iconify';
import { getHeaderMultipart, setToken, set } from '../../../../components/config/SessionSettings';
import { useRouter } from '../../../../hooks/routes/useRouter';
import useSnackbarGlobal from '../../../../hooks/useSnackbar';
import { URL_API } from '../../../../config/environments';

import AuthContainerLayout from '../../layout/AuthContainer';

const LoginView = () => {
  const router = useRouter();
  const { SnackbarAlert, showSnackbar } = useSnackbarGlobal();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleNavigate = (route: string) => {
    router.navigate(route);
  };

  const handleLogin = async(event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    try {
      // @ts-ignore
      const form = new FormData(event.target);
      form.append('method', 'email');
  
      const getToken = await axios.post(`${URL_API}/api/v1/auth/signin`, 
        form, getHeaderMultipart() 
      );
      console.log('res', getToken);
      // actions login...
      if (getToken.status === 200 && getToken.data.data.token) {
        showSnackbar({ message: 'Inicio de sesión exitoso', severity: 'success' });
        setToken(getToken.data.data.token);
        set('idroles', getToken.data.data.user.idroles);
        set('fullName', getToken.data.data.user.fullName);
        handleNavigate("/dashboard/home");
      } else {
        showSnackbar({ message: getToken.data.message, severity: 'error' });
      }

    } catch (error) {
      console.log('error: ', error);
      showSnackbar({ message: 'Error en el servidor al iniciar sesión', severity: 'error' });
    } finally {
      setLoading(false);
    }

  };

  const renderSubtitle = (
    <Typography variant="body2">
      Aun no tienes cuenta?
      <Link
        variant="subtitle2"
        sx={{ ml: 0.5, cursor: "pointer" }}
        onClick={() => handleNavigate("/sign-up")}
      >
        Registrate aquí
      </Link>
    </Typography>
  );

  return (
    <AuthContainerLayout
      title='Ingresa Stream Auction 🚀'
      subtitle={renderSubtitle}
    >
      <form onSubmit={handleLogin}>
        <Stack spacing={3}>
          <TextField 
            name="email" 
            label="Correo electronico" 
            // value={data.email} 
            // onChange={e => handleEmail(e.target.value)} 
          />

          <TextField
            name="password"
            label="Contraseña"
            type={showPassword ? 'text' : 'password'}
            // value={data.password}
            // onChange={e => handlePassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                    <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Stack>

        <Stack direction="row" alignItems="center" justifyContent="flex-end" sx={{ my: 3, cursor: "pointer" }}>
          <Link
            variant="subtitle2"
            underline="hover"
            onClick={() => handleNavigate("/forgot-password")}
          >
            Olvido Tu Contraseña?
          </Link>
        </Stack>

        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          color="primary"
          loading={loading}
          // onClick={handleLogin}
        >
          Ingresar
        </LoadingButton>
      </form>

      {/* alerta */}
      <SnackbarAlert />
    </AuthContainerLayout>
  )
}

export default LoginView
