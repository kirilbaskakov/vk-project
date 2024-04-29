import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Layout from "./components/Layout";
import MainPage from "./pages/MainPage";
import DetailsPage from "./pages/DetailsPage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route to="/" element={<Layout />}>
      <Route index element={<MainPage />} />
      <Route path="details/:id" element={<DetailsPage />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
