import React from 'react';
import './index.less'
export default function({children}){
  return (<div className="wrapper">
    <div className="header">
    <ul>
      <li><a href="/entries/home/home.html">home</a></li>
      <li><a href="/entries/about/about.html">about</a></li>
    </ul>
    </div>
    <div className="content">
      {children}
    </div>
    <div className="footer"></div>
  </div>)
}
