import * as AWS from "@aws-sdk/client-evidently";

const client = new AWS.Evidently({
  endpoint: "https://evidently.us-east-1.amazonaws.com",
  region: 'us-east-1',
  credentials:  {
    accessKeyId: "",
    secretAccessKey: "+"
  }
});

//Método para consultar la variación y asociarla al userId
export const getEvidentlyBanner = async (user_id) => {
  const evaluateFeatureRequest = {
    entityId: user_id,
    // Nombre del 'Feature'
    feature: 'profiler-banner-feature',
    // Nombre del proyecto
    project: 'profiler-test',
  };
  const response = await client.evaluateFeature(evaluateFeatureRequest);
  console.log(response);
  return response.value?.stringValue.toString();
};

//Método con el que registraremos nuestra métrica asociandola al userId
export const sendClickEvidentlyMetric = async (user_id) => {
  // Datos donde asociaremos la métrica del bannerClicked y el userId
  const data = `{
    "details": {
      "bannerClicked": 1
    },
    "userDetails": { "userId": "${user_id}"}
  }`;

  //Construimos el objeto que  llamará al método de putProjectEvents de CloudWatch Evidently, y que será quien registre la métrica
  const putProjectEventsRequest = {
    project: 'profiler-test',
    events: [
      {
        timestamp: new Date(),
        type: 'aws.evidently.custom',
        data: JSON.parse(data)
      },
    ],
  };
  //llamado a Evidently para registrar la métrica y el valor
  const response = await client.putProjectEvents(putProjectEventsRequest);
  console.log(response);
  return response;
};
