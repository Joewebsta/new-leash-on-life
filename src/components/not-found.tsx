import { Button } from "@/components/ui/button";
import { Link } from "react-router";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center px-4">
      <h1 className="text-9xl font-bold text-gray-800 mb-2">404</h1>
      <h2 className="text-3xl font-semibold text-gray-600 mb-4">
        Page Not Found
      </h2>
      <p className="text-gray-500 mb-8">
        Sorry, the page you are looking for doesn't exist.
      </p>

      <Link to="/dogs/search?sort=breed:asc">
        <Button>Search for dogs </Button>
      </Link>
    </div>
  );
};

export default NotFound;
