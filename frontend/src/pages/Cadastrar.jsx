import {useState, useEffect} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import {FaArrowLeft, FaUser} from 'react-icons/fa'
import { register } from '../auth/authService'
//import Spinner from '../components/Spinner/Spinner'


function Cadastrar() {

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  })

  const {name, email, password, password2} = formData

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

    if (password !== password2) {
      toast.error('Senhas diferentes!')
    } else {
      const userData = {
        name,
        email,
        password,
      }

    register(userData).then(response => {
      if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
        alert('Usuário cadastrado com sucesso')
        navigate('/')
      }
    })
    .catch((error) => {
        console.log(error);
        alert('Esse e-mail já está sendo utilizado por algum usuário!')
    })
      
    }
  }

  /*if (isLoading) {
    return <Spinner />
  }*/
  
  return (
    <>
        <section className='container'>
            <section className='heading'>
                <button className='back-btn'>
                    <Link to='/'>
                        <FaArrowLeft size={15}/>Voltar
                        
                    </Link>
                </button>
                <h1>
                    <FaUser /> Crie uma conta!
                </h1>
            </section>

            <section className="form">
                <form onSubmit={onSubmit}>
                <div className='form-group'>
                    <input type="text" className="form-control" id="name" 
                    name="name" value={name} placeholder='Coloque seu nome'
                    onChange={onChange}
                    />
                </div>
                <div className='form-group'>
                    <input type="email" className="form-control" id="email" 
                    name="email" value={email} placeholder='Coloque seu e-mail'
                    onChange={onChange}
                    />
                </div>
                <div className='form-group'>
                    <input type="password" className="form-control" id="password" 
                    name="password" value={password} placeholder='Coloque sua senha'
                    onChange={onChange}
                    />
                </div>
                <div className='form-group'>
                    <input type="password" className="form-control" id="password2" 
                    name="password2" value={password2} placeholder='Confirme sua senha'
                    onChange={onChange}
                    />
                </div>
                <div className='form-group'>
                    <button type='submit' className='btn btn-block'>
                    Cadastrar
                    </button>
                </div>
                </form>
            </section>
        </section>
    </>
  )
}

export default Cadastrar