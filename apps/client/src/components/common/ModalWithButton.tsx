import { FC, ReactElement, ReactNode, Ref, forwardRef, useState } from 'react';

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

interface ModalWithButtonProps {
  icon?: ReactNode;
  textButton?: string;
  title: string;
  children: ReactNode;
  actionsButtons?: { text: string, onClick: () => void }[];
}


/**
 * A modal component with a button trigger.
 *
 * @component
 * @param {object} props - The component props.
 * @param {ReactNode} [props.icon] - The icon to display on the button.
 * @param {string} [props.textButton] - The text to display on the button.
 * @param {string} props.title - The title of the modal.
 * @param {ReactNode} props.children - The content of the modal.
 * @param {Array<{ text: string, onClick: () => void }>} [props.actionsButtons] - The array of action buttons to display at the bottom of the modal.
 * @returns {ReactElement} The rendered ModalWithButton component.
 * 
 * @example
 * // Example of how to use the ModalWithButton component
 * import { ModalWithButton } from 'components/common/ModalWithButton';
 * <ModalWithButton 
        icon={<HiOutlinePlusSm />}
        textButton="abrir modal"
        title="Modal Title"
        actionsButtons={[
          { text: 'Disagree', onClick: () => console.log('Disagree') },
          { text: 'Agree', onClick: () => console.log('Agree') },
        ]}
      >
        <Typography>Let's Google help apps determine location. This means sending anonymous location data to Google, even when no apps are running.</Typography>
      </ModalWithButton>
 * 
 */
const ModalWithButton: FC<ModalWithButtonProps> = ({ icon, textButton, title, children, actionsButtons }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  const handleActionClick = (onClick: () => void) => {
    onClick();
    handleClose();
  };


  return (
    <>
      <Button variant="text" startIcon={icon} onClick={handleOpen}>{textButton}</Button>
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
export default ModalWithButton
