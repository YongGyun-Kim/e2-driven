import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import { HttpApi, HttpMethod } from "aws-cdk-lib/aws-apigatewayv2";
import { HttpUrlIntegration, HttpLambdaIntegration } from "aws-cdk-lib/aws-apigatewayv2-integrations";

import { LambdaConstruct, LambdaConstructProps } from "./lambda-construct";

export class E2DrivenStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const lambdaProps: LambdaConstructProps = {};
    const lambdaFunctions = new LambdaConstruct(this, "E2DrivenLambda", lambdaProps);

    const httpApi = new HttpApi(this, "E2DrivenHttpApi", {
      apiName: "e2-driven-api",
      description: "HTTP API for e2-driven",
    });

    const createEventIntegration = new HttpLambdaIntegration("CreateIntegration", lambdaFunctions.createEventFunction);
    const updateEventIntegration = new HttpLambdaIntegration("UpdateIntegration", lambdaFunctions.updateEventFunction);
    const deleteEventIntegration = new HttpLambdaIntegration("DeleteIntegration", lambdaFunctions.deleteEventFunction);
    const participateEventIntegration = new HttpLambdaIntegration("ParticipateIntegration", lambdaFunctions.participateEventFunction);
    const listEventIntegration = new HttpLambdaIntegration("ListIntegration", lambdaFunctions.listEventFunction);
    const detailEventIntegration = new HttpLambdaIntegration("DetailIntegration", lambdaFunctions.detailEventFunction);

    httpApi.addRoutes({
      path: "/events",
      methods: [HttpMethod.POST],
      integration: createEventIntegration,
    });

    httpApi.addRoutes({
      path: "/events",
      methods: [HttpMethod.PUT],
      integration: updateEventIntegration,
    });

    httpApi.addRoutes({
      path: "/events",
      methods: [HttpMethod.DELETE],
      integration: deleteEventIntegration,
    });

    // todo: CF 연결
    httpApi.addRoutes({
      path: "/events",
      methods: [HttpMethod.GET],
      integration: listEventIntegration,
    });
    // todo: CF 연결
    httpApi.addRoutes({
      path: "/events{eventId}",
      methods: [HttpMethod.GET],
      integration: detailEventIntegration,
    });

    httpApi.addRoutes({
      path: "/events/{eventId}/participants",
      methods: [HttpMethod.POST],
      integration: participateEventIntegration,
    });
  }
}
