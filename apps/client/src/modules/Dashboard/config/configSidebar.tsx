import { HiOutlineBeaker, HiOutlineBookOpen, HiOutlineChartBar, HiOutlineChartSquareBar, HiOutlineCode, HiOutlineHome, HiOutlinePlus } from "react-icons/hi";

import { roles } from "../../../components/config/SessionSettings";


interface ConfigSidebarType {
  title: string;
  isPublic: boolean;
  section: SectionType[];
}
interface SectionType {
  path: string;
  collapsed: any[];
  allowedRoles: number[];
  data_config: {
    name: string;
    path: string;
    icon: JSX.Element;
  }[];
}

export const CONFIG_SIDEBAR: ConfigSidebarType[] = [
  {
    title: 'Dashboard',
    isPublic: true,
    section: [
      {
        path: '/dashboard',
        collapsed: [],
        allowedRoles: [],
        data_config: [
          {
            name: 'Home',
            path: '/home',
            icon: <HiOutlineHome />
          },
          {
            name: 'Home 2',
            path: '/home-2',
            icon: <HiOutlineHome />
          }
        ]
      }
    ],
  },
  {
    title: 'example collapsed',
    isPublic: true,
    section: [
      {
        path: '/dashboard/collapsed',
        collapsed: [
          {
            open: false,
            section: 'Section collapsed',
            iconSection: <HiOutlineBeaker />,
          }
        ],
        allowedRoles: [],
        data_config: [
          {
            name: 'test',
            path: '/test',
            icon: <HiOutlineBeaker />
          },
          {
            name: 'test 2',
            path: '/test2',
            icon: <HiOutlineBookOpen />
          }
        ],
      },
      {
        path: '/dashboard/collapsed-2',
        collapsed: [
          {
            open: false,
            section: 'Section collapsed 2',
            iconSection: <HiOutlineBeaker />,
          }
        ],
        allowedRoles: [],
        data_config: [
          {
            name: 'test 3',
            path: '/test3',
            icon: <HiOutlineBeaker />
          },
          {
            name: 'test 4',
            path: '/test4',
            icon: <HiOutlineBookOpen />
          }
        ],
      }
    ]
  },
  {
    title: 'develop',
    isPublic: true,
    section: [
      {
        path: '/dashboard',
        collapsed: [],
        // allowedRoles: [roles.Developer],
        allowedRoles: [],
        data_config: [
          {
            name: 'components',
            path: '/components',
            icon: <HiOutlineCode />,
          }
        ]
      }
    ]
  }
];


