import { FC, ReactNode, useState } from 'react';

import { Box, Button, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import ModalWithoutButton from './ModalWithoutButton';

interface CardWidgetActionProps {
  bgcolor?: string;
  text: string;
  subtext: string;
  icon: ReactNode;
  titleModal: string;
  contentModal: ReactNode;
  actionsButtons?: { text: string, onClick: () => void }[];
}

/**
 * A card component with an action button that triggers a modal.
 *
 * @param {string} [bgcolor] - The background color of the card.
 * @param {string} text - The main text content of the card.
 * @param {string} subtext - The subtext content of the card.
 * @param {ReactNode} icon - The icon component to be displayed in the action button.
 * @param {string} titleModal - The title of the modal.
 * @param {ReactNode} contentModal - The content of the modal.
 * @param {Array<{ text: string, onClick: () => void }>} [actionsButtons] - An array of buttons to be displayed in the modal.
 * @returns {JSX.Element} The rendered CardWidgetAction component.
 * 
 * @component
 * @example
 * // Usage:
 * import { CardWidgetAction } from 'components/common/CardWidgetAction';
 * <CardWidgetAction
 *   bgcolor="#F5F5F5"
 *   text="Card Title"
 *   subtext="Card Subtitle"
 *   icon={<IconComponent />}
 *   titleModal="Modal Title"
 *   contentModal={<ModalContent />}
 *   actionsButtons={[
 *     { text: "Button 1", onClick: handleButton1 },
 *     { text: "Button 2", onClick: handleButton2 },
 *   ]}
 * />
 */
const CardWidgetAction: FC<CardWidgetActionProps> = ({
  bgcolor,
  text,
  subtext,
  icon,
  // event,
  titleModal,
  contentModal,
  actionsButtons,
  ...other
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => setIsOpen(true);

  return (
    <Card
      component={Stack}
      spacing={2}
      direction={'column'}
      sx={{
        px: 3,
        py: 5,
        borderRadius: 2,
        bgcolor,
      }}
      {...other}
    >
      <Stack spacing={0.1}>
        <Button 
          variant='text' 
          color='inherit'  
          onClick={handleOpen}
          startIcon={icon}
          sx={{
            width: 64,
          height: 64,
          borderRadius: 1,
          bgcolor: 'rgba(255, 255, 255, 0.2)',
          color: 'white',
          cursor: 'pointer',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          }}
        ></Button>
        <ModalWithoutButton
          title={titleModal}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          actionsButtons={[
            {text: 'Cerrar', onClick: () => setIsOpen(false)},
            ...actionsButtons??[],
          ]}
        >
          {contentModal}
        </ModalWithoutButton>
        
        <Typography variant="h6" color='white'>
          {text}
        </Typography>
        <Typography variant='subtitle2' color='white'>
          {subtext}
        </Typography>
      </Stack>

    </Card>
  )
}

export default CardWidgetAction
