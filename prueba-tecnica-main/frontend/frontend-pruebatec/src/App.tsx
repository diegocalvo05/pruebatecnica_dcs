import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import { ProductsProvider } from './context/ProductContextProvider'

const App = () => {
  return (
    <>
      <ProductsProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </BrowserRouter>
      </ProductsProvider>
    </>
  )
}

export default App
