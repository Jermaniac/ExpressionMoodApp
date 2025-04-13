import { createContext, useState } from "react";

const ExpressionContext = createContext();

const ExpressionContextProvider = ({ children }) => {
  const [expressions, setExpressions] = useState([]);

  return (
    <ExpressionContext.Provider value={{ expressions, setExpressions }}>
        {children}
    </ExpressionContext.Provider>
  );
};

export { ExpressionContext, ExpressionContextProvider };