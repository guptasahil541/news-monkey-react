import React, { Component } from "react";
import Loading from "./Loading";
import NewsItem from "./NewsItem";
import PropTypes from 'prop-types'

export class News extends Component {

  static defaultProps = {
    pageSize: 20,
    country: "in",
    category: "general"
  }

  static propTypes = {
    pageSize: PropTypes.number,
    country: PropTypes.string,
    category: PropTypes.string
  }

  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1,
    };
    document.title = `${this.capitalizeFirstLetter(this.props.category)} - NewsMonkey App`;
  }

  async updateNews(){
    let url =
    `https://newsapi.org/v2/top-headlines?apiKey=e1caf075a3644ff8bcd3333401ca9e1b&category=${this.props.category}&country=${this.props.country}&page=${this.state.page}&pagesize=${this.props.pageSize}`;
    this.setState({loading: true});
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false
    });
  }

  async componentDidMount() {
    await this.updateNews();
  }

  handlePrevClick = async () => {
    await this.setState({page: this.state.page - 1});
    await this.updateNews();
  };

  handleNextClick = async () => {
    await this.setState({page: this.state.page + 1});
    await this.updateNews();
  };

  render() {
    return (
      <div>
        <div className="container mt-5">
          <h1 className="mb-5">NewsMonkey - Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h1>
          {this.state.loading && <Loading />}
          <div className="row">
            {!this.state.loading && this.state.articles.map((elem) => {
              return (
                <div className="col-md-4 mb-4" key={elem.url}>
                  <NewsItem
                    title={elem.title ? elem.title.slice(0, 45) : ""}
                    description={
                      elem.description ? elem.description.slice(0, 90) : ""
                    }
                    imgURL={elem.urlToImage}
                    newsURL={elem.url}
                  />
                </div>
              );
            })}
          </div>
        </div>
        <div className="container">
          <button
            disabled={this.state.page <= 1}
            type="button"
            className="btn btn-dark mb-5 mt-3"
            onClick={this.handlePrevClick}
          >
            Previous
          </button>
          <button
            disabled={
              this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)
            }
            type="button"
            className="btn btn-dark mx-3 mb-5 mt-3"
            onClick={this.handleNextClick}
          >
            Next
          </button>
        </div>
      </div>
    );
  }
}

export default News;
