import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../auth/authService'
import oscars from '../assets/Oscars-2024.png'
//import Spinner from '../components/Spinner/Spinner'

function Login() {

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const { email, password } = formData

  const navigate = useNavigate()

  const user = JSON.parse(localStorage.getItem('user'))

  useEffect(() => {
    if(user) {
      navigate('/')
    }

  }, [user, navigate])
  
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()

    const userData = {
      email,
      password,
    }

    login(userData).then(response => {
      if(response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
        alert('Login efetuado com sucesso!')
        navigate('/home')
      }
    })
    .catch((error) => {
        console.log(error);
        alert('Dados incorretos!')
    })
    
  }

  /*if (isFetching) {
    return <Spinner />
  }*/

  return (
    <>
      <section className='container'>
        <section className='heading'>
            <img
                src={oscars}
                alt='Imagem do Oscars'
                style={{
                    width: '40em',
                    height: '20em',
                    padding: '15px',
                }}
                >
            </img>
            <h1>Bem-vindo ao Bolão do Oscar 2024!</h1>
            <p>Faça login e aposte nos vencedores!</p>
        </section>

        <section className='form'>
            <form onSubmit={onSubmit}>
            <div className='form-group'>
                <input
                type='email'
                className='form-control'
                id='email'
                name='email'
                value={email}
                placeholder='Coloque seu email'
                onChange={onChange}
                />
            </div>
            <div className='form-group'>
                <input
                type='password'
                className='form-control'
                id='password'
                name='password'
                value={password}
                placeholder='Coloque sua senha'
                onChange={onChange}
                />
            </div>

            <div className='form-group'>
                <button type='submit' className='btn btn-block'>
                  Entrar
                </button>
                <Link to='/cadastrar' className='btn btn-block'>
                  Cadastre-se
                </Link>
                
            </div>
            </form>
        </section>
      </section>
    </>
  )
}

export default Login