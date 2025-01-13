import { APIGatewayProxyHandler, APIGatewayProxyEvent } from "aws-lambda";
import { uuidv7 } from "uuidv7";

interface EventPayload {
  name: string;
  startDate: string;
  endDate: string;
  description: string;
}

const validatePayload = (event: EventPayload): boolean => {
  return !event.name || !event.startDate || !event.endDate || !event.description;
};

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent) => {
  if (!event.body) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "event body is missing" }),
    };
  }

  const payloads = JSON.parse(event.body);

  if (validatePayload(payloads)) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "payloads is invalid" }),
    };
  }

  try {
    const eventId = uuidv7();
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "success" }),
    };
  } catch (e) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "faild" }),
    };
  }
};
