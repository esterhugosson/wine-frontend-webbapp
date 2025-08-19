
import { Link, NavLink } from 'react-router-dom'
import wineLogo from '/wine-svgrepo-com.svg'
import './Navbar.css'

export const Navbar = () => {

        return (

            <nav>


                <Link to='/home' className='logo'>
                    <img src={wineLogo} alt="Wine Logo" />
                </Link>

        

                <ul className= 'nav-links' >
                    <li>
                        <NavLink to='/average' >Average</NavLink>
                    </li>

                    <li>
                        <NavLink to='/price' >Price Vs Points </NavLink>
                    </li>

                    <li>
                        <NavLink to='/topwines' > Top Wines </NavLink>
                    </li>

                    <li>
                        <NavLink to='/count' > Wine Count </NavLink>
                    </li>

                </ul>

            </nav>

        )
  
}

export default Navbar