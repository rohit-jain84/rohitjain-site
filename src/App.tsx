import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from './context/ThemeContext';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Projects } from './pages/Projects';
import { CaseStudies } from './pages/CaseStudies';
import { CaseStudyDetail } from './pages/CaseStudyDetail';
import { Blog } from './pages/Blog';
import { ArticleDetail } from './pages/ArticleDetail';
import { Services } from './pages/Services';
import { Contact } from './pages/Contact';
import { NotFound } from './pages/NotFound';

function App() {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/case-studies" element={<CaseStudies />} />
              <Route path="/case-studies/:slug" element={<CaseStudyDetail />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<ArticleDetail />} />
              <Route path="/services" element={<Services />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;
