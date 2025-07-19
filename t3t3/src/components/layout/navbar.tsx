"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, Menu, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { FloatingCard } from "@/components/ui/floating-card";

interface NavItem {
  label: string;
  href: string;
  isExternal?: boolean;
  children?: NavItem[];
}

interface NavbarProps {
  /**
   * The logo component or element to display
   */
  logo?: React.ReactNode;
  
  /**
   * The navigation items to display
   */
  items?: NavItem[];
  
  /**
   * The actions to display on the right side of the navbar
   */
  actions?: React.ReactNode;
  
  /**
   * Whether the navbar should be sticky at the top of the page
   * @default false
   */
  sticky?: boolean;
  
  /**
   * Whether to show a glass morphism effect on the navbar
   * @default true
   */
  glassEffect?: boolean;
  
  /**
   * Whether to show a subtle shadow on the navbar
   * @default true
   */
  showShadow?: boolean;
  
  /**
   * Whether to show a border at the bottom of the navbar
   * @default false
   */
  showBorder?: boolean;
  
  /**
   * The maximum width of the navbar content
   * @default "max-w-7xl"
   */
  maxWidth?: string;
  
  /**
   * The padding of the navbar
   * @default "px-4 sm:px-6 lg:px-8"
   */
  padding?: string;
  
  /**
   * The height of the navbar
   * @default "h-16"
   */
  height?: string;
  
  /**
   * The z-index of the navbar
   * @default "z-40"
   */
  zIndex?: string;
  
  /**
   * Additional classes to apply to the navbar
   */
  className?: string;
  
  /**
   * Custom theme toggle component
   * If not provided, the default theme toggle will be used
   */
  themeToggle?: React.ReactNode;
  
  /**
   * Whether to show the theme toggle
   * @default true
   */
  showThemeToggle?: boolean;
  
  /**
   * Whether the navbar is in dark mode
   * Used for controlled theme state
   */
  isDarkMode?: boolean;
  
  /**
   * Callback when the theme is toggled
   */
  onThemeToggle?: () => void;
}

export function Navbar({
  logo,
  items = [],
  actions,
  sticky = false,
  glassEffect = true,
  showShadow = true,
  showBorder = false,
  maxWidth = "max-w-7xl",
  padding = "px-4 sm:px-6 lg:px-8",
  height = "h-16",
  zIndex = "z-40",
  className,
  themeToggle,
  showThemeToggle = true,
  isDarkMode: controlledDarkMode,
  onThemeToggle,
}: NavbarProps) {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [internalDarkMode, setInternalDarkMode] = useState(false);
  
  // Use either controlled or internal dark mode state
  const isDarkMode = controlledDarkMode !== undefined ? controlledDarkMode : internalDarkMode;
  
  // Handle theme toggle
  const handleThemeToggle = () => {
    if (onThemeToggle) {
      onThemeToggle();
    } else {
      setInternalDarkMode(!internalDarkMode);
      if (typeof window !== "undefined") {
        const html = document.documentElement;
        if (!internalDarkMode) {
          html.classList.add("dark");
          localStorage.setItem("theme", "dark");
        } else {
          html.classList.remove("dark");
          localStorage.setItem("theme", "light");
        }
      }
    }
  };
  
  // Handle scroll events for sticky navbar
  useEffect(() => {
    if (!sticky) return;
    
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 10);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sticky]);
  
  // Initialize theme based on localStorage or system preference
  useEffect(() => {
    if (controlledDarkMode !== undefined) return;
    
    const savedTheme = localStorage.getItem("theme");
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    
    if (savedTheme === "dark" || (!savedTheme && systemPrefersDark)) {
      setInternalDarkMode(true);
      document.documentElement.classList.add("dark");
    } else {
      setInternalDarkMode(false);
      document.documentElement.classList.remove("dark");
    }
  }, [controlledDarkMode]);
  
  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);
  
  // Close mobile menu when escape key is pressed
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsMenuOpen(false);
      }
    };
    
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);
  
  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);
  
  // Render nav items for desktop
  const renderNavItems = (items: NavItem[], isMobile = false) => {
    return items.map((item, index) => {
      const isActive = pathname === item.href;
      const hasChildren = item.children && item.children.length > 0;
      
      if (hasChildren) {
        return (
          <div key={index} className="relative group">
            <button
              className={cn(
                "flex items-center gap-1 px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "text-primary"
                  : "text-foreground/70 hover:text-foreground",
                isMobile && "text-base w-full justify-between"
              )}
              aria-expanded={isMobile ? isMenuOpen : undefined}
              aria-haspopup="true"
            >
              {item.label}
              <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180" />
            </button>
            
            <div
              className={cn(
                "absolute left-0 top-full z-50 mt-1 min-w-[180px] overflow-hidden rounded-md shadow-md",
                "origin-top-left transition-all",
                isMobile
                  ? "relative mt-0 shadow-none"
                  : "opacity-0 scale-95 pointer-events-none group-hover:opacity-100 group-hover:scale-100 group-hover:pointer-events-auto"
              )}
            >
              <FloatingCard
                variant="glass"
                className={cn(
                  "p-2",
                  isMobile && "bg-transparent backdrop-blur-none shadow-none border-0"
                )}
              >
                {item.children?.map((child, childIndex) => (
                  <Link
                    key={childIndex}
                    href={child.href}
                    target={child.isExternal ? "_blank" : undefined}
                    rel={child.isExternal ? "noopener noreferrer" : undefined}
                    className={cn(
                      "block px-4 py-2 text-sm rounded-md transition-colors",
                      pathname === child.href
                        ? "bg-primary/10 text-primary"
                        : "hover:bg-primary/5 text-foreground/70 hover:text-foreground"
                    )}
                  >
                    {child.label}
                  </Link>
                ))}
              </FloatingCard>
            </div>
          </div>
        );
      }
      
      return (
        <Link
          key={index}
          href={item.href}
          target={item.isExternal ? "_blank" : undefined}
          rel={item.isExternal ? "noopener noreferrer" : undefined}
          className={cn(
            "px-3 py-2 text-sm font-medium transition-colors relative",
            isActive
              ? "text-primary"
              : "text-foreground/70 hover:text-foreground",
            isMobile && "text-base block"
          )}
          aria-current={isActive ? "page" : undefined}
        >
          {item.label}
          {isActive && !isMobile && (
            <motion.div
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
              layoutId="navbar-active-indicator"
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
          )}
        </Link>
      );
    });
  };
  
  return (
    <header
      className={cn(
        "w-full",
        sticky && "sticky top-0 left-0 right-0",
        zIndex,
        className
      )}
    >
      <div
        className={cn(
          "w-full transition-all duration-200",
          height,
          glassEffect && "backdrop-blur-md",
          hasScrolled && sticky && "shadow-md",
          showBorder && "border-b",
          showShadow && !hasScrolled && "shadow-sm",
          glassEffect && (
            isDarkMode
              ? "bg-background/70"
              : "bg-background/70"
          )
        )}
      >
        <div className={cn("mx-auto flex h-full items-center justify-between", maxWidth, padding)}>
          {/* Logo */}
          <div className="flex shrink-0 items-center">
            {logo || (
              <Link href="/" className="text-xl font-bold">
                SaaS<span className="text-primary">App</span>
              </Link>
            )}
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {renderNavItems(items)}
          </nav>
          
          {/* Actions (right side) */}
          <div className="flex items-center gap-2">
            {/* Theme Toggle */}
            {showThemeToggle && (
              <div className="mr-2">
                {themeToggle || (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleThemeToggle}
                    aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
                  >
                    <AnimatePresence mode="wait" initial={false}>
                      <motion.div
                        key={isDarkMode ? "dark" : "light"}
                        initial={{ y: -10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 10, opacity: 0 }}
                        transition={{ duration: 0.15 }}
                      >
                        {isDarkMode ? (
                          <Sun className="h-5 w-5" />
                        ) : (
                          <Moon className="h-5 w-5" />
                        )}
                      </motion.div>
                    </AnimatePresence>
                  </Button>
                )}
              </div>
            )}
            
            {/* Custom Actions */}
            <div className="hidden md:flex items-center gap-2">
              {actions}
            </div>
            
            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={isMenuOpen ? "close" : "open"}
                  initial={{ rotate: isMenuOpen ? -90 : 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: isMenuOpen ? 90 : -90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  {isMenuOpen ? (
                    <X className="h-5 w-5" />
                  ) : (
                    <Menu className="h-5 w-5" />
                  )}
                </motion.div>
              </AnimatePresence>
            </Button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            id="mobile-menu"
            className={cn(
              "fixed inset-x-0 top-[64px] z-30 overflow-y-auto md:hidden",
              glassEffect ? "bg-background/80 backdrop-blur-md" : "bg-background",
              showBorder && "border-b"
            )}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
          >
            <div className="px-4 py-6 space-y-4">
              <nav className="flex flex-col space-y-1">
                {renderNavItems(items, true)}
              </nav>
              
              <div className="pt-4 border-t">
                {actions}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
