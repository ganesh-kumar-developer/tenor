import React from "react";
import '../css/carosuel.css';

export default class Card extends React.Component {
    constructor(props) {
        super(props);
        console.log('Card prop:', props);
        this.state = {
            images: [],
            isNext: '',
            search_term: '',
            isLoading: false
        };
        
    }

    componentDidMount() {
        this.setState({isLoading: true});
        var apikey = "AIzaSyBKCWYItJ5scvEWZeLyhVFbqkMJPqlvEHg";
        var clientkey = "my_test_app";
        var lmt = 20;
    
        var search_url = "https://tenor.googleapis.com/v2/featured?key=" +
                apikey +"&client_key=" + clientkey +  "&limit=" + lmt;
        fetch (search_url)
        .then (res => res.json())
        .then (
            (data) => {
                this.setState({images: data.results})
                this.setState({isNext: data.next})
                this.setState({isLoading: false});
            }
        )
        .catch (error => console.log(error))
    }

    componentDidUpdate(prevProps) {
        if (this.props.searchText !== prevProps.searchText) {
            this.searchedImage(this.props.searchText);
        }
    }

    searchedImage (search_term, pos = '') {
        this.setState({isLoading: true});
        var apikey = "AIzaSyBKCWYItJ5scvEWZeLyhVFbqkMJPqlvEHg";
        var clientkey = "my_test_app";
        var lmt = 20;

        // test search term
        var search_url = "https://tenor.googleapis.com/v2/featured?key=" +
                apikey +"&client_key=" + clientkey +  "&limit=20";
        if (search_term.length > 0) {
            search_url = "https://tenor.googleapis.com/v2/search?q=" + search_term + "&key=" +
                apikey +"&client_key=" + clientkey +  "&limit=" + lmt;
        }

        if (pos != '')
            pos = '&pos=' + pos;
        search_url += pos;
        // console.log ("search url: ", search_url);
        fetch ( search_url )
        .then ( res => res.json())
        .then ( (data) => {
            console.log("data: ", data);
            this.setState({images: data.results});
            this.setState({isNext: data.next});
            this.setState({search_term: search_term});
            this.setState({isLoading: false});
        })
        .catch (error => console.log(error))
    }

    nextPage(term, value) {
        this.searchedImage(term, value)
    }

    render() {
        return (
            <div>
                <h2>Featured GIFs</h2>
                <div className="row align-items-center">
                    {this.state.images.map((image, index) => (
                        <div className="col-xl-3 col-lg-3 col-md-4 col-sm-6 p-3" key={index + '_card'}>
                            <img key={image.id.toString()} src={image.media_formats.gif.url} className="img-back img-fluid rounded float-start algin-top" alt={image.content_description}></img>
                        </div>
                    ))}
                </div>  
                {
                    this.state.isNext != '' ? <>
                    <button type="button" className="btn btn-primary rounded-circle btn-lg btn-next" onClick={() => {this.nextPage(this.state.search_term, this.state.isNext)}} data-toggle="tooltip" data-placement="top" title="Go Next"> &gt; </button>
                    </> : ''
                }
                {
                    this.state.isLoading == true ? <>
                    <div className="d-flex justify-content-center">
                        <div className="spinner-grow text-primary" role="status">
                        <span className="sr-only"></span>
                        </div>
                    </div>
                    </> : ''
                }
            </div>
        )
    }
}