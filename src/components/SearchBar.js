import React, { useRef,useState } from 'react';
import $, { event } from "jquery";
import axios from "axios";

const agencyURL = "http://localhost:3001/agency";

export default class SearchBar extends React.Component {

    state = {
        hasError:false,
        data: [],
        agentName: "",
        agentCode: "",
        selectData : "",
        searchItem : "",
        showSearchIcon: true
      }

       // fetch data
      componentDidMount(){
        axios.get(agencyURL,  { mode: 'cors' }).then((response) => {
          var agentdata = response.data;
          this.setState({data: agentdata.agency.prospect.rankingObject});
        });
       }
   
    
    // Search input   
   
   
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
            this.setState({selectData : this.state.data})
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
                placeholder="Search by Agent Code , User Name"
                onChange={(event) => this.onInput(event)}
                onFocus={(event) => this.onFocus(event)}
                onBlur={(event) => this.onBlur(event)}
                autoFocus 
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
              !this.state.hasError && agentName.length >1 && filtered.length == 0 && (
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