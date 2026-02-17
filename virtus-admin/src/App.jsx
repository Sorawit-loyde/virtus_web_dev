import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import CategoryDetail from './pages/CategoryDetail';
import CataloguesManagement from './pages/CataloguesManagement';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-slate-50">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/category/:id" element={<CategoryDetail />} />
          <Route path="/catalogues" element={<CataloguesManagement />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
