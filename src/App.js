import React,{Component} from 'react'
import{ BrowserRouter as Router , Route , } from 'react-router-dom';
import Home from './components/Home';
import NavBar from './components/NavBar';
import "bootstrap/dist/css/bootstrap.min.css";
import {UserProvider} from './UserContext';
import Cookies from 'universal-cookie';
import AddBlog from './components/AddBlog';
const cookies = new Cookies();
class App extends Component {


  constructor(props) {
    super(props);

    this.toggleAuth = (para) => {
      this.setState({
        isAuthenticated : para
      });
    };

    this.state = {
      isAuthenticated: false,
      toggleAuth: this.toggleAuth,
    };
  }
  


  componentDidMount =()=>{
    if(cookies.get('token')){
      this.toggleAuth(true);
    }
    const data = new FormData();
    // data.append("image", file);
    data.append("name","Lav");

  }
 
  render() {
    return (
      <div>
         <UserProvider value={this.state} >
            <Router>
              <div className="container">
              <NavBar/>
              <br/>
              <Route path="/" exact component={Home} />
              <Route path="/addblog" exact component={AddBlog} />
              </div>
            </Router>
          </UserProvider>
      </div>
    )
  }
}


export default App

