import ErrorPage from "@/pages/ErrorPage";
import { EventPage } from "@/pages/EventPage";
import { LoginPage } from "@/pages/LoginPage";
import { createBrowserRouter } from "react-router";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: LoginPage,
    errorElement: <ErrorPage />,
    // children: [
    //   { path: "", Component: HomePage },
    //   {
    //     path: "",
    //     element: <PrivateRoute />,
    //     children: [{ path: "profile", Component: ProfilePage }],
    //   },
    //   {
    //     path: "",
    //     element: <AuthRoute />,
    //     children: [
    //       { path: "login", Component: LoginPage },
    //       { path: "register", Component: RegisterPage },
    //       { path: "forgot-password", Component: ForgotPasswordPage },
    //     ],
    //   },
    //   { path: "products", Component: ProductPage },
    //   { path: "products/:id", Component: ProductDetailsPage },
    //   { path: "category/:id", Component: CategoryProductsPage },
    //   { path: "brand/:id", Component: BrandProductsPage },
    //   { path: "combo-offer", Component: ComboOfferPage },
    //   { path: "wholesale", Component: WholesalePage },
    //   { path: "age-group", Component: AgeGroupProductsPage },
    //   { path: "about", Component: AboutPage },
    //   { path: "privacy", Component: PrivacyPage },
    //   { path: "checkout", Component: CheckoutPage },
    // ],
  },
  {
    path: "/event",
    Component: EventPage,
  },
]);
