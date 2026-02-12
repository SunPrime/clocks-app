import Header from "./layout/header.jsx";
import Main from "./layout/main.jsx";
import Footer from "./layout/footer.jsx";

const App = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Header />
      <div className="flex-1">
        <Main>{children}</Main>
      </div>
      <Footer />
    </div>
  );
};

export default App;