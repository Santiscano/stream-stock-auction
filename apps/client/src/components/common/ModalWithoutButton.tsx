import { FC, ReactElement, ReactNode, Ref, forwardRef } from 'react';


import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: ReactElement<any, any>;
  },
  ref: Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface ModalWithoutButtonProps {
  title: string;
  children: ReactNode;
  actionsButtons?: { text: string, onClick: () => void }[];
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

/**
 * ModalWithoutButton component displays a modal dialog without any buttons.
 * 
 * @component
 * @param {object} props - The component props.
 * @param {string} props.title - The title of the modal dialog.
 * @param {ReactNode} props.children - The content of the modal dialog.
 * @param {Array<{ text: string, onClick: () => void }>} [props.actionsButtons] - The array of action buttons to be displayed in the modal dialog.
 * @param {boolean} props.isOpen - Determines whether the modal dialog is open or closed.
 * @param {function} props.setIsOpen - A function to set the state of the modal dialog's open or closed status.
 * @returns {ReactElement} The rendered ModalWithoutButton component.
 * 
 * @example
 * // Example of how to use the ModalWithoutButton component
 * import { ModalWithoutButton } from 'components/common/ModalWithoutButton';
    
    const [isOpen, setIsOpen] = useState(false);
    const handleOpen = () => setIsOpen(true);

    <ModalWithoutButton
      title="title Modal"
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      actionsButtons={[
        ...actionsButtons??[],
        {text: 'Cerrar', onClick: () => setIsOpen(false)}
      ]}
    >
      <h3>contenido del modal</h3>
    </ModalWithoutButton>
 */
const ModalWithoutButton: FC<ModalWithoutButtonProps> = ({ title, children, actionsButtons, isOpen, setIsOpen }) => {

  const handleClose = () => setIsOpen(false);

  const handleActionClick = (onClick: () => void) => {
    onClick();
    handleClose();
  };

  return (
    <>
      <Dialog
        open={isOpen}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {children}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {actionsButtons?.map((action, index) => (
            <Button 
              key={index} 
              onClick={() => handleActionClick(action.onClick)}
            >
              {action.text}
            </Button>
          ))}
        </DialogActions>
      </Dialog>
    </>
  )
}
export default ModalWithoutButton
