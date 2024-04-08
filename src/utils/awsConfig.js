// Importa AWS SDK
const AWS = require('aws-sdk');

// Configura las credenciales y la región
AWS.config.update({
    region: process.env.AWS_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  });

// Exporta DynamoDB
const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports = dynamoDb;
