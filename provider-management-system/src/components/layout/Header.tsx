// src/components/layout/Header.tsx
import { Link, useLocation } from 'react-router-dom';
import { useApiHealth } from '../../hooks/useApiHealth';
import { useTheme } from '../../contexts/ThemeContext'; // ← NOVO
import { Wifi, Server, Sun, Moon } from 'lucide-react'; // ← NOVOS ÍCONES

const Header = () => {
  const location = useLocation();
  const { isOnline, loading } = useApiHealth();
  const { theme, toggleTheme } = useTheme(); // ← NOVO

  const navigation = [
    { name: 'Dashboard', href: '/'},
    { name: 'Providers', href: '/providers'},
    { name: 'Demands', href: '/demands'},
  ];

  return (
    <header className="bg-gradient-to-r from-[#4169E1] to-[#3151B0] shadow-lg dark:from-[#3151B0] dark:to-[#1e3a8a]"> {/* ← ATUALIZADO */}
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

          {/* Controles */}
          <div className="flex items-center space-x-3">
            {/* Toggle Dark Mode */}
            <button
              onClick={toggleTheme}
              className="p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
              aria-label={`Mudar para modo ${theme === 'light' ? 'escuro' : 'claro'}`}
            >
              {theme === 'light' ? (
                <Moon className="w-5 h-5" />
              ) : (
                <Sun className="w-5 h-5" />
              )}
            </button>

            {/* Status do Sistema */}
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