import React from 'react'

import InfoExpressions from './InfoComponent'
import FormComponent from './FormComponent';

import '../styles/App.css'
import { ExpressionContextProvider } from '../context/expressionContext';

class App extends React.Component {
  render () {
    return (
        <div className="container">
          <div className="row">
            <ExpressionContextProvider>
              <FormComponent/>
              <InfoExpressions/>
            </ExpressionContextProvider>
          </div>
        </div>
    );
  }

}

export default App