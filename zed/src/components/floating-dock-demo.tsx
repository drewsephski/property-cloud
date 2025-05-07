"use client";

import { FloatingDock } from "@/components/ui/floating-dock";
import {
  IconBrandGithub,
  IconBrandTwitter,
  IconBrandLinkedin,
  IconHome,
  IconUser,
  IconSettings,
  IconHelp,
  IconPencil,
  IconBrain,
  IconRobot,
  IconSparkles,
} from "@tabler/icons-react";

export function FloatingDockDemo() {
  const items = [
    {
      title: "Home",
      icon: <IconHome className="h-full w-full" />,
      href: "/",
    },
    {
      title: "Write",
      icon: <IconPencil className="h-full w-full" />,
      href: "/features",
    },
    {
      title: "AI Assistant",
      icon: <IconRobot className="h-full w-full text-blue-500" />,
      href: "/features",
    },
    {
      title: "AIWriter",
      icon: (
        <div className="flex items-center justify-center h-full w-full bg-gradient-to-br from-purple-500 to-blue-500 rounded-full">
          <IconBrain className="h-3/4 w-3/4 text-white" />
        </div>
      ),
      href: "/",
    },
    {
      title: "Magic",
      icon: <IconSparkles className="h-full w-full text-amber-400" />,
      href: "/features",
    },
    {
      title: "Profile",
      icon: <IconUser className="h-full w-full" />,
      href: "/signup",
    },
    {
      title: "Help",
      icon: <IconHelp className="h-full w-full" />,
      href: "#",
    },
  ];

  return (
    <div className="relative">
      <FloatingDock
        items={items}
        desktopClassName="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 shadow-lg"
        mobileClassName="fixed bottom-8 right-8 z-50 shadow-lg"
      />
    </div>
  );
}
