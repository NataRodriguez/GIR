import { DynamoDB } from 'aws-sdk';

// Función para obtener el historial de reservas por usuario
export const obtenerReservasPorUsuario = async (usuarioId) => {
  try {
    // Configura el cliente de DynamoDB
    const dynamoDBClient = new DynamoDB.DocumentClient();

    // Define los parámetros de la consulta
    const params = {
      TableName: 'Reservas',
      FilterExpression: '#userId = :id', // Usando ExpressionAttributeNames
      ExpressionAttributeNames: {
        '#userId': 'usuarioId', // Remapeo de nombre de atributo
      },
      ExpressionAttributeValues: {
        ':id': usuarioId,
      },
    };

    // Realiza la consulta a DynamoDB
    const data = await dynamoDBClient.scan(params).promise();

    // Devuelve los datos de las reservas
    return data.Items;
  } catch (error) {
    console.error('Error al obtener el historial de reservas:', error);
    throw error;
  }
};
