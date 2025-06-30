import './App.css'
import { Link, Outlet } from 'react-router-dom'



function App() {
  return (
    <>
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
    <footer>
      <p>by: Leonardo de Pinho - © 2025 The Odin Project. Fake shop website for educational purposes.  
        <a 
          href='https://github.com/Ahab1777/shopping-cart'
          >GitHub</a>
      </p>
    </footer>
    </>
  )
}

export default App
