import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import ContactList from "./pages/ContactList";
import CreateContact from "./pages/CreateContact";
import EditContact from "./pages/EditContact";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/contacts" element={<ContactList />} />
      <Route path="/contacts/create" element={<CreateContact />} />
      <Route path="/contacts/edit/:id" element={<EditContact />} />
    </Routes>
  );
}

export default App;
