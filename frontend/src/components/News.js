import React, { Component } from 'react'
import Newsitem from './Newsitem'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";
import Spinner from './Spinner'

export default class News extends Component {

    
    constructor(props) {
        super(props);
        this.state = {
            articles:[],
            loading : false,
            page: 1,
            totalResult: 0
        };
        document.title = `${this.props.category} - NEWSamachaar`
    }

    APIKey = "8bd393cda5b7404987f95569842a04f6";
    // APIKey = "a03261e567fc46c2a1c7635bff0b9b1e";
    // APIKey = "4a962d49ab9e403a9ca523bfb7912ace";
    
    async componentDidMount(){
        this.props.setProgress(0);
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.APIKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        let data = await fetch(url);
        this.props.setProgress(30);
        let parsedata = await data.json()
        this.props.setProgress(50);
        this.setState({
            articles: parsedata.articles, 
            totalResult: parsedata.totalResults
        }) 
        this.props.setProgress(100);
    }

    static defaultProps = {
        pageSize: 16,
        country:"in" ,
        category:"general"
    }

    static propTypes = {
        pageSize: PropTypes.number,
        country: PropTypes.string ,
        category: PropTypes.string
    }

    fetchMoreData = async() => {
        this.setState({page: this.state.page + 1})
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.APIKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        let data = await fetch(url);
        let parsedata = await data.json()
        this.setState({
            articles: this.state.articles.concat(parsedata.articles), 
            totalResult: parsedata.totalResults
        }) 
    }
    

    render() {
        return (
        <div className="container" >
            <h1 className="container d-flex justify-content-center" style={{marginTop: "90px"}}>NEWSamachaar - Top {this.props.category} headlines</h1>
            <InfiniteScroll className='container'
                dataLength={this.state.articles.length}
                next={this.fetchMoreData}
                hasMore={this.state.articles.length <= this.state.totalResult}
                loader={<Spinner/>}>
                <div className="row">
                {this.state.articles.map((element, index) => { 
                    return <div className="col-md-4 my-3" key={index}>
                                <Newsitem tittle={  element.title && element.title.length >= 45? element.title.slice(0, 45) + '...': element.title || 'Title not available'} description={element.description && element.description.length >= 60? element.description.slice(0, 60) + '...': element.description || 'Description not available'} imageURL={element.urlToImage} newsURL = {element.url} author={element.author} date={element.publishedAt} />
                        </div>
                    })}
                </div>
            </InfiniteScroll>
        </div>
        )
    }
}
