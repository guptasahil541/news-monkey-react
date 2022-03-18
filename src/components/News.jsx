import React, { useEffect, useState } from "react";
import Loading from "./Loading";
import NewsItem from "./NewsItem";
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {

  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResuls] = useState(0);
  const [loading, setLoading] = useState(true);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  

  const updateNews = async () => {
    props.setProgress(10);
    let url =
    `https://newsapi.org/v2/top-headlines?apiKey=${props.apiKey}&category=${props.category}&country=${props.country}&page=${page}&pagesize=${props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    setArticles(articles.concat(parsedData.articles));
    setTotalResuls(parsedData.totalResults);
    setLoading(false);
    props.setProgress(100);
  }

  useEffect(
    () => {  
        document.title = `${capitalizeFirstLetter(props.category)} - NewsMonkey App`;
        updateNews();
    },[]
  );

  const fetchMoreData = async () => {
    let url =
    `https://newsapi.org/v2/top-headlines?apiKey=${props.apiKey}&category=${props.category}&country=${props.country}&page=${page+1}&pagesize=${props.pageSize}`;
    setPage(page + 1);
    let data = await fetch(url);
    let parsedData = await data.json();
    setArticles(articles.concat(parsedData.articles));
    setTotalResuls(parsedData.totalResults);
    setLoading(false);
  };

    return (
      <div>
        <div className="container mt-5">
          <h1 className="mb-5">NewsMonkey - Top {capitalizeFirstLetter(props.category)} Headlines</h1>
          {loading && <Loading />}
          <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Loading />}
          >
          <div className="row">
            {articles.map((elem) => {
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
          </InfiniteScroll>
        </div>
      </div>
    );
}

News.defaultProps = {
  pageSize: 20,
  country: "in",
  category: "general"
}

News.propTypes = {
  pageSize: PropTypes.number,
  country: PropTypes.string,
  category: PropTypes.string
}

export default News;
