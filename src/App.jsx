
// react 
import { BrowserRouter, Route, Routes } from 'react-router-dom'

// components
import Components from './pages/components'
import AppLayout from './layouts/AppLayout'
import Todos from './pages/Todos'
import Home from './pages/Home'
import Calculator from './pages/Calculator'
import Animation from './pages/Animation'
import ForwardToHome from './pages/ForwardToHome'
import Products from './pages/Products'
import Carts from './pages/Carts'
import Login from './pages/Login/Login'


import { fetchProducts } from './data/products'

// styles

import './App.css'
import { useState, useEffect } from 'react'

function App() {
  const [token, setToken] = useState('')
  const [role, setRole] = useState('')

  const [products, setProducts] = useState([])
  const [carts, setCarts] = useState([])

  useEffect(() => setProducts(fetchProducts()), [])
  useEffect(() => console.log(products), [products])

  if (token === '') {
    return (<Login setToken={setToken} setRole={setRole}/>)
  } else {

    return (
      <BrowserRouter basename='/csi205/'>
        <Routes>
          <Route element={<AppLayout products={products} carts={carts} setToken={setToken}/>}>
            <Route path='animation' element={<Animation />} />
            <Route path='calculator' element={<Calculator />} />
            <Route path='components' element={<Components />} />
            <Route path='todos' element={<Todos />} />
            <Route path='*' element={<ForwardToHome />} />
            <Route path='products' element={<Products
              products={products}
              carts={carts}
              setCarts={setCarts} />} />
            <Route path='carts' element={<Carts carts={carts} setCarts={setCarts} />} />
            <Route path='home' element={<Home />} />
          </Route>
        </Routes>
      </BrowserRouter>
    )

  }
}

export default App