import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'

export class News extends Component {

    
    static defaultProps ={
        country: 'in',
        pageSize: 6,
        category:'general'
    }

    static propTypes ={
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string
    }

    constructor() {
        super();
        this.state = {
            articles: [],
            loading: false,
            page: 1
        }
    }

    async updateNews(){
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=c0db62faa795439697d9ace4fa6c5cdc&page=${this.state.page}&pageSize=${this.props.pageSize}`
        this.setState({loading:true})
        let data = await fetch(url)
        let dataParsed = await data.json()
        this.setState({ articles: dataParsed.articles, totalResults: dataParsed.totalResults ,loading:false})
    }
    async componentDidMount() {
        // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=c0db62faa795439697d9ace4fa6c5cdc&page=1&pageSize=${this.props.pageSize}`
        // this.setState({loading:true})
        // let data = await fetch(url)
        // let dataParsed = await data.json()
        
        // this.setState({ articles: dataParsed.articles, totalResults: dataParsed.totalResults ,loading:false}  
        // //     ()=>{
        // //     console.log(this.state.articles)
        // //     console.log(this.state.loading)
        // //     console.log(this.state.totalResults)
        // // }
        // )
        this.updateNews()
    }

    handleNextClick = async () => {
        console.log("mext")
        // if (!(this.state.page +1> Math.ceil(this.state.totalResults / 20))) {
        //     let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=c0db62faa795439697d9ace4fa6c5cdc&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`
        //     this.setState({loading:true})
        //     let data = await fetch(url)
        //     let dataParsed = await data.json()
        //     this.setState({
        //         articles: dataParsed.articles,
        //         page: this.state.page + 1,
        //         loading:false
        //     })
        // } 
        this.setState({page:this.state.page + 1})
        this.updateNews()

    }

    handlePrevClick = async () => {
        console.log("previous")
        // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=c0db62faa795439697d9ace4fa6c5cdc&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`
        // this.setState({loading:true})
        // let data = await fetch(url)
        // let dataParsed = await data.json()
        // this.setState({
        //     articles: dataParsed.articles,
        //     page: this.state.page - 1,
        //     loading:false
        // })
        this.setState({page:this.state.page - 1})
        this.updateNews()
    }
    render() {
        return (
            <div className='container my-3'>
                <h1 className='text-center' style={{margin:"43px 0px" , fontFamily:"sans-serif"}} >NewsLite - Top Headlines</h1>
                {this.state.loading && <Spinner/>}
                <div className="row my-3">
                    {!this.state.loading && this.state.articles.map((element) => {
                        return <div className="col-md-4 " key={element.url}>
                            <NewsItem title={element.title ? element.title: ""} description={element.description ? element.description: ""} imageUrl={element.urlToImage ? element.urlToImage : "https://img.etimg.com/thumb/msid-104374078,width-1200,height-630,imgsize-155888,overlay-economictimes/photo.jpg"} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                        </div>
                    })}

                </div>
                <div className="container d-flex justify-content-between">
                    <button type="button" className="btn btn-dark" disabled={this.state.page <= 1} onClick={this.handlePrevClick}>&larr; previous</button>
                    <button type="button" className="btn btn-dark" disabled={this.state.page+1 > Math.ceil(this.state.totalResults / this.props.pageSize)} onClick={this.handleNextClick}>next &rarr;</button>
                </div>

            </div>
        )
    }
}

export default News
