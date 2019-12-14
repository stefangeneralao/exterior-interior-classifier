from flask import Flask, request
from model import Model
from file_utils import download_file, delete_file
import json
import os

if not os.path.exists('uploads'):
  os.mkdir('uploads')

model = Model()
model.load('grayscale-1197')

app = Flask(__name__)

@app.route('/<path>')
def predict(path):
  print('Got prediction request.')
  remote_addr = request.remote_addr
  filename = download_file('http://' + remote_addr + ':3001/public/' + path)
  prediction = model.predict_by_path('uploads/' + filename)
  prediction['exterior'] = prediction['exterior'].item()
  prediction['interior'] = prediction['interior'].item()
  prediction = json.dumps(prediction)
  delete_file('uploads/' + filename)
  print('Sending prediction response.')
  return prediction, 200

@app.route('/')
def root():
  return 'hello'

if __name__ == '__main__':
  # app.debug = True
  app.run(host='0.0.0.0', port=3002)
