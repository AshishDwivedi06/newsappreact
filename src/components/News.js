import React, { Component } from 'react'

import NewsItem from './NewsItem'

import Spinner from './Spinner';

import PropTypes from 'prop-types';










export class News extends Component {

  static defaultProps = {

    country: 'in',

    pageSize: 8,

    category: 'general',

  }

  static propTypes = {

   country: PropTypes.string,

  pageSize: PropTypes.number

  }

  capitalizeFirstLetter=(string)=> {

    return string.charAt(0).toUpperCase()
+ string.slice(1);

  }




  constructor(props) {

    super(props);

    console.log("Hello I am a constructor from News components");

    this.state = {

      articles: [],

      loading: false,

      page: 1







    }

    document.title=`${this.capitalizeFirstLetter(this.props.category)}
- News 24x7`;

  }

  

  async componentDidMount() {

    this.props.setProgress(0);

    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page
}1&pageSize=${this.props.pageSize}`;

    let data = await fetch(url);

    this.props.setProgress(20);

    let parsedData = await data.json()

    console.log(parsedData);

    this.props.setProgress(40);

    this.setState({ articles: parsedData.articles, totalResults:
parsedData.totalResults,loading : false })

    this.props.setProgress(100);

  }

  

  handleNextClick = async () => {

    

    if (this.state.page + 1 > Math.ceil(this.state.totalResults
/ this.props.pageSize)) {

      

    }

   

    else {

      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page
+ 1}&pageSize=${this.props.pageSize}`;

      this.setState({loading:true});

      let data = await fetch(url);

      let parsedData = await data.json()

      

      this.setState({

        page: this.state.page + 1,

        articles: parsedData.articles,

        loading : false

      })

      

    }

  }

  handlePrevClick = async () => {

    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page
- 1}&pageSize=${this.props.pageSize}`;

    this.setState({loading:true});

    let data = await fetch(url);

    let parsedData = await data.json()

    console.log(parsedData);

    this.setState({

      page: this.state.page - 1,

      articles: parsedData.articles,

      loading:false

    })

    

  }

  render() {

    return (




      <div className="container my-3">

        <h1 className="text-center" style={{margin:'35px'}}>News
24x7 - Top { this.capitalizeFirstLetter(this.props.category)}
Headline</h1>

       {this.state.loading  &&<Spinner/>}

        <div className="row">

          { !this.state.loading &&this.state.articles.map((element)=> {

            return <div className="col-md-4" key={element.url}>

              <NewsItem title={element.title
? element.title : ""} description={element.description
? element.description : ""} imageUrl={element.urlToImage}
newsUrl={element.url} author={element.author}
date={element.publishedAt} />

            </div>

          })}

          <div className="container d-flex justify-content-between" >




            <button disabled={this.state.page
<= 1} type="button" className="btn btn-dark"
onClick={this.handlePrevClick}> &laquo; Previous</button>

            <button disabled={this.state.page
+ 1 > Math.ceil(this.state.totalResults /
this.props.pageSize)}  type="button" className="btn
btn-dark" onClick={this.handleNextClick}>Next  &raquo;</button>







          </div>




        </div>

      </div>

    )

  }

}




export default News 