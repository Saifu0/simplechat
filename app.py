from flask import Flask
from flask_socketio import SocketIO, send

app = Flask(__name__)
app.config['SECRET_KEY'] = 'supersecretkey'

socketio = SocketIO(app, cors_allowed_origins='*')

app.debug = True
app.host = 'localhost'

@socketio.on("message")
def handleMessage(msg):
    print(msg)
    send(msg, broadcast=True)
    return None

if __name__ == '__main__':
    socketio.run(app)