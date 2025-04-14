import FormComponent from "./FormComponent";
import InfoComponent from "./InfoComponent";

const MainComponent = () => {
  return (
    <div className="bg-gray-800 min-h-screen">
      <div
        className="flex flex-col lg:flex-row justify-center items-center min-h-screen p-6 gap-10 max-w-6xl mx-auto"
        id="container-main"
      >
        <FormComponent />
        <InfoComponent />
      </div>
    </div>
  );
};

export default MainComponent;