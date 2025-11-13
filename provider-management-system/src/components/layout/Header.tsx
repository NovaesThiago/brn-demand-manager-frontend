import { Link, useLocation } from 'react-router-dom';
import { useApiHealth } from '../../hooks/useApiHealth';
import { Wifi, Server } from 'lucide-react';

const Header = () => {
  const location = useLocation();
  const { isOnline, loading } = useApiHealth();

  const navigation = [
    { name: 'Dashboard', href: '/'},
    { name: 'Providers', href: '/providers'},
    { name: 'Demands', href: '/demands'},
  ];

  return (
    <header className="bg-gradient-to-r from-[#4169E1] to-[#3151B0] shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo e Nome */}
          <div className="flex items-center space-x-3">
            <div className="bg-white/20 p-2 rounded-lg">
              <Wifi className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">
                BRN Demand Manager
              </h1>
              <p className="text-blue-100 text-xs">Network Solutions</p>
            </div>
          </div>

          {/* Navegação */}
          <nav className="hidden md:flex space-x-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  location.pathname === item.href
                    ? 'bg-white/20 text-white shadow-inner'
                    : 'text-blue-100 hover:bg-white/10 hover:text-white'
                }`}
              >
                <span>{item.name}</span>
              </Link>
            ))}
          </nav>

          {/* Status do Sistema */}
          <div className="flex items-center space-x-3">
            {!loading && (
              <div className="flex items-center space-x-2 bg-white/10 px-3 py-1 rounded-full">
                <Server className={`w-3 h-3 ${isOnline ? 'text-green-300' : 'text-red-300'}`} />
                <span className="text-white text-sm">
                  {isOnline ? 'Online' : 'Offline'}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;