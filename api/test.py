import json
import sys
import os

def handler(event, context):
    print("TEST HANDLER CALLED", flush=True)
    
    response = {
        'statusCode': 200,
        'headers': {'Content-Type': 'application/json'},
        'body': json.dumps({
            'message': 'Test handler working!',
            'python_version': sys.version.split()[0]
        })
    }
    
    return response
