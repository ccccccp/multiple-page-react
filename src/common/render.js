import React from 'react';
import ReactDom from 'react-dom';
import Frame from './frame/index';
export default function(Cmp){
  ReactDom.render(<Frame>
      {React.cloneElement(<Cmp />)}
      </Frame>,document.getElementById("root"))
}
if (module.hot) {
  module.hot.accept();
}