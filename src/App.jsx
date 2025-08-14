import Header from "./components/Header";
import Footer from "./components/Footer";
import DollarTodo from "./components/dollar/DollarTodo";

export default function App() {
  return (
    <>
      <Header />

      {/* Principal App */}
      <section className="bg-gray-300 min-h-screen flex items-center justify-center dark:bg-gray-700">
        <DollarTodo />
      </section>

      <Footer />
    </>
  );
}
