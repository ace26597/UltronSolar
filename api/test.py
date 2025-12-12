"""Simple test handler to verify Vercel Python functions work."""
import json
import sys
import os
import traceback

# Vercel Python functions receive an event object
def handler(event, context=None):
    """Simple test handler for Vercel."""
    try:
        # Log to stdout (Vercel captures this)
        print("=" * 60, flush=True)
        print("=== TEST HANDLER CALLED ===", flush=True)
        print(f"Event type: {type(event)}", flush=True)
        
        if isinstance(event, dict):
            http_method = event.get('httpMethod') or event.get('method') or 'GET'
            path = event.get('path') or event.get('url', '/')
            headers = event.get('headers', {})
            print(f"HTTP Method: {http_method}", flush=True)
            print(f"Path: {path}", flush=True)
            print(f"Headers keys: {list(headers.keys()) if isinstance(headers, dict) else 'not a dict'}", flush=True)
        else:
            print(f"Event (str): {str(event)[:200]}", flush=True)
        
        print("=" * 60, flush=True)
        
        response_data = {
            'message': 'Test handler is working!',
            'python_version': sys.version.split()[0],  # Just version number
            'event_type': str(type(event).__name__),
            'event_keys': list(event.keys()) if isinstance(event, dict) else 'not a dict',
            'environment': {
                'OPENAI_API_KEY_set': bool(os.getenv('OPENAI_API_KEY')),
                'cwd': os.getcwd(),
            }
        }
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
            },
            'body': json.dumps(response_data, indent=2)
        }
    except Exception as e:
        print(f"ERROR in handler: {str(e)}", flush=True)
        print(traceback.format_exc(), flush=True)
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
            },
            'body': json.dumps({
                'error': str(e),
                'traceback': traceback.format_exc()
            })
        }
