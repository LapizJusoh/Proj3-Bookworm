/*------------------
  IMPORT DEPENDECIES
------------------*/

import React, { Component } from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Bestseller from './components/Bestseller';
import Booklist from './components/Booklist';
import LogIn from './components/LogIn';
import Register from './components/Register';


class App extends Component {

/*------------------
  CONSTRUCTOR
------------------*/

  constructor(props){
    super(props);
    this.state = {

      //--- Nav
      navHome: true,
      navLogIn: false,
      navRegister: false,  
      navBestsellers: false,
      navBooklist: false,

      //--- NY Times API
      baseURL: 'https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?',
      apiKey: 'api-key=Bnbbb1JMRcU4yMb1rxevxLLGPEsyJOjA',
      listingURL: '',
      bestsellerList: ''
    }


    this.toHome = this.toHome.bind(this)
    this.toLogIn = this.toLogIn.bind(this);
    this.toRegister = this.toRegister.bind(this);
    this.toBestsellers = this.toBestsellers.bind(this);
    this.toBooklist = this.toBooklist.bind(this);
  }
  
/*------------------
  NAV FUNCTION
------------------*/

  toHome(){
    this.setState({
      navHome: true,
      navLogIn: false,
      navRegister: false,  
      navBestsellers: false,
      navBooklist: false,
    })
  }

  toLogIn(){
    this.setState({
      navHome: false,
      navLogIn: true,
      navRegister: false,  
      navBestsellers: false,
      navBooklist: false,
    })
  }

  toRegister(){
    this.setState({
      navHome: false,
      navLogIn: false,
      navRegister: true,  
      navBestsellers: false,
      navBooklist: false,
    })
  }

  toBestsellers(){
    this.setState({
      navHome: false,
      navLogIn: false,
      navRegister: false,  
      navBestsellers: true,
      navBooklist: false,
      listingURL: this.state.baseURL + this.state.apiKey,
    },()=>{
      fetch(this.state.listingURL)
      .then((res) => {
        return res.json();
      })
      .then((json) => this.setState({ bestsellerList: json }))
    })
  }

  toBooklist(){
    this.setState({
      navHome: false,
      navLogIn: false,
      navRegister: false,  
      navBestsellers: false,
      navBooklist: true,
    })
  }

  /*------------------
    USER FUNCTION
  ------------------*/

  handleRegister(e){
    e.preventDefault();
    console.log(`Registered`)
  }

  handleLogIn(e){
    e.preventDefault();
    console.log(`Logged In`)
  } 
  
/*------------------
  RENDERING
------------------*/

  render(){
    return (
      <div className="App">
        <Navbar
          toHome={ this.toHome }
          toLogIn={ this.toLogIn }
          toRegister={ this.toRegister }
          toBestsellers={ this.toBestsellers }
          toBooklist={ this.toBooklist }
        />
        { this.state.navHome ? <Home /> : '' }
        { this.state.navLogIn ? <LogIn /> : '' }
        { this.state.navRegister ? <Register /> : '' }
        { this.state.navBestsellers ? <Bestseller bestsellerList={this.state.bestsellerList} /> : '' }
        { this.state.navBooklist ? <Booklist /> : '' }
      </div>
    );
  }
}

export default App;
