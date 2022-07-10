import React from "react";
import ReactDOM from "react-dom/client";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';
import Header from "./components/header";
import './css/header.css';
import Card from "./components/card";
import Carosuel from './components/carousel';

class App extends React.Component {
    constructor(props) {
        console.log("App Props: ", props);
        super(props);
        this.searchText = this.searchText.bind(this);
        this.state = {
            searchText: '',
            items: []
        };
    }

    searchText(data) {
        this.setState({searchText: data})
    }
 
    render() {
        return (
                <div>
                    <Header searchText={this.searchText} text={this.state.searchText} />
                    <div className="container" id="container">
                        <Carosuel searchText={this.searchText}/>
                        <Card searchText={this.state.searchText} onSearchEnter={this.state.searchOnEnter}/>
                    </div>
                </div>
        );
    }
}
        

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App/>);
            
//new branch
