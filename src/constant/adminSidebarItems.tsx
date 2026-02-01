import FeesMaster from "@/pages/Admin/FeesMaster";
import PickupPoint from "@/pages/Admin/PickupPoint";
import type { ISidebarItems } from "@/types";
import { RiSecurePaymentLine } from "react-icons/ri";
import { MdAddLocation } from "react-icons/md";
import Routes from "@/pages/Admin/Routes";
import { CiRoute } from "react-icons/ci";
import Vehicles from "@/pages/Admin/Vehicles";
import { FaBusAlt } from "react-icons/fa";
import { FaBusSimple } from "react-icons/fa6";
import AssignVehicles from "@/pages/Admin/AssignVehicles";
import RoutePickupPoints from "@/pages/Admin/RoutePickupPoints";
import { FaRoute } from "react-icons/fa";
import { MdOutlineEmojiTransportation } from "react-icons/md";
import StudentTransportFees from "@/pages/Admin/StudentTransportFees";

export const adminSidebarItems: ISidebarItems[] = [
  {
    title: "Dashboard",
    items: [
      {
        title: "Fees Master",
        url: "/admin/fees-master",
        component: FeesMaster,
        icon: <RiSecurePaymentLine size={18} />,
      },
      {
        title: "Pickup Point",
        url: "/admin/pickup-point",
        component: PickupPoint,
        icon: <MdAddLocation size={18} />,
      },
      {
        title: "Routes",
        url: "/admin/routes",
        component: Routes,
        icon: <CiRoute size={18} />,
      },
      {
        title: "Vehicles",
        url: "/admin/vehicles",
        component: Vehicles,
        icon: <FaBusAlt size={18} />,
      },
      {
        title: "Assign vehicles",
        url: "/admin/assign-vehicles",
        component: AssignVehicles,
        icon: <FaBusSimple size={18} />,
      },
      {
        title: "Route Pickup Point",
        url: "/admin/route-pickup-points",
        component: RoutePickupPoints,
        icon: <FaRoute size={18} />,
      },
      {
        title: "Student Transport Fees",
        url: "/admin/student-transport-fees",
        component: StudentTransportFees,
        icon: <MdOutlineEmojiTransportation size={18} />,
      },
    ],
  },
];
