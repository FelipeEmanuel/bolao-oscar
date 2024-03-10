import {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import Header from '../components/Header'
import { get } from '../api'
import { ordenarRanking } from '../utils'
import Spinner from '../components/Spinner'


function Ranking() {

    const user = JSON.parse(localStorage.getItem('user'))
    const navigate = useNavigate()
    const [data, setData] = useState(null)
    const [error, setError] = useState(null)
    const [isFetching, setIsFetching] = useState(true)
    const [users, setUsers] = useState(null)
  
    useEffect(() => {
        if(!user) {
        navigate('/')
        }

    }, [user, navigate])

    useEffect(() => {
        get("api/palpites/allPalpites", setData, setError, setIsFetching)
    }, [])

    useEffect(() => {
        if(data) {
            data?.users?.forEach(u => {   
                u.acertos = 0;
                u.palpites.forEach(p => {
                    data?.categorias.forEach(c => {
                        if(p.categoria === c._id) {
                            if(c.vencedor !== '') {
                                if(p.palpite === c.vencedor) {
                                    u.acertos += 1;
                                } else {
                                    u.acertos += 0;
                                }
                            }       
                        }  
                    })
                    
                })
            })

            data?.users?.sort(ordenarRanking).reverse()
            setUsers(data.users)
            
        }
    }, [data])
    if(isFetching) {
        return <Spinner />
    }

    return (
        <>
            {users?.length > 0 && <section className='container'>
                <Header />
                <section className='ranking'>
                    <div className='ranking-cabecalho'>
                    <div className='ranking-col-1'>Posição</div>
                    <div className='ranking-col-2'>Nome</div>
                    <div className='ranking-col-1'>Acertos</div>
                    </div>
                    <p className='linha'></p>
                    {
                        users?.map((u, key) => {
                            return (
                            <div className='pos' key={key}>
                                <div className='ranking-col-1'>{ key + 1 }</div>
                                <div className='ranking-col-3'>
                                    <span>{ u.name }</span>
                                </div>
                                <div className='ranking-col-1'>{ u.acertos }</div>    
                            </div>

                            )
                        })
                    }
                </section>
                <p className='linha'></p>
                <h3 className='regras'>O ranking será atualizado sempre que o vencedor de uma categoria for registrado no sistema!</h3>
                <h2 className='regras'>Regras de Pontuação</h2>
                <p className='texto'>- Acertar o vencedor: <b>1 ponto</b>! Errar: <b>0 pontos</b>! </p>
                <p className='texto'>- Em possíveis empates, o critério de desempate é de quem acertar a categoria mais importante na ordem, caso haja um empate completo ai é na ordem alfabética.</p>
                
                {/*<section className='ranking'>
                    {
                        data?.categorias?.map((c, key) => {
                            return (
                                <span>{c.nome}</span>
                        )})
                    }

                </section>*/}
            </section>}
            {users?.length === 0 && <section className='container'>
                <Header />
                <h1>Não há usuários cadastrados.</h1>
            </section>}
        </>
    )
}

export default Ranking