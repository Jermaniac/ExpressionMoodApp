import { ExpressionContextProvider } from "../context/expressionContext";
import MainComponent from "./MainComponent";

const App = () => {
  return (
      <ExpressionContextProvider>
        <MainComponent />
      </ExpressionContextProvider>
  );
};

export default App;
