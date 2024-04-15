import dynamoDb from '../../utils/awsConfig';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { especialidad, comuna, servicio } = req.body;
    const params = {
      TableName: "Profesionales",
      // Asume que tienes un GSI configurado correctamente para estas consultas
      IndexName: "EspecialidadComunaIndex",
      KeyConditionExpression: "especialidad = :especialidad and comuna = :comuna",
      FilterExpression: "contains(servicios, :servicio)",
      ExpressionAttributeValues: {
        ":especialidad": especialidad,
        ":comuna": comuna,
        ":servicio": servicio
      }
    };

    try {
      const data = await dynamoDb.query(params).promise();
      res.status(200).json(data.Items);
    } catch (error) {
      console.error("Error fetching professionals:", error);
      res.status(500).json({ error: "Error fetching professionals" });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}