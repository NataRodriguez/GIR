import dynamoDb from '../../../../utils/awsConfig';

export default async function handler(req, res) {
  // Extract profesionalId from the query and ensure it is converted to a number.
  const { profesionalId } = req.query;
  const numericProfesionalId = parseInt(profesionalId, 10); // Convert profesionalId from string to number

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const getParams = {
    TableName: 'Profesionales',
    Key: {
      'profesionalId': numericProfesionalId // Use the numeric ID here
    }
  };

  try {
    const { Item } = await dynamoDb.get(getParams).promise();
    if (!Item) {
      return res.status(404).json({ message: 'Profesional not found' });
    }
    res.status(200).json(Item);
  } catch (error) {
    console.error('DynamoDB error:', error);
    res.status(500).json({ message: 'Error retrieving professional', error: error.toString() });
  }
}
