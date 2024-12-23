import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
// import Home from './components/Home'
import Home from './components/Home'
// import Login from './components/Login'
import Login from './components/Login'
// import Signup from './components/Signup'
import Signup from './components/Signup'
// import Products from './components/Products'
import Products from './components/Products'
// import Cart from './components/Cart'
import Cart from './components/Cart'
import SellerSignup from './components/SellerSignup'
import AddProduct from './components/AddProduct'
import PlaceOrder from './components/PlaceOrder'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/products" element={<Products />} />
        <Route path="/cart" element={<Cart />} />
        <Route path='/seller-signup' element={<SellerSignup />} />
        <Route path="/create-product" element={<AddProduct />} />
        <Route path="/place-order" element={<PlaceOrder />} />
      </Routes>
    </Router>
  )
}

export default App

