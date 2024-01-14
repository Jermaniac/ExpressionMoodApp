import React, { useContext, useEffect, useState } from "react";
import { ExpressionContext } from "../context/expressionContext";
import "../styles/InfoComponent.css";

const EXPRESSION_GRADIENT_COLORS = {
  happy: "to-yellow-400",
  sad: "to-blue-500",
  surprise: "to-purple-900",
  fear: "to-gray-950",
  disgust: "to-green-900",
  neutral: "to-gray-400",
  angry: "to-red-700",
};

const InfoComponent = () => {
  const [expressionsFormatted, setExpressionsFormatted] = useState([]);
  const { expressions } = useContext(ExpressionContext);

  useEffect(() => {
    if (expressions && Array.isArray(expressions) && expressions.length) {
      const expressionsFormated = formatProbabilities(expressions);
      setExpressionsFormatted(expressionsFormated);
    }
  }, [expressions]);

  return (
    <div className="bg-black p-8" id="info">
      <div className="space-y-4">
        {expressionsFormatted &&
          expressionsFormatted.map((expression) => {
            let emojiSrc = `./assets/images/emoji_${expression.mood}.png`;
            return (
              <div
                className={`flex flex-col items-center bg-gradient-to-br from-purple-100 ${
                  EXPRESSION_GRADIENT_COLORS[expression.mood]
                } p-6 rounded-xl shadow-lg hover:shadow-xl transition duration-300`}
              >
                <h2 className="p-4 text-center text-white font-bold capitalize">
                  {expression.mood}
                </h2>
                <img
                  className="p-4 max-w-48"
                  src={emojiSrc}
                  alt={expression.mood}
                ></img>
                <div className="w-full border">
                  <div
                    className="relative top-0 left-0 bg-green-500 transition-all duration-500 ease-in-out"
                    style={{ width: `${expression.probability}%` }}
                  >
                    {expression.probability.toFixed(2)}%
                  </div>
                </div>
                <div className="relative"></div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

function formatProbabilities(expressions) {
  return (
    expressions &&
    expressions.length &&
    expressions
      .map((expression) => {
        return {
          ...expression,
          probability: expression.probability * 100,
        };
      })
      .sort((a, b) => b.probability - a.probability)
  );
}

export default InfoComponent;
