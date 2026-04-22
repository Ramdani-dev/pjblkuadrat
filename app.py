from flask import Flask, send_from_directory
import os

app = Flask(__name__, static_folder='.', static_url_path='/')

@app.route('/')
def home():
    return send_from_directory('.', 'index.html')

@app.route('/kamera')
def camera_mode():
    return send_from_directory('mode_cam', 'index.html')

@app.route('/suit')
def normal_mode():
    return send_from_directory('mode_biasa', 'index.html')

@app.route('/kamera-ai')
def camera_ai_mode():
    return send_from_directory('mode_ai/ai_cam', 'index.html')

@app.route('/suit-ai')
def normal_ai_mode():
    return send_from_directory('mode_ai/ai_biasa', 'index.html')

if __name__ == '__main__':
    app.run(debug=True, port=3000)
