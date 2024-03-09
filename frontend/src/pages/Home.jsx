import {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import Header from '../components/Header'
import Formulario from '../components/Formulario'
import { get } from '../api'
//import Spinner from '../components/Spinner/Spinner.jsx'

function Home() {

  const user = localStorage.getItem('user')
  const navigate = useNavigate()
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const [isFetching, setIsFetching] = useState(false)
  const [palpitou, setPalpitou] = useState(null)
  const [categorias, setCategorias] = useState(null)
  const [qtdPalpitou, setQtdPalpitou] = useState(0);
  const [qtdNaoPalpitou, setQtdNaoPalpitou] = useState(0);
  const [usuario, setUsuario] = useState(null)
  
  useEffect(() => {
    if(!user) {
      navigate('/')
    }

  }, [user, navigate])

  useEffect(() => {
    get("api/palpites/palpites", setData, setError, setIsFetching)
  }, [palpitou])

  useEffect(() => {
    get('/api/users/me', setUsuario, setError, setIsFetching)
  })

  useEffect(() => {
    if(data) {

      data?.categorias?.forEach(c => {
        c.acertou = "";
        data?.userPalpites?.forEach(p => {
          if(p.categoria._id === c._id) {
            if(c.vencedor === '') {
              c.acertou = "";
            } else if(p.palpite === c.vencedor) {
              c.acertou = "S";
            } else {
              c.acertou = "N";
            }
          }
        })
      })

      data?.userPalpites?.forEach(p => {
        data?.categorias?.forEach(c => {
          if(p.categoria._id === c._id) {
            c.palpite = p.palpite;
          }
        })
      })          
        
      setCategorias(data?.categorias)

      let qtdPalpitesUser = 0
      data?.categorias.forEach(cd => {
        data?.userPalpites?.forEach(up => {
          if(cd._id === up.categoria._id) {
            qtdPalpitesUser+=1;
          } 
        })
      });

      const qtdCategorias = data?.categorias.length - qtdPalpitesUser 
      setQtdPalpitou(qtdPalpitesUser)
      setQtdNaoPalpitou(qtdCategorias)
    }
  }, [data])

  /*if(isFetching) {
    return <Spinner/>
  } */

  return (
    <>
        <section className='container'>
            <Header/>
            <section className='top-container'>
                <h1>Bem-vindo, {usuario?.name}!</h1>
                <br/>
                <h3 className='alerta'>INSTRUÇÕES!</h3> 
                <h3 className='alerta'>- Você pode palpitar até antes do início do Oscar (Domingo 20h)!</h3>
                <h3 className='alerta'>- É necessário palpitar em uma categoria por vez, depois de palpitar não é possível trocar o voto, pense bem!</h3>
                <h3 className='alerta'>- Após votar o palpite que você fez ficará sendo exibido no mesmo local que você votou!</h3>
                <h3 className='alerta'>- Caso você acerte o vencedor da categoria, o seu palpite ficará colorido!</h3>   
            </section>
            <section className='main-container'>
              <h2>Palpite abaixo nas categorias do Oscar!</h2> 
              {
              categorias?.length > 0 && 
              <h4>Das {categorias?.length} categorias disponíveis para palpitar, você já palpitou em {qtdPalpitou}!</h4> &&
              <h4 className='falta-palpite'>Falta palpitar em {qtdNaoPalpitou} categoria(s)!</h4> &&
                <div className='palpites'>
                      {
                        categorias?.map((categoria) => (
                          <Formulario key={categoria._id} categoria={categoria} palpitou={setPalpitou}/>
                          ))
                        }

                  </div>
              }
              {
                categorias?.length === 0 &&
                <div className='main-container'>
                  <h3>Não existem categorias cadastradas.</h3>
                </div>
              }  
            </section>
        </section>
               
    </>
  )
}

export default Home