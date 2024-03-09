import {useState} from 'react'
import './Formulario.css'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import { post} from '../../api/'

function Formulario({categoria, palpitou}) {

    const [palpite, setPalpite] = useState(categoria?.palpite)
    const [palpiteRealizado, setPalpiteRealizado] = useState(false)
    
    console.log(categoria)
    useEffect (() => {
        if(categoria?.palpite) {
            setPalpiteRealizado(true)
        }
    })

    const aoPalpitar = ((e) => {
        e.preventDefault()
        
        const body = {
            categoria: categoria._id, palpite,
        }
        
        if(!palpite) {
            toast.error("Não é possível fazer um palpite vazio")
        } else {
            post('api/palpites', body, palpitou)
            setPalpiteRealizado(true)
        }
        
    }) 

    function handleChange(value) {
        setPalpite(value)
    }

    return (
        <>
        {categoria.ativo === true && !palpiteRealizado &&
            <form onSubmit={aoPalpitar}>
                <div className='palpite'>
                    <h3>{categoria.nome}</h3>
                        <div className='categorias'>
                            {categoria?.indicados.map(categoria => (
                                <div className='categorias-inside'>
                                    <input type='radio' id={categoria} name="categoria" key={categoria} value={categoria} onChange={e => handleChange(e.target.value)}/>
                                    {categoria} 
                                </div>
                                
                            ))}    
                            
                            </div>
                
                    <button className='btn btn-block2'>Votar</button>
                </div>
            </form>
        }
        {palpiteRealizado && categoria.acertou === "" && <div className='palpite'>
            <h1>{categoria.nome}</h1>
            <h4>Você já votou nessa categoria!</h4>
            <h4>Seu palpite foi {categoria.palpite}!</h4>
            <h4>O vencedor dessa categoria ainda não foi anunciado!</h4>
        </div>}
        {palpiteRealizado && categoria.acertou === "S" && <div className='palpiteWin'>
            <h1>{categoria.nome}</h1>
            <h4>Você já votou nessa categoria!</h4>
            <h4>Seu palpite foi {categoria.palpite}!</h4>
            <h4>Parabéns, você acertou! O vencedor dessa categoria foi {categoria.vencedor}!</h4>
        </div>}
        {palpiteRealizado && categoria.acertou === "N" && <div className='palpiteLose'>
            <h1>{categoria.nome}</h1>
            <h4>Você já votou nessa categoria!</h4>
            <h4>Seu palpite foi {categoria.palpite}!</h4>
            <h4>Que pena, você errou! O vencedor dessa categoria foi {categoria.vencedor}!</h4>
        </div>}

        {categoria.ativo === false && !palpiteRealizado && categoria.vencedor === "" && <div className='palpite'>
            <h1>{categoria.nome}</h1>
            <h4>Não é mais possível votar nessa categoria!</h4>
            <h4>Você não votou em ninguém!</h4>
            <h4>O vencedor dessa categoria ainda não foi anunciado!</h4>
        </div>}
        {categoria.ativo === false && !palpiteRealizado && (categoria.vencedor !== "") && <div className='palpite'>
            <h1>{categoria.nome}</h1>
            <h4>Não é mais possível votar nessa categoria!</h4>
            <h4>Você não votou em ninguém!</h4>
            <h4>O vencedor dessa categoria foi {categoria.vencedor}!</h4>
        </div>}
        </>
    )
}

export default Formulario