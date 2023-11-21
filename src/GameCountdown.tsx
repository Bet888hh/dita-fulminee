import React,{memo,useCallback,useEffect,useRef,/* ,useMemo,useCallback,useState */
useState} from 'react'

const GameCountdown = ({timeoutFinished}:{timeoutFinished:()=>void}) => {

   
    const [count, setCount] = useState(3)
    const intervalRef = useRef(0)
 
 
    useEffect(()=>{
      intervalRef.current= setInterval(()=>{
            setCount(prev=>prev-1)
        },1000)
        return () => clearInterval(intervalRef.current);
    },[])

    const manageTimeoutFInishing = useCallback(()=>{
        clearInterval(intervalRef.current)
        timeoutFinished()
     },[])

     
    useEffect(()=>{
       count==0 && manageTimeoutFInishing()
      
    },[count, manageTimeoutFInishing])

   
   
  return (
    <>
        <h1>...{count}</h1>
    </>
  )
}

export default memo(GameCountdown)