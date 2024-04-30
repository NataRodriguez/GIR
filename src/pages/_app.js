// src/pages/_app.js o pages/_app.js si no estás usando la carpeta src
import React from 'react';
import Head from 'next/head';
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { AuthProvider } from '../context/AuthContext'; // Ajusta la ruta según sea necesario
import '../styles/globals.css'; // Ajusta la ruta según sea necesario
config.autoAddCss = false

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>GIR</title>
        <meta name="description" content="GIR" />
      </Head>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </>
  );
}