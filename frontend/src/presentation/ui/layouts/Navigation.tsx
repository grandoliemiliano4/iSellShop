"use client";

import React, { useState } from "react";
import Header from "./Header";
import { Sidebar } from "./Sidebar";

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <Header onMenuToggle={() => setIsMobileMenuOpen(true)} />
      <Sidebar 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)} 
      />
    </>
  );
}
