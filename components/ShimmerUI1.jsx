// components/ShimmerUIAlbum.js
import React from 'react';

const ShimmerUIAlbum = () => {
  const shimmerArray = Array.from({ length: 8 });

  return (
    <div className="container mt-4" aria-busy="true">
      {/* Title and Description Shimmer */}
      <div className="text-center mb-4">
        <h2 className="placeholder-glow">
          <span className="placeholder col-6 bg-dark rounded"></span>
        </h2>
        <p className="placeholder-glow">
          <span className="placeholder col-4 bg-dark rounded"></span>
        </p>
      </div>

      {/* Image Card Grid Skeleton */}
      <div className="row">
        {shimmerArray.map((_, idx) => (
          <div key={idx} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
            <div className="position-relative  rounded bg-dark" style={{ height: '250px' }}>
              {/* Image Placeholder */}
              <div className="placeholder-glow h-100 w-100">
                <div className="placeholder w-100 h-100 bg-dark rounded"></div>
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShimmerUIAlbum;
