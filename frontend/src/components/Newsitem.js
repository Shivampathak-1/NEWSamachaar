import React, { Component } from 'react'
import "./Newsitem.css"

export default class Newsitem extends Component {
  render() {
    const {tittle, description, imageURL, newsURL, author, date} = this.props;
    return (
      <div>
        <div className="card shadow custom-zoom rounded-5" >
            <img src={imageURL?imageURL:"https://wallpapercave.com/wp/wp4094532.jpg"} className="card-img-top rounded-top-5" alt="..." style={{maxHeight: '175px', objectFit: 'cover'}}/>
            <div className="card-body">
                <h5 className="card-title">{tittle}</h5>
                <p className="card-text">{description}</p>
                <p className="card-text"><small className="text-danger">By {author?author:"Unknown"} at {new Date(date).toGMTString()}</small></p>
                <a href={newsURL} target='_blank' rel='noreferrer' className="btn btn-sm btn-dark custom-zoom">Read more</a>
            </div>
        </div>
      </div>
    )
  }
}
