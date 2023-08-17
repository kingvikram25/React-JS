import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 8,
    category: "general",
  };

  static propType = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };

  // PropTypes use krne ke liye statics variable use krna rhte hai.

  capitalize = (text) => {
    let newText = text.charAt(0).toUpperCase() + text.slice(1);
    return newText;
  };

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      fLoad: true,
      page: 1,
      totalResults: 0,
    };
    document.title = `NewsWale - ${this.capitalize(this.props.category)}`;
  }

  // async updateNews() {
  //   const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
  //   this.setState({ fLoad: true });
  //   let fetchData = await fetch(url);
  //   let jsonData = await fetchData.json();
  //   console.log(jsonData);
  //   this.setState({
  //     articles: jsonData.articles,
  //     totalResults: jsonData.totalResults,
  //     fLoad: false,
  //   });
  // }

  async componentDidMount() {
    this.fetchMoreData();
  }

  fetchMoreData = async () => {
    this.props.setProgress(10);

    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${process.env.REACT_APP_NEWS_API_KEY}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    console.log(url, "url-n");
    let fetchData = await fetch(url);
    this.props.setProgress(30);

    let jsonData = await fetchData.json();
    this.props.setProgress(70);

    let { totalResults, articles } = jsonData;
    let load = this.state.articles.length < totalResults;
    this.setState({
      articles: this.state.articles.concat(articles),
      totalResults: totalResults,
      page: this.state.page + 1,
      loading: load,
      fLoad: false,
    });

    this.props.setProgress(100);
  };

  // handleNextClick = async () => {
  //   this.setState({${this.state.apikey}
  //     page: this.state.page + 1,
  //   });
  //   this.updateNews();
  // };

  // handlePreviousClick = async () => {
  //   this.setState({
  //     page: this.state.page - 1,
  //   });
  //   this.updateNews();
  // };

  render() {
    return (
      <>
        <div className="container ">
          <h2 className="text-center " style={{ color: "white" }}>
            NewsWale - Top {this.capitalize(this.props.category)} Headlines
          </h2>
          {this.state.fLoad && <Spinner />}
          <InfiniteScroll
            dataLength={this.state.articles.length}
            next={this.fetchMoreData}
            hasMore={this.state.loading}
            endMessage={
              <p style={{ textAlign: "center" }}>
                <b>Yay! You have seen it all</b>
              </p>
            }
            loader={<Spinner />}
          >
            <div className="row differ-hg mx-2 my-2">
              {this.state.articles &&
                // !this.state.loading &&
                this.state.articles.map((ele) => {
                  return (
                    <div className="col-md-3 gaps-mar" key={ele.url}>
                      <NewsItem
                        title={ele.title}
                        description={ele.description}
                        author={ele.author}
                        date={new Date(ele.publishedAt).toGMTString()}
                        source={ele.source.name}
                        imageUrl={
                          !ele.urlToImage
                            ? "https://img.freepik.com/free-photo/isolated-happy-smiling-dog-white-background-portrait-4_1562-693.jpg?w=2000"
                            : ele.urlToImage
                        }
                        newsUrl={ele.url}
                      />
                    </div>
                  );
                })}
            </div>
          </InfiniteScroll>
        </div>

        {/* <div className="container d-flex justify-content-between">
          <button
            type="button"
            disabled={this.state.page <= 1}
            onClick={this.handlePreviousClick}
            className="btn btn-dark "
          >
            &larr; Previous
          </button>
          <button
            type="button"
            disabled={
              this.state.page + 1 >
              Math.ceil(this.state.totalResults / this.props.pageSize)
            }
            onClick={this.handleNextClick}
            className="btn btn-dark d-flex justify-content-between"
          >
            Next &rarr;
          </button>
        </div> */}
      </>
    );
  }
}

export default News;

// componentDidMount() method render method ke run ho jane ke baad kaam krta h

// render se phle constructor run hota hai.

// react-lifecycle-diagram

// react-top-loading-bar
