import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { useEffect, useState } from 'react';

export type Severity = 'error' | 'warning' | 'info' | 'success';

interface SnackbarProps {
  message: string;
  severity: Severity;
}

const useSnackbarGlobal = () => {
  const [snackbarData, setSnackbarData] = useState<SnackbarProps | null>(null);

  const handleClose = () => {
    setSnackbarData(null);
  };

  useEffect(() => {
    if (snackbarData) {
      const timer = setTimeout(() => {
        handleClose();
      }, 6000);

      return () => clearTimeout(timer);
    }
  }, [snackbarData]);

  const SnackbarAlert = () => (
    <Snackbar open={!!snackbarData} autoHideDuration={6000} onClose={handleClose}>
      <Alert severity={snackbarData?.severity} onClose={handleClose} variant="filled" sx={{ width: '100%' }}>
        {snackbarData?.message}
      </Alert>
    </Snackbar>
  );

  const showSnackbar = ({ message, severity }: SnackbarProps) => {
    setSnackbarData({ message, severity });
  };

  return { SnackbarAlert, showSnackbar };
};

export default useSnackbarGlobal;
