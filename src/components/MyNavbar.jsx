import { Dropdown } from "react-bootstrap"
import { Link } from "react-router-dom"

const MyNavbar = function() {
    return(
        <header>
        <nav className="navbar navbar-expand-md">
            <div className="container-fluid">
                {/* find better logo */}
                <Link to='/' className="navbar-brand">
                <img src="weather-icon.png" alt="weather logo" width="50" height="50" />
                </Link>
              
              <div className="collapse navbar-collapse" id="navbarSupportedContent">

                </div>

                <Dropdown>
                    <Dropdown.Toggle variant="transparent" className="text-light">
                        Preferiti
                    </Dropdown.Toggle>

                    <Dropdown.Menu className="dropdown-menu dropdown-menu-end bg-black">
                        <Link to='/cityweather' className={location.pathname === '/profile' ? 'dropdown-item text-light link-dark' : 'dropdown-item text-secondary link-dark'} >Quercianella</Link>
                        <Link to='/cityweather' className={location.pathname === '/notifications' ? 'dropdown-item text-light link-dark' : 'dropdown-item text-secondary link-dark'} >Barcellona</Link>
                        <Link to='/cityweather' className={location.pathname === '/search' ? 'dropdown-item text-light link-dark' : 'dropdown-item text-secondary link-dark'} >Montevarchi</Link>
                        <Link to='/cityweather' className={location.pathname === '/settings' ? 'dropdown-item text-light link-dark' : 'dropdown-item text-secondary link-dark'} >Tokyo</Link>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
          </nav>
    </header>
    )
}

export default MyNavbar