import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import SalesPage from './pages/SalesPage';
import BuildLedger from './pages/BuildLedger';
import ReceiptsVault from './pages/ReceiptsVault';
import LoginPage from './pages/LoginPage';
import AuthGuard from './components/AuthGuard';

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <main className="max-w-7xl mx-auto py-8 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/*"
          element={
            <AuthGuard>
              <Layout>
                <Routes>
                  <Route path="/" element={<SalesPage />} />
                  <Route path="/ledger" element={<BuildLedger />} />
                  <Route path="/vault" element={<ReceiptsVault />} />
                </Routes>
              </Layout>
            </AuthGuard>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
