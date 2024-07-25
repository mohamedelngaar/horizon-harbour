import { Outlet } from "react-router-dom";

import NavigationBar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";

const AppLayout = ({
  user,
  handleCallbackResponse,
  handleSignOut,
  isLoggedIn,
}) => {
  return (
    <div>
      <NavigationBar
        user={user}
        handleCallbackResponse={handleCallbackResponse}
        handleSignOut={handleSignOut}
        isLoggedIn={isLoggedIn}
      />
      <Outlet></Outlet>
      <Footer />
    </div>
  );
};

export default AppLayout;
