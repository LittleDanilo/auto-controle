import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login"
import Transaction from "./pages/Transaction";
import TransactionList from "./pages/TransactionList";
import Account from "./pages/Account"
import AccountList from "./pages/AccountList"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/lista-transacoes" element={<TransactionList />} />
        <Route path="/lista-contas" element={<AccountList />} />
        <Route path="/transacoes" element={<Transaction />} />
        <Route path="/contas" element={<Account />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
