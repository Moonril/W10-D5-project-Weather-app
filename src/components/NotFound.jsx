import { Button } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'

const NotFound = function () {
  const navigate = useNavigate() 



  return (
    <div className="text-center mt-4">
      <h2 className='text-light'>404 - City not found <i className="bi bi-emoji-frown"></i></h2>
      <p className='text-light'>
        Do you want to go back to the <Link to="/home">Home Page</Link>?
      </p>
    </div>
  )
}

export default NotFound