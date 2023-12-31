import React from 'react'

const NewsItem = (props)=>{



        let { title, description, imageUrl, newsUrl, author, date ,source} = props;
        return (
            <div>
                <div className="card" >
                <span className="position-absolute top-0 start-50 translate-middle badge rounded-pill bg-danger" style={{zIndex: '1'}}>
                            {source}
                        </span>
                    <img src={imageUrl} className="card-img-top" alt="..."  style={{height:250}}/>
                    <div className="card-body">
                        <h5 className="card-title">{title} </h5>
                        <p className="card-text">{description}</p>
                        <p className="card-text"><small className="text-danger">By {author ? author : "Unknown"} on {new Date(date).toGMTString()}</small></p>
                        <a href={newsUrl} target='_blank' className="btn btn-sm btn-dark" rel="noopener noreferrer">Read More</a>
                    </div>
                </div>
            </div>
        )
  
}

export default NewsItem
