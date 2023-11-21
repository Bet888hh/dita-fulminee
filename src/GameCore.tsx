import React, { useRef, /* useLayoutEffect,useState */useEffect,useState,useCallback,memo } from 'react'
import FeedbackMessage from './FeedbackMessage'
import "./App.css";
import { FeedbackType, formatTime } from './utilities';
import { ListaPunteggio } from './ListaPunteggio';
const GameCore = ({showTimer,parole,isGameOn,replayGame}:{parole:string[],isGameOn:boolean,showTimer:boolean,replayGame:()=>void}) => {


    const inputRef = useRef<HTMLInputElement | null>(null);
    const timerRef = useRef<number>(0);
    const [time,setTime]= useState(0);
    const [step,setStep]= useState(1);
    const [isGameFinished,setIsGameFinished]= useState(false);
    const [showListaTempi,setShowListaTempi]= useState(false);
    const [currentWord,setCurrentWord]= useState<string>("");
    const [tempi,setTempi] = useState<number[]>([])
    const [isStartingaNewGame,setIsStartingaNewGame]= useState(false);
    const[feedback, setfeedback] = useState<FeedbackType>("niente")
    console.log("is starting",isStartingaNewGame);
    console.log("ison",isGameOn);
    console.log("isfinished",isGameFinished);
    
   
    const updateTime = useCallback(()=>{
        setTime(time=>time+60)
    },[])
   
    const handleUpdateFeedback = useCallback((feedback:FeedbackType):void=>{
        setfeedback(feedback);
    },[])
   
  
    const wrongAlert = useCallback(():void=>{
       inputRef.current && (inputRef.current.value = '');
       setfeedback('sbagliato')
    },[])


    const correctNextWord = useCallback((): void => {
        if ((step + 1) < 11) {
            setStep(prev => prev + 1)
            inputRef.current && (inputRef.current.value = '');
            setTempi(prev=>[...prev,time])
            clearInterval(timerRef.current)
            setCurrentWord(parole[step])
            setTime(0)
            timerRef.current = setInterval(updateTime,60)
            setfeedback('giusto')
        } else {
            
            // se non faccio save sul codice e non ci sono altri interval funziona...
            setfeedback('giusto')
            setTempi(prev=>[...prev,time])
            inputRef.current && (inputRef.current.value = '');
            clearInterval(timerRef.current)
            setIsGameFinished(true)
        }
    }, [parole, step, time, updateTime])


    const guessWord = useCallback((word:string):void=>{
        word==currentWord?correctNextWord():wrongAlert()
    },[correctNextWord, currentWord, wrongAlert])






    const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
        console.log("ee");
        
        event.preventDefault()
        event.stopPropagation()

        const form = event.currentTarget.elements as HTMLFormControlsCollection;
       
        guessWord((form.namedItem('guess') as HTMLInputElement)?.value);
      
    }

    /*    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>): void => {
           if (event.key === 'Enter') {
               // Se il tasto "Invio" è stato premuto, esegui il submit del modulo
               formRef.current?.submit();
           }
       } */

       useEffect(() => {
        if(isGameOn){
            timerRef.current = setInterval(updateTime,60)
            setCurrentWord(parole[0])
            inputRef.current?.focus();
            setIsGameFinished(false)
        }
        setIsStartingaNewGame(false)
       }, [isGameOn, parole, updateTime])
       

       const handleReplayGame = useCallback(() => {
        setStep(1)
        setTime(0)
        setTempi([])
        replayGame()
        setIsGameFinished(false)
        setIsStartingaNewGame(false)
        setShowListaTempi(false)
       }, [replayGame]);
    function handleListaTempi(event: MouseEvent<HTMLButtonElement, MouseEvent>): void {
        setShowListaTempi(prev=>!prev)
    }

    return (
      <>
        <form onSubmit={handleSubmit}>
       

          {(showTimer || isGameOn) && !isGameFinished && (
            <>
               {isGameOn && (
            <>
              {/**fai timer a parte*/}
              <h2> {formatTime(time)}</h2>
              <div className="hud">
                { (
                  <h2 className="word-select">-{"  " + currentWord}</h2>
                )}

                <h2>-step {step}/10</h2>
              </div>
            </>
          )}
           {(showTimer || isGameOn) && isStartingaNewGame || !isGameFinished  &&
           <>
              <input
                disabled={!isGameOn}
                ref={inputRef}
                name="guess"
                type="text" /* onKeyDown={handleKeyDown} */
              />
              <FeedbackMessage feedback={feedback} handleUpdateFeedback= {handleUpdateFeedback} />
              </>}
            </>
          )}

        </form>
          {isGameFinished && <>
         {tempi.length>0&& <h1>{formatTime(tempi.reduce((accumulator, currentValue) =>  (accumulator + currentValue), 0))}</h1>}
          <button onClick={handleListaTempi}> Dettaglio </button>
          <button onClick={handleReplayGame} >Reinizia Gioco!</button>
         {tempi.length>0 && showListaTempi && <ListaPunteggio parole = {parole} listaTempi={tempi}/>}
          </>}
      </>
    );
}

export default memo(GameCore)