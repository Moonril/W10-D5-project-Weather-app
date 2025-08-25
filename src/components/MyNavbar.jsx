import { Dropdown } from "react-bootstrap"
import { Link, useLocation } from "react-router-dom"

const MyNavbar = function() {
    const location = useLocation()
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

                    <Dropdown.Menu className="dropdown-menu dropdown-menu-end bg-black bg-dropdown">
                        <Dropdown.Item as={Link} to={'/cityweather/quercianella'} className={location.pathname === '/cityweather/quercianella' ? 'dropdown-item text-light link-dark' : 'dropdown-item text-secondary link-dark'} >Quercianella</Dropdown.Item>

                        <Dropdown.Item as={Link} to={'/cityweather/barcelona'} className={location.pathname === '/cityweather/barcelona' ? 'dropdown-item text-light link-dark' : 'dropdown-item text-secondary link-dark'} >Barcelona</Dropdown.Item>
                       
                        <Dropdown.Item as={Link} to={'/cityweather/tokyo'} className={location.pathname === '/cityweather/tokyo' ? 'dropdown-item text-light link-dark' : 'dropdown-item text-secondary link-dark'} >Tokyo</Dropdown.Item>


                        <Dropdown.Item as={Link} to={'/cityweather/seoul'} className={location.pathname === '/cityweather/seoul' ? 'dropdown-item text-light link-dark' : 'dropdown-item text-secondary link-dark'} >Seoul</Dropdown.Item>

                        <Dropdown.Item as={Link} to={'/'} className={location.pathname === '/' ? 'dropdown-item text-light link-dark' : 'dropdown-item text-secondary link-dark'} >Cerca</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
          </nav>
    </header>
    )
}

export default MyNavbar