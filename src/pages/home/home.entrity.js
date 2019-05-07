import a from 'common/a';
import React from 'react';
import Render from 'common/render';
import HomeTitle from './components/title';
import './home.less';
class HomePage extends React.Component{
  render(){
    return <div className="home-page">
    <HomeTitle title="home-title!!"></HomeTitle>
      home-page!
    </div>
  }
}
const obj = {aaaa:111};
var key = 'mykey'
console.log("home.js",{...obj},{[key]:'value'})
Render(HomePage);
const obj2 = {bbbb:22222};
console.log("obj2:",{b:2,...obj2})
export default HomePage