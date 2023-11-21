import React from 'react'
import { formatTime } from './utilities'

export const ListaPunteggio = ({listaTempi, parole}:{listaTempi:number[],parole :string []}) => {
  return (
    <>

    <ul>
        {listaTempi.map((el,index)=>(<li> {parole[index]+" "+formatTime(el)}</li>))}
    </ul>
    <h4>tempo totale {formatTime(listaTempi.reduce((accumulator, currentValue) =>  (accumulator + currentValue), 0))}</h4>
   
    </>
  )
}
