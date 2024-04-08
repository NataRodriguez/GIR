import { Inter } from "next/font/google";
// La importación de los estilos globales se mantiene en _app.js
// Importar aquí solo si es estrictamente necesario y no está ya en _app.js

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  // Aplica la clase de la fuente directamente al componente contenedor
  return (
    <div className={inter.className}>
      {children}
    </div>
  );
}
