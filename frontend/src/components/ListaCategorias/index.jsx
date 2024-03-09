import { useState } from 'react';
import './ListaCategorias.css'
import { put } from '../../api';
import ModalPopup from '../ModalPopup';

function ListaCategorias({categoria}) {

    const[data, setData] = useState(null)
    const[error, setError] = useState(null)
    const[isFetching, setIsFetching] = useState(false)
    const[buttonPopup, setButtonPopup] = useState(false);
    const[vencedor, setVencedor] = useState('')

    function fecharModal() {
        setButtonPopup(false)
    }

    function organizaValor(value) {
        setVencedor(value)
    }

    const editarVencedor = async (event) => {

        event.preventDefault();
        
        const body = {
            vencedor 
        }
        
        try{
            put(`api/categoria/${categoria._id}`, body, setData, setError, fecharModal)
        } catch (error) {
            console.error('Erro ao editar a categoria', error)
        }
          
        
    };

    return (
        <>
            <div className='categoria'>
                <h2>{categoria.nome} - Indicados</h2>
                <div className='indicados'>
                    {categoria?.indicados?.map((indicado, i) => (
                        <span className='indicados' key={i}>{i+1} - {indicado}</span>
                        ))}
                </div>
                {categoria.vencedor === "" ? (
                <>
                    <h4>Vencedor: Não anunciado</h4>
                    <button className='btn-cat2' onClick={() => setButtonPopup(true)}>
                        Escolher vencedor
                    </button>
                </>
                ) : (
                <h4>Vencedor: {categoria.vencedor}</h4>)}
                
            </div>

            <ModalPopup trigger={buttonPopup} setTrigger={setButtonPopup}>
            <form className='formulario' onSubmit={(event) => editarVencedor(event.target.value)}>
                <h3>Escolha o vencedor dessa categoria!</h3>
                <div className='lista-suspensa'>
                    <label>{categoria.nome}</label>
                    <select required={true} value={categoria} onChange={evento => setVencedor(evento.target.value)} >
                        {categoria?.indicados?.map((indicado, i) => {
                            return <option key={i} value={indicado}>{indicado}</option>
                        })}    
                    </select> 
                </div>
                <div className='div1'>
                    <button className='btn btn-cat'>Votar</button>
                </div>
            </form>
            </ModalPopup>
        </>
    )
}

export default ListaCategorias