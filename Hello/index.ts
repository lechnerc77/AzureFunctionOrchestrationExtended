import { AzureFunction, Context } from "@azure/functions"
import * as df from "durable-functions"

const activityFunction: AzureFunction = async function (context: Context): Promise<string> {
    const client = df.getClient(context);
    const entityId = new df.EntityId("DurableEntity", "eternalMemory");

    let entityState = await client.readEntityState(entityId);
    
    await client.signalEntity(entityId, "add", 1);
    
    return `Hello ${context.bindings.name}! This is execution ${entityState.entityState} of function ${context.executionContext.functionName}`;
};

export default activityFunction;
