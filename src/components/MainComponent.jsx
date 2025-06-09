import { useContext, useEffect, useState } from "react";
import FormComponent from "./FormComponent";
import InfoComponent from "./InfoComponent";
import WinnerModal from "./WinnerModal";
import { ExpressionContext } from "../context/expressionContext";

const MainComponent = () => {
  const { winnerMood } = useContext(ExpressionContext);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (winnerMood) {
      setShowModal(true);
    }
  }, [winnerMood]);

  return (
    <div className="bg-gray-800 min-h-screen">
      {showModal && winnerMood && (
        <WinnerModal mood={winnerMood} onClose={() => setShowModal(false)} />
      )}
      <div
        className="flex flex-col lg:flex-row justify-center min-h-screen p-6 max-w-6xl mx-auto lg:gap-30"
        id="container-main"
      >
        <FormComponent />
        <InfoComponent />
      </div>
    </div>
  );
};

export default MainComponent;