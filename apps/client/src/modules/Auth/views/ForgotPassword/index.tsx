
import LoadingButton from '@mui/lab/LoadingButton';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

import { useRouter } from '../../../../hooks/routes/useRouter';
import useForgotPassword from './hook/useForgotPassword';
import AuthContainerLayout from '../../layout/AuthContainer';

const NewPasswordView = () => {
  const { handleForgotPassword, loading, SnackbarAlert } = useForgotPassword();
  const { handleNavigate } = useRouter();

  const renderSubtitle = (
    <Typography variant="body2">
      Ingresa tu correo electronico.
    </Typography>
  );

  return (
    <AuthContainerLayout
      title='Restablecer Contraseña'
      subtitle={renderSubtitle}
    >
      <form onSubmit={handleForgotPassword}>
        <Stack spacing={3} sx={{ my: 3 }}>
          <TextField 
            name="email"
            label="Correo electronico" 
            required
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

      {/* alerta */}
      <SnackbarAlert />
    </AuthContainerLayout>
  )
}

export default NewPasswordView
