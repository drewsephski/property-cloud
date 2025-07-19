import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { formatDistanceToNow, format, parseISO } from "date-fns";

/**
 * Combines multiple class names using clsx and ensures Tailwind classes merge properly
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format a number as currency
 * @param value Number to format
 * @param currency Currency code (default: USD)
 * @param locale Locale for formatting (default: en-US)
 */
export function formatCurrency(
  value: number,
  currency = "USD",
  locale = "en-US"
): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  }).format(value);
}

/**
 * Format a number with comma separators and decimal places
 * @param value Number to format
 * @param decimalPlaces Number of decimal places to show
 * @param locale Locale for formatting (default: en-US)
 */
export function formatNumber(
  value: number,
  decimalPlaces = 0,
  locale = "en-US"
): string {
  return new Intl.NumberFormat(locale, {
    minimumFractionDigits: decimalPlaces,
    maximumFractionDigits: decimalPlaces,
  }).format(value);
}

/**
 * Format a date in relative time (e.g., "2 days ago")
 * @param date Date to format
 */
export function formatRelativeTime(date: Date | string): string {
  const parsedDate = typeof date === "string" ? parseISO(date) : date;
  return formatDistanceToNow(parsedDate, { addSuffix: true });
}

/**
 * Format a date with a specific format
 * @param date Date to format
 * @param formatString Format string (default: "PPP")
 */
export function formatDate(
  date: Date | string,
  formatString = "PPP"
): string {
  const parsedDate = typeof date === "string" ? parseISO(date) : date;
  return format(parsedDate, formatString);
}

/**
 * Truncate a string to a maximum length with ellipsis
 * @param str String to truncate
 * @param maxLength Maximum length before truncation
 */
export function truncateString(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str;
  return `${str.slice(0, maxLength)}...`;
}

/**
 * Debounce a function to limit how often it can be called
 * @param fn Function to debounce
 * @param delay Delay in milliseconds
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;
  
  return function(...args: Parameters<T>) {
    if (timeoutId) clearTimeout(timeoutId);
    
    timeoutId = setTimeout(() => {
      fn(...args);
    }, delay);
  };
}

/**
 * Throttle a function to limit how often it can be called
 * @param fn Function to throttle
 * @param limit Time limit in milliseconds
 */
export function throttle<T extends (...args: unknown[]) => unknown>(
  fn: T,
  limit: number
): (...args: Parameters<T>) => void {
  let lastCall = 0;
  
  return function(...args: Parameters<T>) {
    const now = Date.now();
    
    if (now - lastCall >= limit) {
      lastCall = now;
      fn(...args);
    }
  };
}

/**
 * Generate a random string ID
 * @param length Length of the ID (default: 8)
 */
export function generateId(length = 8): string {
  return Math.random()
    .toString(36)
    .substring(2, 2 + length);
}

/**
 * Check if an element is in the viewport
 * @param element Element to check
 * @param offset Offset from viewport edges (default: 0)
 */
export function isInViewport(element: HTMLElement, offset = 0): boolean {
  const rect = element.getBoundingClientRect();
  
  return (
    rect.top <= (window.innerHeight || document.documentElement.clientHeight) + offset &&
    rect.bottom >= 0 - offset &&
    rect.left <= (window.innerWidth || document.documentElement.clientWidth) + offset &&
    rect.right >= 0 - offset
  );
}

/**
 * Smooth scroll to an element
 * @param elementId ID of the element to scroll to
 * @param offset Offset from the top (default: 0)
 */
export function scrollToElement(elementId: string, offset = 0): void {
  const element = document.getElementById(elementId);
  if (!element) return;
  
  const elementPosition = element.getBoundingClientRect().top;
  const offsetPosition = elementPosition + window.pageYOffset - offset;
  
  window.scrollTo({
    top: offsetPosition,
    behavior: "smooth",
  });
}

/**
 * Copy text to clipboard
 * @param text Text to copy
 * @returns Promise resolving to true if successful, false otherwise
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    console.error("Failed to copy text:", error);
    return false;
  }
}

// Animation helper constants
export const ANIMATION_DURATIONS = {
  fast: 0.2,
  normal: 0.4,
  slow: 0.8,
};

export const ANIMATION_VARIANTS = {
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  fadeInUp: {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  },
  fadeInDown: {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
  },
  scaleIn: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  },
  slideInLeft: {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  },
  slideInRight: {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0 },
  },
};

// Common SaaS configuration constants
export const PRICING_TIERS = {
  FREE: "free",
  BASIC: "basic",
  PRO: "pro",
  ENTERPRISE: "enterprise",
};

export const SUBSCRIPTION_PERIODS = {
  MONTHLY: "monthly",
  ANNUAL: "annual",
};

export const FEATURE_FLAGS = {
  BETA_FEATURES: "beta-features",
  EARLY_ACCESS: "early-access",
  NEW_DASHBOARD: "new-dashboard",
};

export const API_ENDPOINTS = {
  AUTH: "/api/auth",
  USERS: "/api/users",
  PROJECTS: "/api/projects",
  BILLING: "/api/billing",
  SUBSCRIPTIONS: "/api/subscriptions",
};

export const LOCAL_STORAGE_KEYS = {
  AUTH_TOKEN: "auth-token",
  USER_PREFERENCES: "user-preferences",
  THEME: "theme",
  ONBOARDING_COMPLETED: "onboarding-completed",
};

export const DEFAULT_PAGINATION = {
  PAGE_SIZE: 10,
  MAX_PAGES: 10,
};

export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
};

/**
 * Check if the current environment is production
 */
export const isProduction = process.env.NODE_ENV === "production";

/**
 * Check if the current environment is development
 */
export const isDevelopment = process.env.NODE_ENV === "development";

/**
 * Check if the current environment is a browser
 */
export const isBrowser = typeof window !== "undefined";
