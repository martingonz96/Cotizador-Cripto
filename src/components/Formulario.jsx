
import { useEffect, useState } from 'react'
import styled from "@emotion/styled"
import useSelectMonedas from '../hooks/useSelectMonedas'
import { monedas } from '../data/monedas'
import Error from './Error'
import Resultado from './Resultado'


const InputSubmit = styled.input`
    background-color: #9497FF;
    border: none;
    width: 100%;
    padding: 10px;
    color: #FFF;
    font-weight: 700;
    text-transform:uppercase;
    font-size:20px;
    border-radius:5px;
    transition: background-color .3s ease;

    &:hover {
        background-color: #7A7DFE;
        cursor: pointer;
    }
`

const Formulario = ({setMonedas}) => {

const [ error, setError ] = useState(false)

const [ criptos, setCriptos ] = useState([])

const [ moneda, SelectMonedas ] = useSelectMonedas('Elige tu moneda', monedas)

const [ criptomoneda, SelectCriptoMoneda ] = useSelectMonedas('Elige tu cripto moneda', criptos)

useEffect(()=>{
  const consultarApi = async () =>{
      const url = "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=20&tsym=USD"

      const respuesta = await fetch(url)
      const resultado = await respuesta.json()

      const arrayCripto = resultado.Data.map( cripto => {
        const objeto = {
            id: cripto.CoinInfo.Name,
            nombre: cripto.CoinInfo.FullName
        }

        return objeto
      })

      setCriptos(arrayCripto)
  }
  consultarApi()
},[])

const handleSubmit = e => {
  e.preventDefault()
  
  if([moneda, criptomoneda].includes("")){
    setError(true)
  }

  setError(false)
  setMonedas({
    moneda,
    criptomoneda
  })
  
}

  return (
    <>
    {error && <Error>Todos los campos son obligatorios</Error>}
    <form onSubmit={handleSubmit}>

        <SelectMonedas/>
        <SelectCriptoMoneda/>
   

        <InputSubmit 
        type="submit" 
        value="Cotizar" 
        />
    </form>
    </>
  )
}

export default Formulario