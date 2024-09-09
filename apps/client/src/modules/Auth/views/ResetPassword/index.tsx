import LoadingButton from '@mui/lab/LoadingButton';
import Stack from '@mui/material/Stack';
import Link from '@mui/material/Link';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';

import { useRouter } from '../../../../hooks/routes/useRouter';
import AuthContainerLayout from '../../layout/AuthContainer';
import useResetPassword from './hook/useResetPassword';
import Iconify from '../../../../components/common/Iconify';

const ResetPassword = () => {
  const { 
    handleRestartPassword, showPassword, 
    setShowPassword, loading, SnackbarAlert 
  } = useResetPassword();
  const { handleNavigate } = useRouter();


  const renderSubtitle = (
    <Typography variant="body2">
      Ingresa tu nueva contraseña para Continuar.
    </Typography>
  );

  return (
    <AuthContainerLayout
      title='Restablecer Contraseña'
      subtitle={renderSubtitle}
    >
      <form onSubmit={handleRestartPassword}>
        <Stack spacing={3} sx={{ my: 3 }}>
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
            onClick={() => handleNavigate("/")}
          >
            Regresar al inicio de sesión.
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
          Recuperar
        </LoadingButton>
      </form>
      <SnackbarAlert />
    </AuthContainerLayout>
  )
}

export default ResetPassword
