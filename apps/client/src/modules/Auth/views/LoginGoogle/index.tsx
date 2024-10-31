import { useEffect } from 'react'
import { set, setToken } from '../../../../components/config/SessionSettings';

const LoginGoogle = () => {

  const handleLoginGoogle = () => {
    // tomar el token de los parametros y guardarlo en sessionstorage esto con react-router-dom
    const token = new URLSearchParams(window.location.search).get('token');
    setToken(token!);
    set('idroles', JSON.stringify([1]));
    set('fullName', 'Usuario');
  };

  useEffect(() => {
    handleLoginGoogle()
  })
  return (
    <div>
      
    </div>
  )
}

export default LoginGoogle
