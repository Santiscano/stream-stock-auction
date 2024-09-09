import LoadingButton from '@mui/lab/LoadingButton';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import Iconify from '../../../../components/common/Iconify';
import AuthContainerLayout from '../../layout/AuthContainer';
import useLogin from './hook/useLogin';

const LoginView = () => {
  const { handleLogin, handleNavigate, loading, showPassword, setShowPassword, SnackbarAlert } = useLogin();

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
            required
          />

          <TextField
            name="password"
            label="Contraseña"
            required
            type={showPassword ? 'text' : 'password'}
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
