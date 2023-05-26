import React, { createContext } from "react";

export const SidebarState = createContext<{
  showSidebar: boolean;
  setShowSidebar: React.Dispatch<React.SetStateAction<boolean>>;
} | null>(null);
