import { createContext, useState } from "react";

const ExpressionContext = createContext();

const ExpressionContextProvider = ({ children }) => {
  const [expressions, setExpressions] = useState([{ mood: "neutral", probability: 0 }, { mood: "happy", probability: 0 }, { mood: "sad", probability: 0 }, { mood: "surprise", probability: 0 }, { mood: "fear", probability: 0 }, { mood: "disgust", probability: 0 }, { mood: "angry", probability: 0 }]);
  const [winnerMood, setWinnerMood] = useState(null)
  
  return (
    <ExpressionContext.Provider value={{ expressions, setExpressions, winnerMood, setWinnerMood }}>
        {children}
    </ExpressionContext.Provider>
  );
};

export { ExpressionContext, ExpressionContextProvider };