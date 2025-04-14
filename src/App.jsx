import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.min.css'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import MyFooter from './components/MyFooter'
import MyNavbar from './components/MyNavbar'
import NotFound from './components/NotFound'
import MainSearch from './components/MainSearch'
import CityWeather from './components/CityWeather'

function App() {


  return (
    <BrowserRouter>
      <div className='d-flex flex-column vh-100'>
        <MyNavbar />
          <main className='flex-grow-1'>
        <Routes>

            <Route path="/" element={<MainSearch />} />
            <Route path="/cityweather/:cityName" element={<CityWeather />} />
            
            <Route path="*" element={<NotFound />} />
        </Routes>
          </main>
        <MyFooter />
      </div>
    </BrowserRouter>
  )
}

export default App
