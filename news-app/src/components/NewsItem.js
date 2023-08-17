import React, { Component } from "react";

export class NewsItem extends Component {
  render() {
    let { title, description, imageUrl, newsUrl, author, date, source } =
      this.props;
    return (
      <div className="blog">
        <div className="card flex-fill">
          <span
            className="position-absolute top-0  translate-middle badge rounded-pill bg-primary"
            style={{ zIndex: "1", left: "50%" }}
          >
            {source}
          </span>
          <img src={imageUrl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h6 className="card-title">{title}</h6>
            <p className="card-text">{description}</p>
            <p className="card-text">
              <small className="text-body-secondary">
                By <strong>{!author ? "Unknown" : author}</strong> on {date}
              </small>
            </p>
            <a
              href={newsUrl}
              target="_blank"
              className="btn btn-sm btn-dark"
              rel="noreferrer"
            >
              Read more
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItem;
