import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
    static defaultProps = {
        country: 'in',
        pageSize: 6,
        category: 'general'
    }

    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string
    }

    captFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1)
    }

    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            loading: false,
            page: 1,
            totalResults: 0
        }
        document.title = `${this.captFirstLetter(this.props.category)} - NewsLite`

    }

    async updateNews() {
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=c0db62faa795439697d9ace4fa6c5cdc&page=${this.state.page}&pageSize=${this.props.pageSize}`
        this.setState({ loading: true })
        let data = await fetch(url)
        let dataParsed = await data.json()
        console.log(dataParsed)
        this.setState({ articles: dataParsed.articles, totalResults: dataParsed.totalResults, loading: false })
    }
    async componentDidMount() {

        this.updateNews()
    }

    fetchMoreData = async () => {
        this.setState({ page: this.state.page + 1 }, async () => {
            let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=c0db62faa795439697d9ace4fa6c5cdc&page=${this.state.page}&pageSize=${this.props.pageSize}`
            let data = await fetch(url)
            let dataParsed = await data.json()
            this.setState({ articles: this.state.articles.concat(dataParsed.articles), totalResults: dataParsed.totalResults, loading: false })
            let totaldatafetch = 0
            console.log(totaldatafetch += this.state.articles.length)
            if(this.state.articles.length === this.state.totalResults){
                console.log("All data is fetched")
            }
        })
    }
    // handleNextClick = async () => {
    //     console.log("mext")
    //     this.setState({ page: this.state.page + 1 }, () => {
    //         this.updateNews()
    //     })


    // }

    // handlePrevClick = async () => {
    //     console.log("previous")

    //     this.setState({ page: this.state.page - 1 }, () => {
    //         this.updateNews()
    //     })

    // }
    render() {
        return (
            <>
                <h1 className='text-center' style={{ margin: "43px 0px", fontFamily: "sans-serif" }} >NewsLite - Top {this.captFirstLetter(this.props.category)} Headlines</h1>
                {this.state.loading && <Spinner />}

                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length !== this.state.totalResults}
                    loader={<Spinner />}
                >
                    <div className="container">
                        <div className="row my-3">
                            {this.state.articles.map((element) => {
                                return <div className="col-md-4 " key={element.url}>
                                    <NewsItem title={element.title ? element.title : ""} description={element.description ? element.description : ""} imageUrl={element.urlToImage ? element.urlToImage : "https://img.etimg.com/thumb/msid-104374078,width-1200,height-630,imgsize-155888,overlay-economictimes/photo.jpg"} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                                </div>
                            })}

                        </div>
                    </div>
                </InfiniteScroll>
                {/* <div className="container d-flex justify-content-between">
                    <button type="button" className="btn btn-dark" disabled={this.state.page <= 1} onClick={this.handlePrevClick}>&larr; previous</button>
                    <button type="button" className="btn btn-dark" disabled={this.state.page+1 > Math.ceil(this.state.totalResults / this.props.pageSize)} onClick={this.handleNextClick}>next &rarr;</button>
                </div> */}

            </>
        )
    }
}

export default News
