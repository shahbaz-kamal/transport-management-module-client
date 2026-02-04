import MyInfo from "@/pages/Student/MyInfo";
import type { ISidebarItems } from "@/types";
import { IoMdInformationCircle } from "react-icons/io";

export const studentSidebarItems: ISidebarItems[] = [
  {
    title: "Dashboard",
    items: [
      {
        title: "My Information",
        url: "/student/my-info",
        component: MyInfo,
        icon: <IoMdInformationCircle   size={18} />,
      },
     
    ],
  },
];
