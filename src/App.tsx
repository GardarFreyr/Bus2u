import { Route, Routes } from 'react-router-dom'
import { BookingProvider } from './lib/booking'
import { ScrollManager } from './lib/ScrollManager'
import { DemoBar } from './components/DemoBar'
import { Navbar } from './components/Navbar'
import { Footer } from './components/Footer'
import Home from './pages/Home'
import TourDetail from './pages/TourDetail'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <BookingProvider>
      <ScrollManager />
      <a
        href="#efni"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-ice focus:px-4 focus:py-3 focus:text-navy"
      >
        Fara beint í efni
      </a>
      <DemoBar />
      <div className="relative">
        <Navbar />
        <main id="efni">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/ferdir/:slug" element={<TourDetail />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
      <Footer />
    </BookingProvider>
  )
}
