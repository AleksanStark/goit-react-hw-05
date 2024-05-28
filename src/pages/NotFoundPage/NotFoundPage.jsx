import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div>
      <h1>
        Not Found Page please <Link to="/">click on it </Link>
      </h1>
    </div>
  );
};
export default NotFoundPage;
