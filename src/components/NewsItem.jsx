import React from "react";

const NewsItem = (props) => {
 
    let {title, description, imgURL, newsURL} = props;
    return (
      <div>
        <div className="card">
          <img src={imgURL?imgURL:"https://static.toiimg.com/thumb/msid-47529300,width-1070,height-580,imgsize-110164,resizemode-75,overlay-toi_sw,pt-32,y_pad-40/photo.jpg"} className="card-img-top" alt="news-cover" style={{width:"100%", height: "250px", objectFit: "cover"}} />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">
              {description}
            </p>
            <a rel="noreferrer" href={newsURL} target="_blank" className="btn btn-primary">
              Read More
            </a>
          </div>
        </div>
      </div>
    );
}

export default NewsItem;
