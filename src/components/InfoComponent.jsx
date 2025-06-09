import { useContext } from "react";
import { ExpressionContext } from "../context/expressionContext";

const EXPRESSION_COLORS = {
  happy: "text-yellow-400",
  sad: "text-blue-400",
  surprise: "text-purple-400",
  fear: "text-gray-400",
  disgust: "text-green-400",
  neutral: "text-gray-300",
  angry: "text-red-400",
};

const InfoExpressions = () => {
  const { expressions } = useContext(ExpressionContext);

  return (
    <div
      className="flex-1 flex flex-col items-center justify-center"
      id="container-info"
    >
      <ul className="bg-black w-full rounded-lg p-4">
        {expressions.map((expression, index) => (
          <li
            key={index}
            className="flex justify-between items-center py-2 border-b border-gray-700 last:border-b-0"
          >
            <span className="flex items-center gap-2">
              <img
                src={`/assets/images/emoji_${expression.mood}.webp`}
                alt={expression.mood}
                className="w-6 h-6 object-contain"
                width={24}
                height={24}
                style={{ display: "block" }}
              />
              <span className={`font-medium capitalize ${EXPRESSION_COLORS[expression.mood]}`}>
                {expression.mood}
              </span>
            </span>
            <div className="flex items-center gap-2 w-full">
              <span className="text-sm text-gray-400 w-12 text-right block ml-auto">
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
