from tensorflow.keras.models import load_model
import numpy as np
from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
from PIL import Image
import tempfile
import os

# Global Variables
expressions = ('angry', 'disgust', 'fear', 'happy', 'sad', 'surprise', 'neutral')
ip = '0.0.0.0'
model = None

def load_cnn_model():
    global model
    if model is None:
        model = load_model("expression_model.h5")
        print("Model loaded successfully.")
    return model

def prepare_photo(imagen):
    img = imagen.convert('L').resize((48,48))
    x = np.array(img, dtype=np.float32).reshape(1,48,48,1)
    x = x / 255.0
    return x

def do_prediction(ImArray):
    model = load_cnn_model()
    porcentajes = model.predict(ImArray).tolist()
    return prepare_json(porcentajes)

def prepare_json(porcentajes):
    jsons = {"expressions":[]}
    a = porcentajes[0]
    for i in range(len(a)):
        a[i] = round(a[i], 3)
        jsons["expressions"].append({"mood": expressions[i], "probability": a[i]})
    return jsons

app = Flask(__name__)
CORS(app)

limiter = Limiter(get_remote_address, app=app, default_limits=["10 per minute"])

@app.route("/getMood", methods=["POST"])
@limiter.limit("10 per minute")
def do_upload():
    foto = request.files.get("photo")
    if not foto:
        return jsonify({"error": "No photo uploaded"}), 400
    with tempfile.TemporaryFile() as temp:
        foto.save(temp)
        temp.seek(0)
        imagen_lista = prepare_photo(Image.open(temp))
    resultado = do_prediction(imagen_lista)
    print(resultado)
    return resultado

if __name__ == "__main__":
    app.run(host=ip, port=9004)