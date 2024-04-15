// pages/api/especialidades.js
import dynamoDb from '../../utils/awsConfig';

export default async function handler(req, res) {
  const params = {
    TableName: 'Especialidades'
  };

  try {
    const { Items } = await dynamoDb.scan(params).promise();
    const especialidades = Items.map(item => ({
      especialidadId: item.especialidadId,
      nombre: item.nombre,
      servicios: Array.from(item.servicios.values) // Asegúrate de convertir Set a Array
    }));
    res.status(200).json({ especialidades });
  } catch (err) {
    console.error('DynamoDB error:', err);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
}
