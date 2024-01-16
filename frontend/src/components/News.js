import React, { Component } from 'react'
import Newsitem from './Newsitem'
import PropTypes from 'prop-types'


export default class News extends Component {

    
    constructor(props) {
        super(props);
        this.state = {
            articles:[],
            loading : false,
            page: 1
        };
        document.title = `${this.props.category} - NEWSamachaar`
    }

    APIKey = "8bd393cda5b7404987f95569842a04f6";
    
    async componentDidMount(){
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.APIKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        let data = await fetch(url);
        let parsedata = await data.json()
        // console.log(parsedata);
        this.setState({articles: parsedata.articles, totalResult: parsedata.totalResults}) 
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

    handlePrevClick = async()=>{
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.APIKey}&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
        let data = await fetch(url);
        let parsedata = await data.json()
        this.setState({
            page:this.state.page-1,
            articles: parsedata.articles
        })
        console.log(this.state.page)

    } 

    handleNextClick = async()=>{
        if(this.state.page + 1 > Math.ceil(this.state.totalResult/this.props.pageSize)){
            
        }
        else{
            let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.APIKey}&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
            let data = await fetch(url);
            let parsedata = await data.json()
            this.setState({
                page: this.state.page+1,
                articles: parsedata.articles,
            })
            console.log(this.state.page)

        }
        
    }    
    

    render() {
        return (
        <div className="container" >
            <h1 className="container d-flex justify-content-center my-5" >NEWSamachaar - Top {this.props.category} headlines</h1>
            <div className="row">
            {this.state.articles.map((element) => { 
                    return <div className="col-md-4 my-3" key={element.url}>
                            <Newsitem tittle={  element.title && element.title.length >= 45? element.title.slice(0, 45) + '...': element.title || 'Title not available'} description={element.description && element.description.length >= 60? element.description.slice(0, 60) + '...': element.description || 'Description not available'} imageURL={element.urlToImage} newsURL = {element.url} author={element.author} date={element.publishedAt} />
                           </div>
                })}
            </div>
            <div className="container d-flex justify-content-between mt-8">
                <button type="button" disabled={this.state.page<=1} className="btn btn-dark" onClick={this.handlePrevClick}> &larr; Previous</button>
                <button type="button" style={{background:"#134364"}} className="btn btn-dark">Page {this.state.page} of { Math.ceil(this.state.totalResult/this.props.pageSize)}</button>
                <button type="button" disabled={this.state.page + 1 > Math.ceil(this.state.totalResult/this.props.pageSize)} className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr; </button>
            </div>
        </div>
        )
    }
}
