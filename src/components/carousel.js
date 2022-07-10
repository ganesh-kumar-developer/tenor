import React from "react";
import '../css/carosuel.css';

export default class Carosuel extends React.Component {
    constructor (props) {
        console.log("Carosuel props: ", props)
        super(props);
        this.state = {
            data: []
        };
        this.searchText = this.searchText.bind(this);
    }

    searchText(e) {
        this.props.searchText(e);
    }

    componentDidMount() {
        var apikey = "AIzaSyBKCWYItJ5scvEWZeLyhVFbqkMJPqlvEHg";
        var clientkey = "my_test_app";
        var lmt = 10;
    
        var search_url = "https://tenor.googleapis.com/v2/categories?type=trending&key=" +
                apikey +"&client_key=" + clientkey +  "&limit=" + lmt;
        fetch (search_url)
        .then (res => res.json())
        .then (
            (data) => {
                const chunkSize = 5;
                var temp_res = [];
                for (let i = 0; i < data.tags.length; i += chunkSize) {
                    const chunk = data.tags.slice(i, i + chunkSize);
                    temp_res.push(chunk);
                }
                this.setState({data: temp_res})
            }
        )
        .catch (error => console.log(error))
    }

    render() {
        return (
            <>
                <h2 className="mt-3">Trending Tenor Searches</h2>
                <div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="carousel" data-bs-interval="false">
                    <div className="carousel-inner">
                        {this.state.data.map((images, index) => (
                            <div className={"carousel-item " + (index === 0 ? 'active' : '')} key={index.toString()} >
                                <div className="row">
                                    {
                                        images.map((image, index) => (
                                            <div className="col" key={index + '_cur_card'} onClick={ () => {this.searchText(image.searchterm)}}>
                                                <div className="card img" style={{ background: 'url(' + image.image + ')' }}>
                                                </div>
                                                <div className="info"><span className="searchterm"><b>{image.searchterm}</b></span></div>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        ))}
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            </>
        )
    }
}