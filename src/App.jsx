import { Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import { Oval } from "react-loader-spinner";

const HomePage = lazy(() => import("./pages/HomePage/HomePage"));
const MoviesPage = lazy(() => import("./pages/MoviesPage/MoviesPage"));
const MoviesDetailsPage = lazy(() =>
  import("./pages/MovieDetailsPage/MovieDetailsPage")
);
const Navigation = lazy(() => import("./components/Navigation"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage/NotFoundPage"));
const MovieReviews = lazy(() =>
  import("./components/MovieReviews/MovieReviews")
);
const MovieCast = lazy(() => import("./components/MovieCast/MovieCast"));
const App = () => {
  return (
    <div>
      <Navigation />
      <Suspense fallback={<Oval />}>
        <Routes>
          <Route path={"/"} element={<HomePage />} />
          <Route path={"/movies"} element={<MoviesPage />} />
          <Route path={"/movies/:movieId"} element={<MoviesDetailsPage />}>
            <Route path={"reviews"} element={<MovieReviews />} />
            <Route path={"cast"} element={<MovieCast />} />
          </Route>

          <Route path={"*"} element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </div>
  );
};
export default App;
