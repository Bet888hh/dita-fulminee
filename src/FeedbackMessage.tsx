import React, { useEffect, useRef } from 'react'
import { FeedbackType } from './utilities'

const FeedbackMessage = ({ feedback, handleUpdateFeedback }: { feedback: FeedbackType, handleUpdateFeedback: (feedback: fee) => void }) => {

  const timerRef = useRef<number>(0);

  useEffect(() => {
    if (feedback === "giusto") {
      clearTimeout(timerRef.current)
      timerRef.current = setTimeout(() => {
        handleUpdateFeedback("niente")
      }, 2000);
    }
    return () => {
      clearTimeout(timerRef.current)
    }

  }, [feedback])

  return (
    <>
    <br />
      {!(feedback === "niente") && (
        <span style={{ color: `${feedback === "giusto" ? "green" : "red"}`,fontSize:"30px" }}>{feedback === "giusto" ? "giusto" : "sbagliato"}</span>
      )}
    </>
  );
}

export default FeedbackMessage