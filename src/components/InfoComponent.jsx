import { useContext, useMemo } from "react";
import { ExpressionContext } from "../context/expressionContext";

const InfoExpressions = () => {
  const { expressions } = useContext(ExpressionContext);

  if (!Array.isArray(expressions) || expressions.length === 0) {
    return (
      <div
        className="relative w-full h-full flex flex-1 flex-col items-center content-center justify-center text-white"
        id="container-nodata"
      >        <p className="text-lg font-semibold mb-4">No photo uploaded yet.</p>
        <p className="text-sm mb-2">Please upload a photo.</p>
        <p className="text-sm">Upload a photo to analyze expressions.</p>
      </div>
    );
  }

  const sortedExpressions = useMemo(() => {
    return [...expressions].sort((a, b) => b.probability - a.probability);
  }, [expressions]);

  return (
    <div className="w-full relative flex-1 flex justify-center content-center flex-col items-center max-w-md lg:max-w-md" id="container-info">
      <div className="bg-black rounded-lg p-6 flex flex-col items-center text-white mb-6 w-full">
        <div className="w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center text-2xl font-bold mb-4">
          {Math.round(sortedExpressions[0].probability * 100)}%
        </div>
        <span className="text-center font-medium text-lg">
          {sortedExpressions[0].mood}
        </span>
      </div>

      <ul className="bg-black w-full rounded-lg p-4">
        {sortedExpressions.map((expression, index) => (
          <li
            key={index}
            className="flex justify-between items-center text-white py-2 border-b border-gray-700 last:border-b-0"
          >
            <span className="font-medium capitalize">{expression.mood}</span>
            <div className="flex items-center gap-2">
              <div
                className="sm:w-16 sm:h-2 bg-gray-700 rounded-full overflow-hidden"
              >
                <div
                  className="h-full bg-blue-500"
                  style={{ width: `${expression.probability * 100}%` }}
                ></div>
              </div>
              <span className="text-sm text-gray-400">
                {Math.round(expression.probability * 100)}%
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InfoExpressions;
