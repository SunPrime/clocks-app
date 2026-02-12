import Header from "./layout/header.jsx";
import Main from "./layout/main.jsx";
import Footer from "./layout/footer.jsx";

const App = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans selection:bg-indigo-100 selection:text-indigo-900">
      <Header />
      <div className="flex-1">
        <Main>{children}</Main>
      </div>
      <Footer />
    </div>
  );
};

export default App;