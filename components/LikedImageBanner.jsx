import { FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { BiSolidLike } from "react-icons/bi";
const LikedImagesBanner = () => {
  const navigate = useNavigate();

  return (
    <div className="container mb-4">
      <div 
        className="position-relative overflow-hidden rounded-3 shadow-sm cursor-pointer liked-banner"
        style={{ height: '200px' ,cursor:"pointer"}}
        onClick={() => navigate("/liked-images")}
      >
        {/* Background Image */}
        <img 
          src="https://plus.unsplash.com/premium_photo-1698117059857-afdb96271acc?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
          alt="Liked Banner" 
          className="w-100 h-100 object-fit-cover"
        />

        <div className="position-absolute top-0 start-0 w-100 h-100 d-flex flex-column justify-content-center align-items-center bg-dark bg-opacity-50 text-white text-center">
         
          <h5 className="m-0 fw-semibold"> <BiSolidLike className="mb-2"  /> View Your Favourite Images</h5>

        </div>
      </div>
    </div>
  );
};

export default LikedImagesBanner;
