import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Home } from './pages/HomePage';
import { ContentPage } from './pages/ContentPage';
import './styles/index.css';

function App() {
  console.log("Virtus App Rendering...");
  return (
    <LanguageProvider>
      <Router>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <div className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<ContentPage titleEn="Products Page" titleTh="หน้าสินค้า" />} />
              <Route path="/about" element={<ContentPage titleEn="About Us Page" titleTh="หน้าเกี่ยวกับเรา" />} />
              <Route path="/join" element={<ContentPage titleEn="Join Us Page" titleTh="หน้าน่วมงานกับเรา" />} />
              <Route path="/contact" element={<ContentPage titleEn="Contact Us Page" titleTh="หน้าติดต่อเรา" />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </LanguageProvider>
  );
}

export default App;
