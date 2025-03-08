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
    <div className="container p-5 ">
      <div className="row">
        <div className="col-6 ">
          <img src={imageUrl} alt="leftimg" />
        </div>
        <div className="col-6 p-5 mt-5">
          <h1>{productName}</h1>
          <p
            style={{ lineHeight: "1.8", fontSize: "1.2em" }}
            className="text-muted"
          >
            {productDescription}
          </p>
          <div>
            <a
              href={tryDemo}
              className="mx-1"
              style={{ textDecoration: "none" }}
            >
              Try demo{" "}
              <i class="fa-solid fa-arrow-right" aria-hidden="true"></i>
            </a>
            <a
              href={leranMore}
              style={{ textDecoration: "none", marginLeft: "50px" }}
            >
              Learn more{" "}
              <i class="fa-solid fa-arrow-right" aria-hidden="true"></i>
            </a>
          </div>
          <div className="mt-3">
            <a href={googlePlay}>
              <img src="media/images/googlePlayBadge.svg" alt="googlePlay" />
            </a>
            <a href={appStore} style={{ marginLeft: "50px" }}>
              <img src="media/images/appStoreBadge.svg" alt="appStore" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LeftSection;
