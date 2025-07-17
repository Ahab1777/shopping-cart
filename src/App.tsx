import './styles/reset.css'
import './styles/colors.css'
import './styles/App.css'
import './styles/fonts.css'
import { Outlet } from 'react-router-dom'
import { CartProvider } from './components/CartProvider/CartProvider';
import Navbar from './components/Navbar/Navbar';

export interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: {
        rate: number;
        count: number;
    };
}





function App() {
    return (
        <CartProvider>
            <div className='main'> 
                <Navbar />
                <div className="content" aria-label="Main content">
                    <Outlet/>
                </div>
                <footer aria-label="Site footer">
                    <p>by: Leonardo de Pinho - © 2025 The Odin Project. Fake shop website for educational purposes.  
                    <a href='https://github.com/Ahab1777/shopping-cart'>GitHub</a>
                    </p>
                </footer>
            </div>
        </CartProvider>
    )
}

export default App
