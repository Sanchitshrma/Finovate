import React from "react";
function RightSection({
  imageUrl,
  productName,
  productDescription,
  tryDemo,
  tryDemoLink,
}) {
  return (
    <div className="container p-5 ">
      <div className="row">
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
              href={tryDemoLink}
              className="mx-1"
              style={{ textDecoration: "none" }}
            >
              {tryDemo}
              <i class="fa-solid fa-arrow-right mx-1" aria-hidden="true"></i>
            </a>
          </div>
        </div>
        <div className="col-6 ">
          <img src={imageUrl} alt="leftimg" />
        </div>
      </div>
    </div>
  );
}

export default RightSection;
