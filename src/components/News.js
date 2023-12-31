import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalResults, setTotalResults] = useState(0)
    


    const captFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1)
    }





    const updateNews = async () => {
        props.setProgress(10)
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`
        setLoading(true)
        let data = await fetch(url)
        props.setProgress(40)
        let dataParsed = await data.json()
        props.setProgress(70)
        setArticles(dataParsed.articles)
        setTotalResults(dataParsed.totalResults)
        setLoading(false)
        props.setProgress(100)
    }
    useEffect(() => {
        document.title = `${captFirstLetter(props.category)} - NewsLite`
        updateNews()
    }, [])



    const fetchMoreData = async () => {
        
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`
        setPage(page + 1)
        let data = await fetch(url)
        let dataParsed = await data.json()
        setArticles(articles.concat(dataParsed.articles))
        setTotalResults(dataParsed.totalResults)
        setLoading(false)
    }


    return (
        <>
            <h1 className='text-center' style={{ margin: "90px 0px 36px 0px", fontFamily: "sans-serif" }} >NewsLite - Top {captFirstLetter(props.category)} Headlines</h1>
            {loading && <Spinner />}

            <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreData}
                hasMore={articles.length !== totalResults}
                loader={<Spinner />}
            >
                <div className="container">
                    <div className="row my-3">
                        {articles.map((element) => {
                            return <div className="col-md-4 my-4" key={element.url}>
                                <NewsItem title={element.title ? element.title : ""} description={element.description ? element.description : ""} imageUrl={element.urlToImage ? element.urlToImage : "https://img.etimg.com/thumb/msid-104374078,width-1200,height-630,imgsize-155888,overlay-economictimes/photo.jpg"} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                            </div>
                        })}

                    </div>
                </div>
            </InfiniteScroll>


        </>
    )

}

News.defaultProps = {
    country: 'in',
    pageSize: 6,
    category: 'general'
}

News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
}

export default News
