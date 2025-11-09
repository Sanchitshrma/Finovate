import React from "react";
function RightSection({
  imageUrl,
  productName,
  productDescription,
  tryDemo,
  tryDemoLink,
}) {
  return (
    <div className="container py-5">
      <div className="row align-items-center g-4">
        <div className="col-12 col-lg-6 p-3 p-md-4 order-2 order-lg-1">
          <h1>{productName}</h1>
          <p className="text-muted" style={{ lineHeight: 1.8 }}>
            {productDescription}
          </p>
          <div>
            <a href={tryDemoLink} className="text-decoration-none">
              {tryDemo}
              <i className="fa-solid fa-arrow-right mx-1" aria-hidden="true"></i>
            </a>
          </div>
        </div>
        <div className="col-12 col-lg-6 order-1 order-lg-2">
          <img src={imageUrl} alt="leftimg" className="img-fluid" />
        </div>
      </div>
    </div>
  );
}

export default RightSection;
