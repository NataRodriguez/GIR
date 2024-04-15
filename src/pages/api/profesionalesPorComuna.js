// pages/api/profesionalesPorComuna.js
import dynamoDb from '../../utils/awsConfig';

export default async function handler(req, res) {
  const { comuna, especialidad } = req.body;
  const params = {
    TableName: 'Profesionales',
    IndexName: 'ComunaEspecialidadIndex', // Asegúrate de que este índice está configurado correctamente
    KeyConditionExpression: 'comuna = :comuna and especialidad = :especialidad',
    ExpressionAttributeValues: {
      ':comuna': comuna,
      ':especialidad': especialidad
    }
  };

  try {
    const { Items } = await dynamoDb.query(params).promise();
    const servicios = new Set();
    Items.forEach(item => {
      if (item.servicios && item.servicios.values) {
        item.servicios.values.forEach(servicio => servicios.add(servicio)); // Asegúrate de acceder correctamente a los valores
      }
    });
    res.status(200).json({ servicios: Array.from(servicios) });
  } catch (err) {
    console.error('DynamoDB error:', err);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
}
