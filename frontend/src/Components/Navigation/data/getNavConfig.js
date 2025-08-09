import {
  FaFire, FaSearch, FaHome, FaCompass, FaStore,
  FaInbox, FaHeart, FaShoppingCart,
  FaUserCircle, FaUser, FaCog, FaSignOutAlt
} from "react-icons/fa";
import { AiFillSetting } from 'react-icons/ai';
import amgAvatar from "./avatar.png";
import { useFavorites } from "../../../context/FavoritesContext";

const getNavConfig = (state) => [
  {
    section: "logo",
    title: "MyApp",
    icon: FaFire,
    showTitle: true,
    showIcon: true,
    route: "/",
    itemCount: 0,
    dropdown: [],
  },
  {
    section: "search",
    type: "search",
    input: true,
    icon: FaSearch,
    placeholder: "Search...",
    showIcon: false,
    showTitle: false,
    action: "/search",
    itemCount: 0,
    dropdown: [],
  },
  {
    section: "navigation",
    title: "Home",
    icon: FaHome,
    showTitle: true,
    showIcon: false,
    route: "/home",
    itemCount: 0,
    dropdown: [],
  },
  {
    section: "navigation",
    title: "Discover",
    icon: FaCompass,
    showTitle: true,
    showIcon: false,
    route: "/discover",
    itemCount: 0,
    dropdown: [],
  },
  {
    section: "navigation",
    title: "Store",
    icon: FaStore,
    showTitle: true,
    showIcon: false,
    route: "/store",
    itemCount: 0,
    dropdown: [],
  },
  {
    section: "actions",
    title: "Inbox",
    icon: FaInbox,
    showTitle: false,
    showIcon: true,
    route: "/inbox",
    itemCount: 43,
    dropdown: [],
  },
  {
    section: "actions",
    title: "Favorites",
    icon: FaHeart,
    showTitle: false,
    showIcon: true,
    route: "/favorites",
    itemCount: state?.favorites?.length || 0,
    dropdown: state?.favorites || [],
  },
  {
    section: "actions",
    title: "Cart",
    icon: FaShoppingCart,
    showTitle: false,
    showIcon: true,
    route: "/cart",
    itemCount: state?.cart?.length || 0,
    dropdown: state?.cart || [],
  },
  {
    section: "settings",
    title: "Profile",
    avatar: amgAvatar,
    icon: AiFillSetting,
    showTitle: false,
    showIcon: true,
    route: "/profile",
    itemCount: 0,
    dropdown: [
      {
        title: "View Profile",
        icon: FaUser,
        showTitle: true,
        showIcon: true,
        route: "/profile/view",
      },
      {
        title: "Settings",
        icon: FaCog,
        showTitle: true,
        showIcon: true,
        route: "/settings",
      },
      {
        title: "Logout",
        icon: FaSignOutAlt,
        showTitle: true,
        showIcon: true,
        route: "/logout",
      },
    ],
  },
];

export default getNavConfig;

