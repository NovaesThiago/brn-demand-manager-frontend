import { Link, useLocation } from 'react-router-dom';
import { useApiHealth } from '../../hooks/useApiHealth';

const Header = () => {
  const location = useLocation();
  const { isOnline, loading } = useApiHealth();

  const navigation = [
    { name: 'Dashboard', href: '/' },
    { name: 'Providers', href: '/providers' },
    { name: 'Demands', href: '/demands' },
  ];

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <h1 className="text-xl font-bold text-[#4169E1]">
              Provider Management System
            </h1>
            <nav className="hidden md:flex space-x-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    location.pathname === item.href
                      ? 'bg-[#4169E1] text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Status do Backend */}
          <div className="flex items-center space-x-2">
            {!loading && (
              <div className="flex items-center space-x-1 text-sm">
                <div
                  className={`w-2 h-2 rounded-full ${
                    isOnline ? 'bg-green-500' : 'bg-red-500'
                  }`}
                />
                <span className="text-gray-600">
                  Backend: {isOnline ? 'Online' : 'Offline'}
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