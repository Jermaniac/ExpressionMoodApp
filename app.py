from tensorflow.keras.models import load_model
import numpy as np
from flask import Flask, request
from flask_cors import CORS
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
        model = load_model("expressionsh5MODELtestX.h5")
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

@app.route("/getMood", methods=["POST"])
def do_upload():
    foto = request.files["photo"]
    with tempfile.TemporaryFile() as temp:
        foto.save(temp)
        temp.seek(0)  # Reset file pointer to the beginning
        imagen_lista = prepare_photo(Image.open(temp))
    resultado = do_prediction(imagen_lista)
    print(resultado)
    return resultado

if __name__ == "__main__":
    app.run(host=ip, port=9004)
