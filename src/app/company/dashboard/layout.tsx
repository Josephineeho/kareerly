"use client"
import React, { useState } from "react";
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
  X,
  ChevronLeft,
  Bell,
  Search,
} from "lucide-react";
import Image from "next/image";
// import { dum
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "@/services/auth";
import { useUser } from "@/context/UserContext";

function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user } = useUser();
  const router = useRouter();
  const pathName = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [collapsed, setCollapsed] = useState(false);

  const logUserOut = async () => {
	await signOut();
	router.push("/login");
  };

  

  const sidebarMenu = [
	{ icon: <LayoutDashboard size={19} />, link: "/company/dashboard", label: "Dashboard" },
	{ icon: <FileUser size={19} />, link: "/company/dashboard/applications", label: "Applications" },
	{ icon: <Bookmark size={19} />, link: "/company/dashboard/saved-jobs", label: "Posted Jobs" },
	{ icon: <Mail size={19} />, link: "/company/dashboard/messages", label: "Messages" },
	{ icon: <UserCircle2 size={19} />, link: "/company/dashboard/profile", label: "Profile" },
	{ icon: <BriefcaseBusiness size={19} />, link: "/company/dashboard/jobs", label: "Jobs" },
	{ icon: <Building2Icon size={19} />, link: "/company/dashboard/companies", label: "Companies" },
	{ icon: <Settings size={19} />, link: "/company/dashboard/settings", label: "Settings" },
  ];


  // Get current page title
  const currentPage = sidebarMenu.find(item => item.link === pathName);

  const initials = user?.user_metadata?.full_name
	?.split(' ')
	.map((n: string) => n[0])
	.slice(0, 2)
	.join('')
	.toUpperCase() || 'U';

  return (
	<div className="h-screen flex bg-surface overflow-hidden">
	  {/* Sidebar */}
	  <aside
		className={`
		  ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
		  ${collapsed ? "w-[72px]" : "w-64"}
		  fixed lg:relative inset-y-0 left-0 z-40
		  flex flex-col
		  bg-surface-container-lowest border-r border-slate-100
		  transition-all duration-300 ease-in-out
		  shadow-[1px_0_20px_rgba(0,0,0,0.04)]
		`}
	  >
		{/* Sidebar Header */}
		<div className={`flex items-center h-16 px-4 border-b border-slate-100 shrink-0 ${collapsed ? "justify-center" : "justify-between"}`}>
		  {!collapsed && (
			<Link href="/" className="flex items-center gap-2">
			  <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shadow-md">
				<span className="text-white font-black text-sm">K</span>
			  </div>
			  <span className="font-black tracking-tighter text-lg text-on-surface">
				Kare<span className="text-primary">erly</span>
			  </span>
			</Link>
		  )}
		  {collapsed && (
			<div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shadow-md">
			  <span className="text-white font-black text-sm">K</span>
			</div>
		  )}
		  {/* Collapse toggle — desktop only */}
		  <button
			onClick={() => setCollapsed(!collapsed)}
			className="hidden lg:flex items-center justify-center w-7 h-7 rounded-lg hover:bg-surface-container-low transition-colors text-on-surface-variant"
		  >
			<ChevronLeft size={16} className={`transition-transform duration-300 ${collapsed ? "rotate-180" : ""}`} />
		  </button>
		</div>

		{/* Nav Items */}
		<nav className="flex-1 overflow-y-auto py-4 px-3 space-y-0.5">
		  {sidebarMenu.map((item) => {
			const isActive = pathName === item.link;
			return (
			  <Link
				key={item.link}
				href={item.link}
				onClick={() => { if (window.innerWidth < 1024) setSidebarOpen(false); }}
				title={collapsed ? item.label : undefined}
				className={`
				  flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-150 group
				  ${collapsed ? "justify-center" : ""}
				  ${isActive
					? "bg-primary/10 text-primary"
					: "text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface"
				  }
				`}
			  >
				<span className={`shrink-0 ${isActive ? "text-primary" : "text-on-surface-variant group-hover:text-on-surface"} transition-colors`}>
				  {item.icon}
				</span>
				{!collapsed && (
				  <span className="truncate">{item.label}</span>
				)}
				{isActive && !collapsed && (
				  <span className="ml-auto w-1.5 h-1.5 bg-primary rounded-full shrink-0" />
				)}
			  </Link>
			);
		  })}
		</nav>

		{/* User Profile + Logout */}
		<div className="px-3 pb-4 pt-2 border-t border-slate-100 shrink-0 space-y-1">
		  <div className={`flex items-center gap-3 px-3 py-2.5 rounded-xl bg-surface-container-low ${collapsed ? "justify-center" : ""}`}>
			<div className="w-8 h-8 rounded-full bg-primary/15 flex items-center justify-center shrink-0">
			  <span className="text-primary font-black text-xs">{initials}</span>
			</div>
			{!collapsed && (
			  <div className="flex-1 min-w-0">
				<p className="text-xs font-bold text-on-surface truncate">{user?.user_metadata?.full_name || 'User'}</p>
				<p className="text-xs text-muted truncate">{user?.email}</p>
			  </div>
			)}
		  </div>

		  <button
			onClick={logUserOut}
			className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-semibold text-error hover:bg-error/8 transition-all duration-150 ${collapsed ? "justify-center" : ""}`}
		  >
			<LogOut size={18} className="shrink-0" />
			{!collapsed && <span>Sign Out</span>}
		  </button>
		</div>
	  </aside>

	  {/* Mobile overlay */}
	  {sidebarOpen && (
		<div
		  className="fixed inset-0 bg-black/30 backdrop-blur-sm z-30 lg:hidden"
		  onClick={() => setSidebarOpen(false)}
		/>
	  )}

	  {/* Main Content */}
	  <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
		{/* Top Bar */}
		<header className="h-16 flex items-center justify-between px-4 md:px-6 border-b border-slate-100 bg-surface-container-lowest shrink-0 z-20">
		  <div className="flex items-center gap-3">
			{/* Mobile sidebar toggle */}
			<button
			  onClick={() => setSidebarOpen(!sidebarOpen)}
			  className="lg:hidden p-2 rounded-lg text-on-surface-variant hover:bg-surface-container-low transition-colors"
			>
			  {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
			</button>

			<div>
			  <h1 className="font-bold text-base text-on-surface leading-none">
				{currentPage?.label || 'Dashboard'}
			  </h1>
			  <p className="text-xs text-muted mt-0.5">
				{new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' })}
			  </p>
			</div>
		  </div>

		  <div className="flex items-center gap-2">
			{/* Search bar - desktop */}
			<div className="hidden md:flex items-center gap-2 bg-surface-container-low border border-slate-100 rounded-xl px-3 py-2 text-sm text-muted w-48 xl:w-64">
			  <Search size={14} className="shrink-0" />
			  <span className="text-xs">Search jobs, companies…</span>
			</div>

			{/* Notifications */}
			<button className="relative p-2.5 rounded-xl hover:bg-surface-container-low transition-colors text-on-surface-variant">
			  <Bell size={18} />
			  <span className="absolute top-2 right-2 w-2 h-2 bg-error rounded-full border-2 border-surface-container-lowest" />
			</button>

			{/* Avatar */}
			<div className="w-9 h-9 rounded-full bg-primary/15 flex items-center justify-center cursor-pointer hover:ring-2 hover:ring-primary/30 transition-all">
			  <span className="text-primary font-black text-xs">{initials}</span>
			</div>
		  </div>
		</header>

		{/* Page Content */}
		<main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
		  {children}
		</main>
	  </div>
	</div>
  );
}

export default DashboardLayout;
