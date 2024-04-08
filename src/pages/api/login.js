// pages/api/login.js
import dynamoDb from '../../utils/awsConfig';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método no permitido' });
  }

  const { email, password } = req.body;

  // Busca el usuario por su correo electrónico
  const paramsQuery = {
    TableName: 'Usuarios',
    IndexName: 'EmailIndex',
    KeyConditionExpression: 'email = :email',
    ExpressionAttributeValues: {
      ':email': email,
    },
  };

  try {
    const { Items } = await dynamoDb.query(paramsQuery).promise();

    if (Items.length === 0) {
      // El usuario no está registrado
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    const usuario = Items[0];
    // Comprueba si la contraseña proporcionada coincide con la almacenada
    const passwordMatch = await bcrypt.compare(password, usuario.password);

    if (!passwordMatch) {
      // Contraseña incorrecta
      return res.status(401).json({ message: 'Contraseña incorrecta' });
    }

    // Genera el token de sesión
    const token = jwt.sign(
      { userId: usuario.usuarioId, email: usuario.email }, // Payload del token
      process.env.JWT_SECRET, // Clave secreta para firmar el token
      { expiresIn: '2h' } // Opciones del token, como su tiempo de expiración
    );


    // Contraseña correcta, usuario autenticado exitosamente
    res.status(200).json({ message: 'Login exitoso', nombre: usuario.nombre, token  });
  } catch (error) {
    console.log('Error en el login:', error);
    res.status(500).json({ message: 'Error al procesar el login' });
  }
}
