import React, { Component } from 'react';
import {
  BrowserRouter,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import SearchForm from './Components/SearchForm';
import Nav from './Components/Nav';
import PhotoContainer from './Components/PhotoContainer';
import apiKey from './config'; 
import './App.css';
import PageNotFound from './Components/PageNotFound'

class App extends Component {
    
    state = {
      pictures: [],
      search:'',
      loading: true
    }
  
  fetchData = (query) => {
    this.setState({
      loading: true
    }) 
    let url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=24&format=json&nojsoncallback=1`;// remove dog add ${query}
    fetch(url)
        .then(response => response.json())
        .then(responseData => {  
          console.log(responseData.photos);      
          this.setState( { 
            pictures: responseData.photos.photo,
            loading: false
          } );           
        })
        .catch( error => {
            console.log("Error fetching data", error);
        })       
  }

  componentDidMount() {

      let path = window.location.pathname 


      
      if (path === "/") {
        this.fetchData('racoons');
      } else if (path.startsWith("/search")) {        
        this.fetchData(path.slice(8))       
      } 
      this.setState({ 
        loading: false
      })    
  }

  render() {
    return (
      <BrowserRouter>
      <div>
        <div className="Container">
          <SearchForm onSearch={this.fetchData}/>

          <Nav getPhoto={this.fetchData}/>

          {
            (this.state.loading)
              ?<p>Loading...</p>
              :        
                <Switch>
                  <Route exact path='/' render={ () => <Redirect to={`/search/racoons`} />} />
                  <Route exact path="/search/:searchTag" render={ (props) => <PhotoContainer {...props} pictures={this.state.pictures} /> } />
                  <Route component={PageNotFound} />
                </Switch>
          }
        </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
