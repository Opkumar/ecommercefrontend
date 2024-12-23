import { Link ,useNavigate} from "react-router-dom";
import { useState } from "react";
import { Button } from "./ui/button";
import Products from "./Products";

export default function Home() {
  const [showLogout, setShowLogout] = useState(false);
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("userId"); // Clear the user ID from local storage
    navigate("/login"); // Redirect to the login page
  };

  const toggleLogout = () => {
    setShowLogout((prev) => !prev); // Toggle the logout dropdown
  };
  return (
    <div>
      <div className="font-sans">
        {/* Top Banner */}
        <marquee className="bg-red-100 text-red-600 text-center py-2 text-sm">
          SALE - UPTO 80% OFF + EXTRA 10% OFF ON PREPAID ORDERS SALE - UPTO 80%
          OFF + EXTRA 10% OFF ON PREPAID ORDERS SALE - UPTO 80% OFF + EXTRA 10%
          OFF ON PREPAID ORDERS
        </marquee>

        {/* Header Navigation */}
        <header className="flex justify-between items-center py-4 px-6 border-b border-gray-200">
          <div className="text-2xl font-bold">OmFashion</div>
          <div>
            <div className=" flex justify-between items-center gap-2">
              <Link   to="/products">
                <Button variant="outline" >View Products</Button>
              </Link>
              <Link to="/cart">
                <Button variant="outline">
                  <i className="fa-solid fa-cart-shopping"></i>
                </Button>
              </Link>
              <Link to="/place-order">
                <Button variant="outline">Order</Button>
              </Link>

              <Link to="/create-product">
                <Button variant="outline">Add product</Button>
              </Link>

              {userId ? (
                <div className="relative">
                {/* User Image */}
                <img
                  src={`https://cdn-icons-png.flaticon.com/512/149/149071.png`}
                  alt="userImage"
                  className="rounded-full w-[44px] h-[44px] cursor-pointer"
                  onClick={toggleLogout}
                />
                {/* Logout Dropdown */}
                {showLogout && (
                  <div className="absolute right-0 mt-2 bg-white border rounded shadow-lg p-2">
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
              ) : (
                <Link to="/login">
                  <Button variant="outline">Login</Button>
                </Link>
              )}
            </div>
          </div>
        </header>

        {/* Horizontal Carousel */}

        {/* Main Content */}
        <div className="flex px-6 py-6 justify-center ">
          {/* Products Grid */}
          <main className="flex justify-center items-center">
            <Products />
          </main>
        </div>
      </div>
    </div>
  );
}
