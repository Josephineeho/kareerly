"use client"
import React, { useState } from "react";
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
  Cross,
  X,
} from "lucide-react";
import Image from "next/image";
import { dummyUser } from "../../dummy-data";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "@/services/auth";

function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathName = usePathname()

  const [sidebarOpen, setSidebarOpen] = useState(true);


  function handleSideBar(){
    if(sidebarOpen){
      setSidebarOpen(false);
    }
    else{
      setSidebarOpen(true);
  }
}

  const logUserOut = async () => {
    await signOut();
    router.push("/login");

  }
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
       <div className="flex pl-7 pt-6 h-[4vh] items-center">
          {sidebarOpen ? <X size={25} className="block md:hidden cursor-pointer" onClick={()=> handleSideBar()}/> : 
          <Menu size={25} className="block md:hidden cursor-pointer" onClick={()=> handleSideBar()}/> }
          <div className="logo font-bold tracking-tighter text-2xl">Kareerly</div>
        </div>
      <div className="dashboard flex h-screen">
    <div className={`side p-7 ${sidebarOpen? " ": "hidden"} bg-surface-container-high/30 shadow-xl md:flex flex-col justify-between`}>
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
                <Link key={item.link} href={item.link} className={`flex items-center gap-2 p-2 ${pathName === item.link ? activeStyle : "hover:bg-surface-container-highest rounded"}`}>
                  {item.icon}
                  {item.label}
                </Link>

              ))}
            </div>
          </div>
          <Button variant="ghost" onclick={() => { logUserOut() }}>
            <LogOut className="text-error" />
            <p className="text-error"> Logout </p>
          </Button>
        </div>
        <div className="child p-6">{children}</div>
      </div>

    </div>
  );
}

export default DashboardLayout;
