import { NodejsFunction, NodejsFunctionProps } from "aws-cdk-lib/aws-lambda-nodejs";
import { Construct } from "constructs";

interface LambdaConstructProps {}

class LambdaConstruct extends Construct {
  readonly functionList: NodejsFunction[] = [];

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
