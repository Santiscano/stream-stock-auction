
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import { useEffect, useState } from 'react';
import { get } from '../../../../../components/config/SessionSettings';


const HomeView = () => {
  const [name, setName] = useState<string>('')
  
  useEffect(() => {
    setName(get('fullName') as string)
  },[])

  return (
    <Container maxWidth="xl">
      <Typography variant="h4" sx={{ mb: 5 }}>
        Hola, Bienvenido de nuevo: {name} 👋
      </Typography>

      <Grid container spacing={3}>

      </Grid>
    </Container>
  )
}

export default HomeView
