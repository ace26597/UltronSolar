"""Simple test handler to verify Vercel Python functions work."""
import json
import sys
import os

def handler(request):
    """Simple test handler."""
    print("=" * 60)
    print("=== TEST HANDLER CALLED ===")
    print(f"Request: {request}")
    print(f"Type: {type(request)}")
    if isinstance(request, dict):
        print(f"HTTP Method: {request.get('httpMethod', 'UNKNOWN')}")
        print(f"Path: {request.get('path', 'UNKNOWN')}")
        print(f"Headers: {request.get('headers', {})}")
    print("=" * 60)
    
    return {
        'statusCode': 200,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        },
        'body': json.dumps({
            'message': 'Test handler is working!',
            'python_version': sys.version,
            'request_type': str(type(request)),
            'request_keys': list(request.keys()) if isinstance(request, dict) else 'not a dict',
            'environment': {
                'OPENAI_API_KEY_set': bool(os.getenv('OPENAI_API_KEY')),
                'cwd': os.getcwd(),
            }
        })
    }

