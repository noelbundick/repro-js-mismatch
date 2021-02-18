import { DefaultAzureCredential } from "@azure/identity";
import { ServiceClientCredentials, WebResource } from "@azure/ms-rest-js";

import { ResourceManagementClient } from "@azure/arm-resources";
import { ResourceGraphClient } from "@azure/arm-resourcegraph";

class AzureIdentityCredentials implements ServiceClientCredentials {
  identity = new DefaultAzureCredential();

  public async signRequest(webResource: WebResource): Promise<WebResource> {
    const accessToken = await this.identity.getToken(
      "https://management.azure.com/"
    );
    webResource.headers.set("Authorization", `Bearer ${accessToken?.token}`);
    return webResource;
  }
}

const subscriptionId = "00000000-0000-0000-0000-000000000000";

const creds = new AzureIdentityCredentials();

const client = new ResourceGraphClient(creds);
const resources = new ResourceManagementClient(creds, subscriptionId);
