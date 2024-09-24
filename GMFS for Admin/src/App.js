import "./App.css";
import LoginPage from "./login/LoginPage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./admin/pages/AdminHome";
import Products from "./admin/pages/AdminProducts";
import WorkerTable from "./admin/pages/tables/WorkerTable";
import WorkerForm from "./admin/pages/forms/AddWorkerForm";
import CustomerForm from "./admin/pages/forms/AddCustomerForm";
import RawMaterialForm from "./admin/pages/forms/AddRawMaterialForm";
import RawMaterialTable from "./admin/pages/tables/RawMaterialTable";
import CustomerTable from "./admin/pages/tables/CustomerTable";
import ProductForm from "./admin/pages/forms/AddProductForm";
import OrderTable from "./admin/pages/tables/OrderTable";

import Worker from "./worker";
function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />}></Route>
        {/* Admin Routes */}
        <Route path="admin/home" element={<Home />} />
        <Route path="admin/products" element={<Products />} />
        <Route path="admin/workerForm" element={<WorkerForm />} />
        <Route path="admin/customerForm" element={<CustomerForm />} />
        <Route path="admin/rawMaterialForm" element={<RawMaterialForm />} />
        <Route path="admin/workerTable" element={<WorkerTable />} />
        <Route path="admin/rawMaterialsTable" element={<RawMaterialTable />} />
        <Route path="admin/customerTable" element={<CustomerTable />} />
        <Route path="admin/productTable" element={<RawMaterialTable />} />
        <Route path="admin/productForm" element={<ProductForm />} />
        <Route path="admin/orderTable" element={<OrderTable />} />

        <Route path="/worker" element={<Worker />} />
      </Routes>
    </Router>
  );
}

export default App;
