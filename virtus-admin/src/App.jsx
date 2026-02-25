import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminLayout from './components/AdminLayout';
import Dashboard from './pages/Dashboard';
import CategoryDetail from './pages/CategoryDetail';
import CataloguesManagement from './pages/CataloguesManagement';

function App() {
  return (
    <Router>
      <AdminLayout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/category/:id" element={<CategoryDetail />} />
          <Route path="/catalogues" element={<CataloguesManagement />} />
        </Routes>
      </AdminLayout>
    </Router>
  );
}

export default App;
