import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './shared/Navbar';
import { HomePage } from './pages/Home';
import { TermsPage } from './pages/Terms';
import { Footer } from './shared/Footer';

function App() {
  return (
    <Router>
      <div className='App'>
        {/* <Navbar /> */}
        <main>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/home' element={<HomePage />} />
            <Route path='/terms' element={<TermsPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
