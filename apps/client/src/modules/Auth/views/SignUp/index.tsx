import LoadingButton from '@mui/lab/LoadingButton';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import Iconify from '../../../../components/common/Iconify';
import { useRouter } from '../../../../hooks/routes/useRouter';
import AuthContainerLayout from '../../layout/AuthContainer';
import useSignUp from './hook/useSignUp';


const SignUpView = () => {
  const { handleNavigate } = useRouter();
  const { showPassword, setShowPassword, loading, handleSignUp, SnackbarAlert } = useSignUp();


  const renderSubtitle = (
    <Typography variant="body2">
      Ya tienes cuenta?
      <Link
        variant="subtitle2"
        sx={{ ml: 0.5, cursor: "pointer" }}
        onClick={() => handleNavigate("/sign-in")}
      >
        Ingresa aquí
      </Link>
    </Typography>
  );
  return (
    <AuthContainerLayout
      title='Registrarse en Integrator 🚀🔭'
      subtitle={renderSubtitle}
    >
      <form onSubmit={handleSignUp}>
        <Stack spacing={3} sx={{ my: 3 }}>
          <TextField 
            name="fullName" 
            label="Nombre Completo"
          />

          <TextField 
            name="email" 
            label="Correo electronico" 
          />

          <TextField
            name="password"
            label="Contraseña"
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

        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          color="primary"
          loading={loading}
        >
          Registrarse
        </LoadingButton>
      </form>

      <SnackbarAlert />
    </AuthContainerLayout>
  )
}

export default SignUpView
