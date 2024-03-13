import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = ({ children }: any): JSX.Element => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* <div className="flex flex-col min-h-screen  bg-background-light"> */}
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8 sm:px-6 md:px-8">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
