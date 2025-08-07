
import { Link, NavLink } from 'react-router-dom'
import './Navbar.css'

export const Navbar = () => {

        return (

            <nav>


                <Link to='/home' className='title'>The Wine Experts</Link>

        

                <ul className= 'nav-links' >
                    <li>
                        <NavLink to='/average' >Average</NavLink>
                    </li>

                    <li>
                        <NavLink to='/price' >Price Vs Points </NavLink>
                    </li>

                    <li>
                        <NavLink to='/topwines' > Top varieties </NavLink>
                    </li>

                    <li>
                        <NavLink to='/count' > Wine count </NavLink>
                    </li>

                </ul>

            </nav>

        )
  
}

export default Navbar