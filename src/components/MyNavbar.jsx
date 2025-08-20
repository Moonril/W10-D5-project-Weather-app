import { Dropdown } from "react-bootstrap"
import { Link, useLocation } from "react-router-dom"

const MyNavbar = function() {
    return(
        <header>
        <nav className="navbar navbar-expand-md">
            <div className="container-fluid">
                {/* find better logo */}
                <Link to='/home' className="navbar-brand">
                <img src="weather-icon.png" alt="weather logo" width="50" height="50" />
                </Link>
              
              <div className="collapse navbar-collapse" id="navbarSupportedContent">

                </div>

                <Dropdown>
                    <Dropdown.Toggle variant="transparent" className="text-light">
                        Preferiti
                    </Dropdown.Toggle>

                    <Dropdown.Menu className="dropdown-menu dropdown-menu-end bg-black bg-dropdown">
                        <Link to='/cityweather/quercianella' className={location.pathname === '/cityweather/quercianella' ? 'dropdown-item text-light link-dark' : 'dropdown-item text-secondary link-dark'} >Quercianella</Link>
                        <Link to='/cityweather/barcelona' className={location.pathname === '/cityweather/barcelona' ? 'dropdown-item text-light link-dark' : 'dropdown-item text-secondary link-dark'} >Barcellona</Link>
                        <Link to='/cityweather/tokyo' className={location.pathname === '/cityweather/tokyo' ? 'dropdown-item text-light link-dark' : 'dropdown-item text-secondary link-dark'} >Tokyo</Link>
                        <Link to='/cityweather/seoul' className={location.pathname === '/cityweather/seoul' ? 'dropdown-item text-light link-dark' : 'dropdown-item text-secondary link-dark'} >Seoul</Link>
                        <Link to='/home' className={location.pathname === '/home' ? 'dropdown-item text-light link-dark' : 'dropdown-item text-secondary link-dark'} >Cerca</Link>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
          </nav>
    </header>
    )
}

export default MyNavbar