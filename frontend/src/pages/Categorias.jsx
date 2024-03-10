import {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import Header from '../components/Header'
import { get } from '../api'
import ListaCategorias from '../components/ListaCategorias'
import Spinner from '../components/Spinner'
//import Spinner from '../components/Spinner/Spinner.jsx'

function Categorias() {

  const user = localStorage.getItem('user')
  const navigate = useNavigate()
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const [isFetching, setIsFetching] = useState(true)
  
  useEffect(() => {
    if(!user) {
      navigate('/')
    }

  }, [user, navigate])

  useEffect(() => {
    get("api/categoria", setData, setError, setIsFetching)
  }, [data])

  if(isFetching) {
    return <Spinner/>
  } 

  return (
    <>
        <section className='container'>
            <Header/>
            {
                data?.length > 0 && 
                <div className='palpites'>
                    {
                        data?.map((categoria) => (
                            <ListaCategorias key={categoria._id} categoria={categoria} />
                        ))
                    }

                </div>
            }  
        </section>
               
    </>
  )
}

export default Categorias