import { FC, MouseEvent, ReactNode, cloneElement, useState } from 'react';

import { Box, Collapse, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Popover, Typography, useTheme } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { HiOutlineChevronDown, HiOutlineChevronRight } from 'react-icons/hi';

import { session } from '../../../components/config/SessionSettings';
import { useLayoutContext } from '../../../context/LayoutContext';
import { usePathname } from '../../../hooks/routes/usePathName';
import { WithRoleAllowedRoutes } from '../../../middlewares/WithRoleAllowed';


const fontsizeText = ".8rem";
const fontsizeTextLight = ".6rem";
const widthIcon = 24;
const sxIconGlobal = { minWidth: 'auto', mr: 1, fontSize: widthIcon };

type dataType = {
  name: string;
  path: string;
  icon: ReactNode;
};
interface ItemsListProps {
  data: dataType[];
  path: string;
  isPublic?: boolean;
  allowedRoles?: number[];
};

/**
 *
 * @param data Array of objects with the following structure: { name: string, path: string, icon: JSX.Element }
 * @param isPublic If true, the list will be displayed without any restrictions
 * @param allowedRoles Array of roles that are allowed to see the list of items
 * @returns
 * @example
    <ItemsList
      data={[
        {
          name: 'example without',
          path: '/dashboard',
          icon: <HiOutlineChartBar/>
        },
        {
          name: 'example without 2',
          path: '/dashboard/test3',
          icon: <HiOutlineChartSquareBar  />
        }
      ]}
    />
 */
export const ItemsList: FC<ItemsListProps> = (
  { data, path, isPublic = true, allowedRoles = [] }
) => {
  const theme = useTheme();

  const textColorPrimary = theme.palette.primary.main;
  const textColorSecondary = theme.palette.text.secondary;
  const navigate = useNavigate();
  const handleRouteValidate = (url: string) => {
    if (session()) {
      navigate(`${url}`);
    } else {
      navigate("/401");
    }
  };

  const pathname = usePathname();
  const { openSidebar } = useLayoutContext();

  const renderList = (
    <List>
      {data.map((list) => {
        const parts = pathname.split('/');
        const active = list.path.replace('/', '') === parts[parts.length - 1];
        return (
          <ListItem key={list.name} disablePadding>
            <ListItemButton
              onClick={() => handleRouteValidate(`${path}${list.path}`)}
              sx={{
                minHeight: 44,
                borderRadius: 0.75,
                typography: 'caption',
                fontSize: fontsizeText,
                marginTop: "5px",
                color: 'text.secondary',
                textTransform: 'capitalize',
                fontWeight: 'fontWeightMedium',
                paddingX: 1,
                ...(active && {
                  color: 'primary.main',
                  fontWeight: 'fontWeightSemiBold',
                  bgcolor: () => alpha(textColorPrimary, 0.08),
                  '&:hover': {
                    bgcolor: () => alpha(textColorSecondary, 0.08),
                  },
                }),
                ...(!openSidebar && {
                  display: 'flex',
                  flexDirection: 'column',
                  padding: "1px",
                }),
              }}
            >
              <ListItemIcon sx={sxIconGlobal}>
                {/* @ts-ignore */}
                {cloneElement(list.icon, {
                  style: { color: active ? textColorPrimary : textColorSecondary }
                })}
              </ListItemIcon>
              <ListItemText>
                <Typography variant="subtitle2" sx={{ fontSize: openSidebar ? fontsizeText : fontsizeTextLight }}>
                  {list.name}
                </Typography>
              </ListItemText>
            </ListItemButton>
          </ListItem>
        )
      })}
    </List>
  );

  return (
    <>
      {isPublic ? (
        <>{renderList}</>
      ) : (
        <WithRoleAllowedRoutes allowedRolesList={allowedRoles}>
          {renderList}
        </WithRoleAllowedRoutes>
      )}
    </>
  )
};

// *============================== Collapsed *============================== //
interface CollapsabledItemsListProps {
  section: string;
  iconSection: JSX.Element;
  data: dataType[];
  path: string;
  isPublic?: boolean;
};

/**
 * Function to display a list of items with a collapsible section and a list of items
 * @param open If true, the list of items will be displayed
 * @param handleOpen Function to open the list of items
 * @param section Title of the section to be displayed
 * @param iconSection Icon to be displayed next to the section title (section)
 * @param data Array of objects with the following structure: { name: string, path: string, icon: JSX.Element }
 * @param isPublic If true, the list will be displayed without any restrictions
 * @returns 
 * @example
 * <CollapsibledItemsList
      open={false}
      handleOpen={() => setOpen(prev => !prev)}
      data={[
        {
          name: 'example-config',
          path: '/dashboard/test',
          icon: <HiOutlineBeaker />
        },
        {
          name: 'example-two',
          path: '/dashboard/test2',
          icon: <HiOutlineBookOpen />
        }
      ]}
 * />
 */
export const CollapsibledItemsList: FC<CollapsabledItemsListProps> = (
  { section, iconSection, data, path, isPublic = true }
) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(prev => !prev);

  const theme = useTheme();
  const textColorPrimary = theme.palette.primary.main;
  const textColorSecondary = theme.palette.text.secondary;
  const sxIcon = { ...(sxIconGlobal), color: textColorSecondary };
  const sxText = { color: textColorSecondary };

  const navigate = useNavigate();
  const handleRouteValidate = (url: string) => {
    if (session()) {
      navigate(`${url}`);
    } else {
      navigate("/401");
    }
  };

  const pathname = usePathname();
  const { openSidebar } = useLayoutContext();

  const pathnameParts = pathname.split('/');
  const pathParts = path.split('/');
  const isActive = pathParts.every((part, index) => part === pathnameParts[index]);

  // *popover
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handlePopoverOpen = (e: MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
  }
  const handlePopoverClose = () => {
    setAnchorEl(null)
  };

  const openPopover = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  // *popover


  // *================= renders =================* //
  const renderData = (
    <>
      {data.map((list) => {
        const parts = pathname.split('/');
        const active = list.path.replace('/', '') === parts[parts.length - 1];
        return (
          <ListItem key={list.name} disablePadding>
            <ListItemButton
              onClick={() => handleRouteValidate(`${path}${list.path}`)}
              sx={{
                ml: openSidebar ? 2 : 0,
                minHeight: 44,
                paddingX: openSidebar ? 2 : 5,
                borderRadius: 0.75,
                typography: 'body2',
                fontSize: fontsizeText,
                color: 'text.secondary',
                textTransform: 'capitalize',
                fontWeight: 'fontWeightMedium',
                ...(active && {
                  color: 'primary.main',
                  fontWeight: 'fontWeightSemiBold',
                }),
              }}
            >
              <Box sx={{ mr: "16px" }}>
                <Box component="section" sx={{
                  p: active ? "3px" : "2px",
                  backgroundColor: active ? "primary.main" : "text.secondary",
                  borderRadius: '50%',
                }}></Box>
              </Box>

              <ListItemText>
                <Typography
                  variant='subtitle2'
                  sx={{ fontSize: fontsizeText }}
                >
                  {list.name}
                </Typography>
              </ListItemText>

            </ListItemButton>
          </ListItem>
        )
      })}
    </>
  )

  const renderCollapsedList = (
    <List>

      <ListItemButton
        onClick={openSidebar ? handleOpen : handlePopoverOpen}
        sx={{
          borderRadius: .75,
          fontSize: fontsizeText,
          color: 'text.secondary',
          textTransform: 'capitalize',
          fontWeight: 'fontWeightMedium',
          ...(isActive && {
            color: textColorPrimary,
            fontWeight: 'fontWeightSemiBold',
            bgcolor: () => alpha(textColorPrimary, 0.08),
            '&:hover': {
              bgcolor: () => alpha(textColorPrimary, 0.08),
            },
          }),
          ...(!openSidebar && {
            display: 'flex',
            flexDirection: 'column',
            padding: "1px",
          }),
        }}
      // onCl={!openSidebar ? handlePopoverOpen : undefined}
      // onMouseLeave={!openSidebar ? handlePopoverClose : undefined}
      >
        <ListItemIcon sx={sxIconGlobal}>
          {/* @ts-ignore */}
          {cloneElement(iconSection, {
            style: { color: isActive ? textColorPrimary : textColorSecondary }
          })}
        </ListItemIcon>
        <ListItemText sx={sxText} >
          <Typography
            variant="subtitle2"
            sx={{
              fontSize: openSidebar ? fontsizeText : fontsizeTextLight,
              color: isActive ? textColorPrimary : textColorSecondary
            }}
          >
            {section}
          </Typography>
        </ListItemText>
        {openSidebar && (
          <>
            {open ? <HiOutlineChevronDown /> : <HiOutlineChevronRight />}
          </>
        )}
      </ListItemButton>

      {openSidebar ? (
        <Collapse in={open} timeout="auto" unmountOnExit>
          {renderData}
        </Collapse>
      ) : (
        <Popover
          id={id}
          open={openPopover}
          anchorEl={anchorEl}
          onClose={handlePopoverClose}
          anchorOrigin={{
            vertical: 'center',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'center',
            horizontal: 'left'
          }}
          slotProps={{
            paper: {
              style: {
                marginLeft: '5px', // Ajusta la cantidad de píxeles que deseas mover el Popover hacia la derecha
              },
            },
          }}

        >
          {renderData}
        </Popover>
      )}
    </List>
  );

  return (
    <>
      {isPublic ? (
        <>{renderCollapsedList}</>
      ) : (
        <WithRoleAllowedRoutes allowedRolesList={[]}>
          {renderCollapsedList}
        </WithRoleAllowedRoutes>
      )}
    </>
  )
};



