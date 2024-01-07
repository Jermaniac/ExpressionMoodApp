import InfoExpressions from "./InfoComponent";
import FormComponent from "./FormComponent";
import { ExpressionContextProvider } from "../context/expressionContext";

const App = () => {
  return (
    <div className="bg-black h-screen">
      <ExpressionContextProvider>
        <FormComponent />
        <InfoExpressions />
      </ExpressionContextProvider>
    </div>
  );
};

export default App;
