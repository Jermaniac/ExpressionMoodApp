import InfoExpressions from "./InfoComponent";
import FormComponent from "./FormComponent";
import { ExpressionContextProvider } from "../context/expressionContext";

const App = () => {
  return (
    <div className="px-10 py-10">
      <ExpressionContextProvider>
        <FormComponent />
        <InfoExpressions />
      </ExpressionContextProvider>
    </div>
  );
};

export default App;
