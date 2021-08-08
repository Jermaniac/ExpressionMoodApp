import React from 'react';
import '../styles/InfoComponent.css'

function InfoComponent({ expressions }) {

  if (expressions) {
    let expressionsFormatted = formatProbabilities(expressions);

    return (
    <div className="col-12 col-md-8 col-lg-9" id="info">
        {
        expressionsFormatted.map((expression) => {
          let emojiSrc = `./assets/images/emoji_${expression.mood}.png`;
          return (
            <div className="row" id="content" key={expression.mood}>
              <div className="col-11">
                <div className="progress">
                  <div
                    id="barra"
                    className="progress-bar"
                    aria-valuemin="0"
                    aria-valuemax="100"
                    style={{ width: expression.probability + "%" }}
                  >
                    {expression.probability}
                  </div>
                  <span className="badge">{expression.mood}</span>
                </div>
              </div>
              <div className="col-1" id="imageEmoji">
                <img
                  src={emojiSrc}
                  alt="emoji"
                ></img>
              </div>
            </div>
          );
        })
        }
      </div>
    // <div></div>
    );
  } else {
    return (
          <div>
          </div>
    );
  }
}

function formatProbabilities(expressions){
    return expressions.map( (expression) => {
        return  {
            mood: expression.mood,
            probability: (expression.probability * 100).toFixed(2)
        }

    })

}

export default InfoComponent;