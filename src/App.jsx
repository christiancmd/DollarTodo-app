import DollarToday from "./components/dollar/DollarTodo";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      {/* Header */}
      <Header />

      {/* Principal App */}
      <section className="bg-gray-400 min-h-screen flex items-center justify-center">
        <DollarToday />
      </section>

      {/* Footer */}
      <Footer />
    </>
  );
}

export default App;
