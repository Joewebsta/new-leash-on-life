import { Link } from "react-router";

export function ErrorState() {
  return (
    <div className="pb-[84px] sm:pb-0 px-6 md:px-10 xl:px-20 flex flex-col flex-1">
      <div className="flex flex-col flex-1">
        <div className="p-4 mt-6 bg-red-50 border border-red-200 rounded-md">
          <p className="text-red-600 text-sm">
            There was an error loading the search results. If reloading doesn't
            work please{" "}
            <Link
              to="/login"
              className="underline hover:no-underline font-medium"
            >
              login again
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
