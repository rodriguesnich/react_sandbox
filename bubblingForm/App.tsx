import React, { useState } from "react";
import "./App.css"

function App() {
  const [formData, setFormData] = useState({ userName: "", userEmail: "" });

  function handleChangeForm(evt: React.ChangeEvent<HTMLFormElement>) {
    //@ts-ignore
    const target = evt.target as HTMLInputElement;
    
    if (target.name) {
      setFormData({ ...formData, [target.name]: target.value });
    }
  }

  console.log(formData);
  
  return (
    <form style={{ display: "flex", flexDirection: "column", gap: "1rem" }} onChange={handleChangeForm}>
      <input type="text" name="userName" placeholder="Name" />
      <input type="email" name="userEmail" placeholder="Email" />
    </form>
  );
}

export default App;