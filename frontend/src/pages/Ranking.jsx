import {useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import Header from '../components/Header'


function Ranking() {

  const user = JSON.parse(localStorage.getItem('user'))
  const navigate = useNavigate()
  
  useEffect(() => {
    if(!user) {
      navigate('/')
    }

  }, [user, navigate])


  /*if(isFetching) {
    return <Spinner />
  }*/


  return (
    <>
        <section className='container'>
            <Header />
            <h1>Em breve.</h1>
        </section>
      
    </>
  )
}

export default Ranking