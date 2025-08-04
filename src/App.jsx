import { Button, Navbar, Footer, Stats, Info, Malla, Welcome, EditCourseModal } from "./components";

function App() {
  return (
    <>
      <Navbar />
      <div className="max-w-screen-xl mx-auto">
        <Button />
        <Welcome />
        <Stats />
      </div>
      <Malla />
      <Info />
      <Footer />
      <EditCourseModal />
    </>
  );
}

export default App;
