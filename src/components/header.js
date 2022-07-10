import React from "react";
import $ from 'jquery';

export default class Header extends React.Component {
    constructor(props) {
        super(props);
        console.log("Header props: ", props);
        this.changedText = this.changedText.bind(this);
        this.checkBoxChanged = this.checkBoxChanged.bind(this);
        this.state = {
            text: '',
            onSearchEnter: false
        };
    }

    componentDidMount() {
        $(window).scroll(function() {
            var scroll = $(window).scrollTop();
            if (scroll >= 60) {
                //clearHeader, not clearheader - caps H
                $(".TopBar").addClass("fixed-top");
            }
            if (scroll <= 60) {
                //clearHeader, not clearheader - caps H
                $(".TopBar").removeClass("fixed-top");
            }
        })
    }

    componentDidUpdate(prevProps) {
        if (this.props.text !== prevProps.text) {
            this.setState({text: this.props.text});
        }
    }

    changedText(e) {
        this.props.searchText(e.target.value);
        this.setState({text: e.target.value});
    }
    checkBoxChanged() {
        var ans = this.state.onSearchEnter ? false : true;
        this.setState({onSearchEnter: ans});
        this.props.searchOnEnterEvent(ans);
        console.log("Checkbox changed: ", ans);
    }

    render() {
        return (
            <>
            <nav className="NavBar ">
                <div className="container">
                    <span itemType="http://schema.org/Organization">
                        <a className="navbar-brand" itemProp="url" activeclassname="current" href="/">
                            <img src="https://tenor.com/assets/img/tenor-logo.svg" width="80" height="22" alt="Tenor"
                                itemProp="logo" />
                        </a>
                    </span>
                </div>
            </nav>
            <div className="TopBarComponent TopSearchBar">
                <div className="TopBar">
                    <div className="container"><a className="navbar-brand" itemProp="url" activeclassname="current"
                            href="/"><img src="https://tenor.com/assets/img/tenor-logo-white.svg" width="80" height="22" alt="Tenor"
                                itemProp="logo" /></a>
                        <div className="search-bar-wrapper">
                            <div className="SearchBar">
                                <input placeholder="Search for GIFs and Stickers" onChange={this.changedText} value={this.state.text}/>
                            </div> 
                        </div>
                    </div>
                    {/* <div class="form-check">
                        <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                        <label class="form-check-label" for="flexCheckDefault">
                            Default checkbox
                        </label>
                    </div> */}
                </div>
                <div className="alert alert-warning" role="alert">
                    <div className="container">
                    &#127881; &#127881; No need to enter.! Search on typing... &#127882;
                    </div>
                </div>
            </div>
            </>
        );
    }
}