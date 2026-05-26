"use client"
import React from "react";
import Button from "../components/UI/Button";
import {
  Bookmark,
  BriefcaseBusiness,
  Building2Icon,
  FileUser,
  LayoutDashboard,
  LogOut,
  Mail,
  Settings,
  Menu,
  UserCircle2,
} from "lucide-react";
import Image from "next/image";
import { dummyUser } from "../../dummy-data";
import Link from "next/link";
import NavBar from "../components/UI/NavBar";
import { usePathname } from "next/navigation";

function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathName = usePathname();
  const sidebarMenu = [
    {
      icon: <LayoutDashboard />,
      link: "/dashboard",
      label: "Dashboard",
    },
    {
      icon: <FileUser />,
      link: "/dashboard/applications",
      label: "Applications",
    },
    {
      icon: <Bookmark />,
      link: "/dashboard/saved-jobs",
      label: "Saved Jobs",
    },
    {
      icon: <Mail />,
      link: "/dashboard/messages",
      label: "Messages",
    },
    {
      icon: <UserCircle2 />,
      link: "/dashboard/profile",
      label: "Profile",
    },
    {
      icon: <BriefcaseBusiness />,
      link: "/dashboard/jobs",
      label: "Jobs",
    },
    {
      icon: <Building2Icon />,
      link: "/dashboard/companies",
      label: "Companies",
    },
    {
      icon: <Settings />,
      link: "/dashboard/settings",
      label: "Settings"
    },
  ];


  const activeStyle = "text-primary bg-primary/20 rounded font-bold" 

  return (

    <div className="h-screen">
      <NavBar />
      <div className="dashboard flex h-[93vh]">
        <Menu size={35} className="block md:hidden"/>
        <div className="side p-7 hidden bg-surface-container-high/30 shadow-xl md:flex flex-col justify-between">
        <div className="sidebar flex flex-col gap-5">
          <div className="profile rounded-lg bg-surface-container-highest flex gap-3 p-3 items-center">
            <div className="img">
              <Image className="rounded-lg"
                alt="ProfilePic"
                width={50}
                height={50}
                src={dummyUser.avatar}
              />
            </div>
            <div className="info">
              <h2 className="text-primary text-xl font-semibold">{dummyUser.name}</h2>
              <p className=" text-muted text-lg uppercase">{dummyUser.jobTitle}</p>
            </div>
          </div>

          <div className="sideNav flex flex-col gap-5">
            {sidebarMenu.map((item) => (
              <Link key={item.link} href={item.link} className={`flex items-center gap-2 p-2 ${pathName ===item.link ? activeStyle : "hover:bg-surface-container-highest rounded"}`}>
                {item.icon}
                {item.label}
              </Link>
              
            ))}
            </div>
        </div>
        <Button variant="ghost" >
       <LogOut className="text-error"/> <p className="text-error"> Logout </p>
      </Button>
        </div>
        <div className="child">{children}</div>
      </div>
      
    </div>
  );
}

export default DashboardLayout;
