
import React, { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { View } from "react-native";
import { auth } from "./src/database/firebaseConfig";
import Login from "./src/Components/Login";

import Home from "./src/Components/Home";
import Clientes from "./src/view/Clientes";
import Productos from "./src/view/Productos";
import Ciudades from "./src/view/Ciudades";
import Promedios from "./src/view/Promedios";
import Usuarios from "./src/view/Usuarios";
import ProductosRealtime from "./src/view/ProductosRealtime";
import IMC from "./src/view/IMC";
import CompartirDatos from "./src/view/CompartirDatos";



export default function App() {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    // Escucha los cambios en la autenticación (login/logout)
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUsuario(user);
    });
    return unsubscribe;
  }, []);

  const cerrarSesion = async () => {
    await signOut(auth);
  };

  if (!usuario) {
    // Si no hay usuario autenticado, mostrar login
    return <Login onLoginSuccess={() => setUsuario(auth.currentUser)} />;
  }

  // Si hay usuario autenticado, mostrar la navegación
  return (
    <View>
      <Productos cerrarSesion={cerrarSesion} />
    </View>
  );
}