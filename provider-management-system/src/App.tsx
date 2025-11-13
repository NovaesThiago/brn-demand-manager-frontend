import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { NotificationProvider } from './contexts/NotificationContext';
import Header from './components/layout/Header';
import Dashboard from './pages/Dashboard';
import Demands from './pages/Demands';
import DemandDetails from './pages/DemandDetails';
import Providers from './pages/Providers';
import './index.css';

function App() {
  return (
    <NotificationProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Header />
          <main className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/demands" element={<Demands />} />
              <Route path="/demands/:id" element={<DemandDetails />} />
              <Route path="/providers" element={<Providers />} />
            </Routes>
          </main>
        </div>
      </Router>
    </NotificationProvider>
  );
}

export default App;