"""Vercel serverless function handler for test endpoint."""
import json
import sys

def handler(request):
    """
    Vercel Python serverless function handler.
    
    Args:
        request: Vercel request object
        
    Returns:
        dict with statusCode, headers, and body
    """
    print("TEST HANDLER CALLED", flush=True)
    print(f"Request method: {getattr(request, 'method', 'unknown')}", flush=True)
    print(f"Request path: {getattr(request, 'path', 'unknown')}", flush=True)
    
    response = {
        'statusCode': 200,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'body': json.dumps({
            'message': 'Test handler working!',
            'python_version': sys.version.split()[0],
            'status': 'success'
        })
    }
    
    return response
