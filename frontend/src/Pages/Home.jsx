import Products from "../Components/Products/Products";
import Navigation from "../Components/Navigation/Nav";
import Recommended from "../Components/Recommended/Recommended";
function Home() {
  return (
    <>
      <Navigation />
      <Products />
      <Recommended />
    </>
  );
}

export default Home;
