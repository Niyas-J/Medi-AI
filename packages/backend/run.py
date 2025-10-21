import os
from app import create_app

app = create_app()

if __name__ == '__main__':
    # Get port from environment variable (Railway/Heroku) or default to 5000
    port = int(os.environ.get('PORT', 5000))
    # Get debug mode from environment variable
    debug = os.environ.get('FLASK_DEBUG', 'False').lower() == 'true'
    # Bind to 0.0.0.0 to accept external connections
    app.run(host='0.0.0.0', port=port, debug=debug)
