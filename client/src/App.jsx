// /* eslint-disable no-unused-vars */
import { Route, Routes } from "react-router-dom";
import "./App.css";
import axios from "axios";
import IndexPage from "./pages/IndexPage";
import RegisterPage from "./pages/RegisterPage";
import Layout from "./Layout";
import LoginPage from "./pages/LoginPage";
import { UserContextProvider } from "./UserContext";
import UserAccountPage from "./pages/UserAccountPage";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import AddEvent from "./pages/AddEvent";
import EventPage from "./pages/EventPage";
import CalendarView from "./pages/CalendarView";
import OrderSummary from "./pages/OrderSummary";
import PaymentSummary from "./pages/PaymentSummary";
import TicketPage from "./pages/TicketPage";
// import CreatEvent from './pages/CreateEvent'

// Configure Axios globally
axios.defaults.baseURL = "http://localhost:5000/api/";
axios.defaults.withCredentials = true;

function App() {
  return (
    <UserContextProvider>
      <Routes>
        {/* Main Layout Routes */}
        <Route path="/" element={<Layout />}> {/* done    */}
          <Route index element={<IndexPage />} />
          <Route path="/useraccount" element={<UserAccountPage />} />
          <Route path="/createEvent" element={<AddEvent />} /> {/* done    */}
          <Route path="/event/:id" element={<EventPage />} /> {/* done    */}
          <Route path="/calendar" element={<CalendarView />} /> {/* done    */}
          <Route path="/tickets" element={<TicketPage />} />
          <Route path="/event/:id/ordersummary" element={<OrderSummary />} /> {/* done    */}
        </Route>

        <Route path="/event/:id/ordersummary/paymentsummary" element={<PaymentSummary />} /> {/* done    */}
        {/* Auth Routes */}
        <Route path="/register" element={<RegisterPage />} /> {/* done    */}
        <Route path="/login" element={<LoginPage />} /> {/* done    */}
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/resetpassword" element={<ResetPassword />} />
      </Routes>
    </UserContextProvider>
  );
}

export default App;
