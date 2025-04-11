import { Button } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'

const NotFound = function () {
  const navigate = useNavigate() 



  return (
    <div className="text-center mt-4">
      <h2 className='text-light'>404 - Movie non trovata</h2>
      <p className='text-light'>
        Vuoi tornare in <Link to="/">HOME</Link>?
      </p>
      <p className='text-light'>
        Puoi anche utilizzare questo{' '}
        <Button
          variant="primary"
          onClick={() => {
            navigate('/') 
          }}
        >
          BUTTON
        </Button>
      </p>
    </div>
  )
}

export default NotFound