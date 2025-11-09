import React from "react";
function LeftSection({
  imageUrl,
  productName,
  productDescription,
  tryDemo,
  leranMore,
  googlePlay,
  appStore,
}) {
  return (
    <div className="container py-5">
      <div className="row align-items-center g-4">
        <div className="col-12 col-lg-6">
          <img src={imageUrl} alt="leftimg" className="img-fluid" />
        </div>
        <div className="col-12 col-lg-6 p-3 p-md-4">
          <h1>{productName}</h1>
          <p className="text-muted" style={{ lineHeight: 1.8 }}>
            {productDescription}
          </p>
          <div className="d-flex flex-wrap gap-4">
            <a href={tryDemo} className="text-decoration-none">
              Try demo <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>
            </a>
            <a href={leranMore} className="text-decoration-none">
              Learn more <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>
            </a>
          </div>
          <div className="mt-3 d-flex gap-3 flex-wrap">
            <a href={googlePlay}>
              <img src="media/images/googlePlayBadge.svg" alt="googlePlay" className="img-fluid" />
            </a>
            <a href={appStore}>
              <img src="media/images/appStoreBadge.svg" alt="appStore" className="img-fluid" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LeftSection;
