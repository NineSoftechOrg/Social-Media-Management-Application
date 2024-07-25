// src/components/Layout.js
"use client"

import React, { useState } from 'react';
import Sidebar from '../../dash-sidebar/dashSidebar';
import Header from '../../dash-header/dashHeader';

const FbLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="flex flex-col flex-grow">
        <Header className="sticky top-0 z-10 bg-white" toggleSidebar={toggleSidebar} />
        <div className="flex-grow overflow-y-auto p-4">
          {children}
        </div>
      </div>
    </div>
  );
};

export default FbLayout;
