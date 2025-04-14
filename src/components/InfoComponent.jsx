import { useContext, useMemo } from "react";
import { ExpressionContext } from "../context/expressionContext";

const EXPRESSION_GRADIENT_COLORS = {
  happy: "to-yellow-400",
  sad: "to-blue-500",
  surprise: "to-purple-900",
  fear: "to-gray-950",
  disgust: "to-green-900",
  neutral: "to-gray-400",
  angry: "to-red-600",
};

const InfoExpressions = () => {
  const { expressions } = useContext(ExpressionContext);

  if (!Array.isArray(expressions) || expressions.length === 0) {
    return (
      <div
        className="w-full flex-1 flex flex-col items-center justify-center text-white"
        id="container-nodata"
      >
        <p className="text-lg font-semibold mb-4">No photo uploaded yet.</p>
        <p className="text-sm mb-2">Please upload a photo.</p>
        <p className="text-sm">Upload a photo to analyze expressions.</p>
      </div>
    );
  }

  const sortedExpressions = useMemo(
    () => [...expressions].sort((a, b) => b.probability - a.probability),
    [expressions]
  );

  const topExpression = sortedExpressions[0];
  return (
    <div
      className="w-full flex-1 flex flex-col items-center justify-center"
      id="container-info"
    >
      <div className="bg-black rounded-lg p-6 flex flex-col items-center w-full">
        <div
          className={`bg-gradient-to-br from-gray-400 ${EXPRESSION_GRADIENT_COLORS[topExpression.mood]} p-6 rounded-full shadow-lg hover:shadow-xl transition duration-300 w-16 h-16 flex items-center justify-center text-2xl font-bold mb-4 text-black`}
        >
          {Math.round(topExpression.probability * 100)}%
        </div>
        <span className="text-center font-medium text-lg text-white capitalize">
          {topExpression.mood}
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
              <div className="w-60 h-2 bg-gray-700 rounded-full overflow-hidden hidden sm:inline">
                <div
                  className="h-full bg-blue-500"
                  style={{ width: `${expression.probability * 100}%` }}
                ></div>
              </div>
              <span className="text-sm text-gray-400 w-12 text-right">
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
