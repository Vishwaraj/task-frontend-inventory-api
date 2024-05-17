import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/protected-route/ProtectedRoute";
import AuthLayout from "./layout/auth/AuthLayout";
import CustomersLayout from "./layout/customers/CustomersLayout";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<AuthLayout />} />
        <Route
          path="/customers"
          element={
            <ProtectedRoute>
              <CustomersLayout />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
