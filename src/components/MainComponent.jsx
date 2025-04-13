import FormComponent from "./FormComponent";
import InfoComponent from "./InfoComponent";

const MainComponent = () => {
    return (
        <div className="flex flex-col lg:flex-row justify-center items-center bg-gray-800 p-10 gap-10 min-h-screen" id="container-main">
            <FormComponent />
            <InfoComponent />
        </div>
    );
}

export default MainComponent;