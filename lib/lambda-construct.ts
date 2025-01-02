import * as path from "path";

import { Runtime } from "aws-cdk-lib/aws-lambda";
import { NodejsFunction, NodejsFunctionProps } from "aws-cdk-lib/aws-lambda-nodejs";
import { Construct } from "constructs";

interface LambdaConstructProps {}

class LambdaConstruct extends Construct {
  readonly functionList: NodejsFunction[] = [];

  public readonly createEventFunction: NodejsFunction;
  public readonly updateEventFunction: NodejsFunction;
  public readonly deleteEventFunction: NodejsFunction;

  public readonly listEventFunction: NodejsFunction;
  public readonly detailEventFunction: NodejsFunction;
  public readonly participateEventFunction: NodejsFunction;

  constructor(scope: Construct, id: string, props?: LambdaConstructProps) {
    super(scope, id);

    const defaultProps: NodejsFunctionProps = {
      runtime: Runtime.NODEJS_22_X,
      bundling: {
        minify: true,
        externalModules: ["aws-sdk/*"],
      },
    };

    this.createEventFunction = this.createFunction("createEvent", {
      entry: path.join(__dirname, "../lambda/event-management/create.ts"),
      ...defaultProps,
    });

    this.updateEventFunction = this.createFunction("updateEvent", {
      entry: path.join(__dirname, "../lambda/event-management/update.ts"),
      ...defaultProps,
    });

    this.deleteEventFunction = this.createFunction("deleteEvent", {
      entry: path.join(__dirname, "../lambda/event-management/delete.ts"),
      ...defaultProps,
    });

    this.listEventFunction = this.createFunction("listEvent", {
      entry: path.join(__dirname, "../lambda/event-query/list.ts"),
      ...defaultProps,
    });

    this.detailEventFunction = this.createFunction("detailEvent", {
      entry: path.join(__dirname, "../lambda/event-query/detail.ts"),
      ...defaultProps,
    });

    this.participateEventFunction = this.createFunction("participateEvent", {
      entry: path.join(__dirname, "../lambda/event-participation/participate.ts"),
      ...defaultProps,
    });
  }

  private createFunction(id: string, props: NodejsFunctionProps) {
    const fn = new NodejsFunction(this, id, {
      functionName: `e2-driven-${id}`,
      ...props,
    });
    this.functionList.push(fn);
    return fn;
  }
}

export { LambdaConstruct, LambdaConstructProps };
