import Header from "./layout/header/header";
import Main from "./layout/main/main";
import Footer from "./layout/footer/footer";

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