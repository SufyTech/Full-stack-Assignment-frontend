import { BookingProvider } from "./context/BookingContext";
import BookingPage from "./pages/BookingPage";

function App() {
  return (
    <BookingProvider>
      <BookingPage />
    </BookingProvider>
  );
}

export default App;
