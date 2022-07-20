import React, { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';


class Tabs extends React.Component{
  state ={
    activeTab: this.props.children[0].props.label
  }
  changeTab = (tab) => {

    this.setState({ activeTab: tab });
  };
  render(){
    
    let content;
    let buttons = [];
    return (
      <div>
        {React.Children.map(this.props.children, child =>{
          buttons.push(child.props.label)
          if (child.props.label === this.state.activeTab) content = child.props.children
        })}
         
        <TabButtons activeTab={this.state.activeTab} buttons={buttons} changeTab={this.changeTab}/>
        <div className="tab-content">{content}</div>
        
      </div>
    );
  }
}


const TabButtons = ({buttons, changeTab, activeTab}) =>{
   
  return(
    <div className="tab-buttons">
    {buttons.map(button =>{
       return <button className={button === activeTab? 'active': ''} onClick={()=>changeTab(button)}>{button}</button>
    })}
    </div>
  )
}

const Tab = props =>{
  return(
    <React.Fragment>
      {props.children}
    </React.Fragment>
  )
}


const dataAgent = [{
  "agentCode": "10299001",
  "agentName": "Muhamad Yusuf",
  "prosp": 12,
  "rank": 1
},
{
  "agentCode": "10199164",
  "agentName": "Abhik Thakurta",
  "prosp": 12,
  "rank": 2
},
{
  "agentCode": "10199189",
  "agentName": "Fatema Ani",
  "prosp": 10,
  "rank": 3
}, {
  "agentCode": "10299004",
  "agentName": "Nabil Ahmad",
  "prosp": 10,
  "rank": 4
}
];

class App extends React.Component {

  
  
  state = {
    dataAgent: dataAgent,
    searchtxt : "",
    highlclr: {"agentCode": "",
    "agentName": "",
    "prosp": "",
    "rank": ""}
   }

  
   searchResultDisplay = (childData) =>{
    if(childData != undefined && childData != ""){
       if(typeof childData == "string"){
        let serFiltData = this.state.dataAgent.filter(item => item.agentName.toLowerCase().includes(childData.toLowerCase()) || item.agentCode.toLowerCase().includes(childData.toLowerCase()) );
        if(serFiltData.length >0){
          this.setState({highlclr:serFiltData[0]});
          this.setState({dataAgent : dataAgent});
        }else{
          this.setState({highlclr:{}});
          this.setState({dataAgent : []});
          this.setState({searchtxt : childData});
        }
      }
      else{
     this.setState({highlclr:childData});
     }
    }else{
      this.setState({highlclr:{}});
      this.setState({dataAgent : dataAgent});
    }
    

}
render (){
  return (
    <div >
      <nav class="navbar shadow-lg  bg-white borderrad" >
      <i className="padleft20px colorblue fontbold fa fa-solid fa-angle-left" ></i>
        <span className="navbar-brand fontbold fontsize1em colorblack marginauto">FA Ranking</span>
      </nav>
      <section className="container" style={{marginTop:"4%"}} >
       <SearchBar  parentCallback = {this.searchResultDisplay} />
      </section>
      <div className="tabs">
       <Tabs>
         <Tab label="Agency">
         <section className="container">
          <div className="row margtop10 fontbold width100">
          <span className="width50 textalignleft fontsizeheadtxt" >
            FA Rank
          </span>
          <span className="width50 fontbold textalignright fontsizeheadtxt" >
            No.of Propspect
          </span>
          </div>
         <ul className="list-group margintop2px" id="myList">
         {this.state.dataAgent.length > 0 && this.state.dataAgent.map(user  => (
          
          <li style={{ backgroundColor:user.rank == this.state.highlclr.rank? "rgb(0,122,188)!important;":""}} className={ `list-group-item marginbtm2px margintop2px brdrad8px ${user.rank == this.state.highlclr.rank?'colorhighl':''}` }>
                    <div className="row width100">
                  <div className="width15 fontsize1em brdrightline textalignleft fontbold">
                  <p className="colorblue">{user.rank}</p>
                  </div>
                  <div className="textalignleft width70">
                  <span className="fontbold colorblue fontsize1em"> <u>{user.agentName} </u></span> <br />
                  <span className="fontsize1em">{user.agentCode}</span>
                  </div>
                  <div className="fontbold width15 textalignright">
                  <p>{user.prosp}</p>
                  </div>
                  </div>
                  </li>
         ))}
         {
          this.state.dataAgent.length == 0 && (
          <div  className="padding40">
            <p>No Result Found for '{this.state.searchtxt}'</p>
            <button type="button" class="btn btn-primary width80">MAKE NEW SEARCH</button>
          </div>
          )
         }
                </ul>
                </section>
         </Tab>
         <Tab label="Region">
           <div >
             <p>Region content</p>
           </div>
         </Tab>
         <Tab label="Country">
           <div>
             <p>Country content</p>
           </div>
         </Tab>
       </Tabs>
      </div>

          
      </div>
  );
}
}

export default App;
