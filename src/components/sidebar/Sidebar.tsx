"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import styles from "./Sidebar.module.css";
import Cookies from "js-cookie";
//icons
import { IoHomeOutline } from "react-icons/io5";
import { IoHome } from "react-icons/io5";
import { PiCoinsBold } from "react-icons/pi";
import { PiCoinsFill } from "react-icons/pi";
import { HiOutlineUser } from "react-icons/hi2";
import { HiUser } from "react-icons/hi2";
import { TbHelpHexagon } from "react-icons/tb";
import { TbHelpHexagonFilled } from "react-icons/tb";
import { PiSignOutBold } from "react-icons/pi";
import { RiAdminFill } from "react-icons/ri";
import { useState } from "react";
import { useUser } from "@/app/contexts/UserContext";

const menuItems = [
  {
    label: "Início",
    href: "/inicio",
    icon: <IoHomeOutline size={18} />,
    iconFill: <IoHome size={18} />,
  },
  {
    label: "Meus Dados",
    href: "/dados",
    icon: <HiOutlineUser size={18} />,
    iconFill: <HiUser size={18} />,
  },
  {
    label: "Painel Administrativo",
    href: "/administracao",
    icon: <RiAdminFill size={18} />,
    iconFill: <RiAdminFill size={18} />,
    adminOnly: true,
  },
  {
    label: "Ajuda",
    href: "/ajuda",
    icon: <TbHelpHexagon size={18} />,
    iconFill: <TbHelpHexagonFilled size={18} />,
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { usuario, loading } = useUser();

  const handleLogout = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    Cookies.remove("token");
    router.push("/login");
  };

  return (
    <aside className={styles.sidebarContainer}>
      <div className={styles.top}>
        <img src="/logo.png" alt="" />
      </div>
      <nav>
        <ul className={styles.navList}>
          {menuItems
            .filter(
              (item) => !item.adminOnly || usuario?.hierarquia === "admin"
            ) 
            .map((item, idx) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  href={item.href}
                  key={idx}
                  className={`${styles.navItem} ${
                    isActive ? styles.navItemActive : ""
                  }`}
                >
                  <span className={styles.navItemIcon}>
                    {isActive ? item.iconFill : item.icon}
                  </span>
                  {item.label}
                </Link>
              );
            })}

          <a href="/login" onClick={handleLogout} className={styles.navItem}>
            <span className={styles.navItemIcon}>
              <PiSignOutBold size={18} />
            </span>
            Sair
          </a>
        </ul>
      </nav>
    </aside>
  );
}
