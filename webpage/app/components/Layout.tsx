import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Add Navbar component here */}
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
      {/* Add Footer component here */}
    </div>
  );
};

export default Layout;
