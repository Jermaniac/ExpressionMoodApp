from tensorflow.keras.models import load_model

# ### Import para utilizar numpy arrays.
import numpy as np

# ### Imports de Flask para que funcionen las peticiones POST al servidor y habilitar CORS

from flask import Flask, request
from flask_cors import CORS

# ### Imports de PIL para abrir la foto y poder manipularla.

from PIL import Image

# ### Imports para que funcionen los archivos temporales.

import tempfile

# ### VARIABLES GLOBALES

expressions = ('angry', 'disgust', 'fear', 'happy', 'sad', 'surprise', 'neutral')

# Direccion ip en donde se realizan las peticiones (0.0.0.0) para que funcione en la nube

ip = '0.0.0.0'

# # PROGRAMA PRINCIPAL

# ### Función que prepara la foto recibida para que la CNN pueda interpretarla.

def prepare_photo(imagen):
    # convertimos la foto a gris y a tamaño 48x48
    img = imagen.convert('L').resize((48,48))
    # devolvemos un array con los pixeles de la foto con las dimensiones adecuadas
    x = np.array(img).reshape(1,48,48,1)
    x = x / 255
    return x

# ### Función para realizar la predicción correspondiente.

def do_prediction(ImArray):
    porcentajes = model.predict(ImArray).tolist()
    #retornamos los datos de la prediccion en formato json
    return prepare_json(porcentajes)

# ### Función que prepara los resultados para devolver un json al cliente.

def prepare_json(porcentajes):
    jsons = {"expressions":[]}
    # recorremos los probabilidades de cada expresion
    a=porcentajes[0]
    for i in range(0,len(a)):
        # establecemos como maximo 3 decimales
        a[i] = round(a[i],3)
        jsons["expressions"].append({"mood":expressions[i],"probability":a[i]})
    # devolvemos un json con todas las probabilidades
    return jsons

# # PROGRAMA

# cargamos el archivo h5
model = load_model("expressionsh5MODELtestX.h5")
# compilamos el modelo para poder usarlo
# model.compile(loss='categorical_crossentropy', metrics=['accuracy'])
print("El modelo ha sido cargado.")


# ### Peticion POST del lado del servidor.

app = Flask(__name__)
CORS(app)

@app.route("/getMood", methods=["POST"])
def do_upload():

    foto = request.files["photo"]
    # usamos un archivo temporal para poder manipular la foto
    temporal = tempfile.TemporaryFile()
    foto.save(temporal)
    # es necesario que la foto tenga unas caracteristicas antes de ser mandada a la CNN, por ello primero se prepara
    imagen_lista = prepare_photo(Image.open(temporal))
    # realizamos la prediccion de la foto lista para poder ser interpretada por la CNN
    resultado = do_prediction(imagen_lista)
    # cerramos el archivo temporal
    temporal.close()
    print(resultado)
    return resultado

# ### Ejecutamos el servidor para que se puedan realizar peticiones.

if __name__ == "__main__":
    app.run(host=ip, port=9004)
