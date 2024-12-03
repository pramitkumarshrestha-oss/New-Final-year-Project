import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Dashboard from "./pages/Dashboard";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import ProductUpload from "./pages/ProductUpload";
import React, { createContext, useState, useEffect } from "react";
import ProductList from "./pages/ProductList";
import Workers from "./pages/Workers";
import WorkerForm from "./pages/WorkerForm";
import Order from "./pages/Order";
import EditWorker from "./pages/WorkerForm/EditWorker";

const MyContext = createContext();
function App() {
  const [isToggleSidebar, setIsToggleSidebar] = useState(false);

  const values = {
    isToggleSidebar,
    setIsToggleSidebar,
  };

  return (
    <BrowserRouter>
      <MyContext.Provider value={values}>
        <Header />
        <div className="main d-flex">
          <div
            className={`sidebarWrapper ${
              isToggleSidebar == true ? "toggle" : ""
            }`}
          >
            <Sidebar />
          </div>
          <div className={`content ${isToggleSidebar == true ? "toggle" : ""}`}>
            <Routes>
              <Route path="/" exact={true} element={<Dashboard />} />
              <Route path="/dashboard" exact={true} element={<Dashboard />} />
              <Route
                path="/product/upload"
                exact={true}
                element={<ProductUpload />}
              />
              <Route
                path="/product/list"
                exact={true}
                element={<ProductList />}
              />
              <Route path="/workers" exact={true} element={<Workers />}></Route>
              <Route
                path="/worker/form"
                exact={true}
                element={<WorkerForm />}
              ></Route>
              <Route path="/order" exact={true} element={<Order />}></Route>
              <Route
                path="/editWorker"
                exact={true}
                element={<EditWorker />}
              ></Route>
            </Routes>
          </div>
        </div>
      </MyContext.Provider>
    </BrowserRouter>
  );
}

export default App;
export { MyContext };
