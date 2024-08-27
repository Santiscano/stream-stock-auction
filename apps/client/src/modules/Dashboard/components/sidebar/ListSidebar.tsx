import { FC } from 'react';
import { Typography, useTheme } from '@mui/material';

import { CollapsibledItemsList, ItemsList } from '../ItemsList';
import { useLayoutContext } from '../../../../context/LayoutContext';
import { useMode } from '../../../../theme/useModeTheme';
import { CONFIG_SIDEBAR } from '../../config/configSidebar';

const ListSidebarAllowed = () => {
  const { openSidebar } = useLayoutContext();

  return (
    <>
      {CONFIG_SIDEBAR.map((item, index) => (
        <div key={index}>
          {(openSidebar && item.isPublic) && (<TitleSection title={item.title}/>)}
          {item.section.map((section, secIndex) => (
            <div key={secIndex}>
              {section.collapsed.length > 0 ? 
                (<>
                  <CollapsibledItemsList
                    section={section.collapsed[0].section}
                    iconSection={section.collapsed[0].iconSection}
                    data={section.data_config}
                    path={section.path}
                    isPublic={item.isPublic}
                  />
                </>) : 
                (<>
                  <ItemsList
                    data={section.data_config}
                    path={section.path}
                    isPublic={item.isPublic}
                    allowedRoles={section.allowedRoles}
                  />
                </>)
              }
            </div>
          ))}
        </div>
      ))}
    </>
  )
}

export default ListSidebarAllowed;

interface TitleSectionProps {
  title: string;
};
const TitleSection: FC<TitleSectionProps> = ({ title }) => {
  const theme = useTheme();
  const { mode } = useMode();

  return (
    <Typography
      variant='body2'
      color={theme.palette.text.disabled}
      sx={{
        paddingX: "16px",
        "&:hover": {
          color: mode === "light" ? theme.palette.common.black : theme.palette.common.white,
        }
      }
      }
    >
      {title}
    </Typography>
  )
}
