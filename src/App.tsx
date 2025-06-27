import './App.css'
import { Link, Outlet } from 'react-router-dom'



function App() {
  console.log('app ocmponent rendered')
  return (
    <div className="main">
      <div className="navbar">
            <Link to="/" className="home-btn">Home</Link>
            <Link to="shop" className="btn-shop">Shop</Link>
            <Link to="cart" className="btn-cart">Cart</Link>
      </div>
      <div className="content">
        <Outlet/>
      </div>
    </div>
  )
}

export default App
