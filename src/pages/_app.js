// src/pages/_app.js o pages/_app.js si no estás usando la carpeta src

import '../styles/globals.css'; // Ajusta la ruta según sea necesario
import { AuthProvider } from '../context/AuthContext'; // Ajusta la ruta según sea necesario

function MyApp({ Component, pageProps }) {
  return     <AuthProvider>
  <Component {...pageProps} />
</AuthProvider>;
}

export default MyApp;
