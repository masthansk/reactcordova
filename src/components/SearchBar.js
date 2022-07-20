import React, { useState } from 'react';
import $, { event } from "jquery";



const initialDetails = [{
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

export default class SearchBar extends React.Component {


 
    
    state = {
        hasError:false,
        data: initialDetails,
        agentName: "",
        agentCode: "",
        selectData : "",
        searchItem : "",
        showSearchIcon: true
      }
    // fetch data
    
    // Search input   
    //onInput = e => this.setState({ agentName: e.target.value });
   
    validation(e){
      if(e.target.value != ""){
        this.setState({showSearchIcon: false});
        if(e.target.value.match(/^[.0-9a-zA-Z /-]+$/)){
          this.setState({hasError:false});
        }else{
            this.setState({hasError:true});
        }
      }else{
        this.setState({showSearchIcon: true});
        this.setState({hasError:false});
      }
      
    }

     
    onInput(e) {
        this.setState({ agentName: e.target.value });
        this.validation(e);
    }
    
    // Select the wrapper and toggle class 'focus'
    onFocus = e => e.target.parentNode.parentNode.classList.add('focus');
   
   parentFunCall = (data) => {
    this.props.parentCallback(data);
   }

    onBlur(e){
        e.target.parentNode.parentNode.classList.remove('focus');
        this.validation(e);
        if(e.target.value == "" || e.target.value == null ){
          this.parentFunCall("");
        }
    }
    // Select item
    onClickItem   = function(item, e){
        if(item != null || item != undefined || item != ""){
            this.setState({selectData : item})
            this.parentFunCall(item);
        }else{
            this.setState({selectData : initialDetails})
            this.parentFunCall(this.state.selectData);
        }
        $(".wrapper .list").hide();
    }
  
    onClickNoRes = function(serText){
      this.parentFunCall(serText);
      $(".wrapper .list").hide();
    }
    
    render() {
      let { data, agentName } = this.state;
      if (!data) {
        return <p>Loading</p>
      }
      let filtered = data.filter(item => item.agentName.toLowerCase().includes(agentName.toLowerCase()) || item.agentCode.toLowerCase().includes(agentName.toLowerCase()) );
      return (
        <div>
          <div className="wrapper" style={{borderColor: this.state.hasError?'red':""}}>
            <div className="search">
              <input
                id="search"
                type="search"
                value={this.state.agentName}
                placeholder="Search by Agent Code and User Name"
                onChange={(event) => this.onInput(event)}
                onFocus={(event) => this.onFocus(event)}
                onBlur={(event) => this.onBlur(event)}
                autoComplete="off"
              />
             {this.state.showSearchIcon && <i class="fa fas fa-search" ></i>}  
            </div>
            {agentName.length >1 && filtered.length > 0 && (
              <div>
              <ul className="list">
                {filtered.map(item => (
                  <li  onClick={() => this.onClickItem(item)}>
                    <div className="marginbtm5px margintop5px"> {item.agentCode} - {item.agentName} </div></li>
                ))}
              </ul>
              <ul className="list">
              <li onClick={() => this.onClickNoRes(agentName)} className="paddingtop10 paddingbtm10 margintop5px paddingtop5px brdtopsrchtext"> See All Results for " {agentName} "</li>
              </ul>
              </div>
            )}
            {
              agentName.length >1 && filtered.length == 0 && (
                <ul className="list">
                <li onClick={() => this.onClickNoRes(agentName)} className="paddingtop10 paddingbtm10 margintop5px paddingtop5px brdtopsrchtext"> See All Results for " {agentName} "</li>
                </ul>
              )
            }
          </div>
          {this.state.hasError && <div className="colorred errtxtfontsize" >*Only alphabets,numbers,dash,dot and space are allowed.</div>}
        </div>
      )
    }
  };