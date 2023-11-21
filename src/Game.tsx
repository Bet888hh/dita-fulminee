import React,{memo,useCallback,useEffect,useRef,/* ,useMemo,useCallback,useState */
useState} from 'react'

import GameCountdown from "./GameCountdown";
import GameCore from './GameCore';

const Game = () => {
  const [showTimer, setShowTimer] = useState(false);
  const [isGameOn,setIsGameOn]= useState(false);
  const [parole,setParole]= useState<string[]>([])


  const timeoutFinished = useCallback(() => {
   
    //fetch qui cosi appena il tempo finisce e inizia il timer di gioco ho già la parola 
     fetch("https://random-word-api.herokuapp.com/word?lang=it&number=10").then(r=>{
      console.log(r.status)
      return r.json()
    }).then((r:string[])=>{
      setParole(r)
      setShowTimer(false);
      setIsGameOn(true)
      }) 

     /*  setParole(['apple', 'banana', 'orange', 'grape', 'kiwi', 'melon', 'pear', 'peach', 'strawberry', 'blueberry'])
      setShowTimer(false);
      setIsGameOn(true)
 */
  }, []);

  const startBeginGame = useCallback(() => {
   
    //funzione che farà partire il componente game timer
    setShowTimer(true)
  }, []);



 



  const replayGame = useCallback(() => {
   setIsGameOn(false)
   startBeginGame()
  }, [startBeginGame]);



  return (
    <>
      {showTimer && <GameCountdown timeoutFinished={timeoutFinished} />}
      
      {!isGameOn && !showTimer && (
        <button onClick={startBeginGame}>inizia!!!!</button>
      )}        
              <GameCore  replayGame={replayGame} showTimer={showTimer} isGameOn={isGameOn} parole={parole&&parole}/>
             
    </>
  );
};

export default Game;
