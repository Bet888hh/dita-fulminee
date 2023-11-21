export function formatTime(totalMilliseconds: number) {
   
    
    const totalSeconds = Math.floor(totalMilliseconds / 1000);
  
    
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    const remainingMilliseconds = totalMilliseconds % 1000;
  
    const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${String(remainingMilliseconds).padStart(3, '0')}`;
  
    return formattedTime;
  }

  export type FeedbackType = "niente" | "giusto" | "sbagliato";