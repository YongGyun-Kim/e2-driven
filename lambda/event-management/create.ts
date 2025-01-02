import { APIGatewayProxyHandler, APIGatewayProxyEvent } from "aws-lambda";

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent) => {
  console.log("event", event.body);
  return {
    statusCode: 200,
    body: JSON.stringify({ message: "success" }),
  };
};
