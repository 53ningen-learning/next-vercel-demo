export type AmplifyDependentResourcesAttributes = {
    "auth": {
        "userPoolGroups": {
            "AdminGroupRole": "string"
        },
        "nextverceldemoccce7cf1ccce7cf1": {
            "IdentityPoolId": "string",
            "IdentityPoolName": "string",
            "HostedUIDomain": "string",
            "OAuthMetadata": "string",
            "UserPoolId": "string",
            "UserPoolArn": "string",
            "UserPoolName": "string",
            "AppClientIDWeb": "string",
            "AppClientID": "string"
        }
    },
    "api": {
        "nextverceldemo": {
            "GraphQLAPIIdOutput": "string",
            "GraphQLAPIEndpointOutput": "string"
        }
    },
    "function": {
        "DeployTrigger": {
            "Name": "string",
            "Arn": "string",
            "Region": "string",
            "LambdaExecutionRole": "string"
        },
        "GraphQLAPICaller": {
            "Name": "string",
            "Arn": "string",
            "Region": "string",
            "LambdaExecutionRole": "string",
            "CloudWatchEventRule": "string"
        }
    }
}