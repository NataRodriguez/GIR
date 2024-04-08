// pages/api/register.js
import dynamoDb from '../../utils/awsConfig'; // Asegúrate de tener esta configuración.
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método no permitido' });
  }

  const { email, password, nombre } = req.body;

  // Verifica si ya existe un usuario con el mismo correo electrónico
  const paramsQuery = {
    TableName: 'Usuarios',
    IndexName: 'EmailIndex', // El nombre de tu GSI que tiene 'email' como clave de partición
    KeyConditionExpression: 'email = :email', // Usando 'email' para buscar
    ExpressionAttributeValues: {
      ':email': email,
    },
  };

  try {
    const { Items } = await dynamoDb.query(paramsQuery).promise();
    if (Items.length > 0) {
      // Usuario ya registrado
      return res.status(409).json({ message: 'El usuario ya está registrado' });
    }

     // Encripta la contraseña
     const saltRounds = 10; // Coste del algoritmo de hashing
     const hashedPassword = await bcrypt.hash(password, saltRounds);
 
     // Genera un ID único para el usuario
     const usuarioId = uuidv4();
    // Aquí deberías encriptar la contraseña antes de guardarla
    const paramsPut = {
      TableName: 'Usuarios',
      Item: {
        usuarioId,
        email,
        nombre,
        password: hashedPassword,
      },
    };

    await dynamoDb.put(paramsPut).promise();
    res.status(201).json({ message: 'Usuario registrado con éxito' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al registrar el usuario' });
  }
}