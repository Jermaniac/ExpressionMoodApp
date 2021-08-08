#!/usr/bin/env python
# coding: utf-

# ### Imports de Keras: incluye definiciones de modelo a partir de json, optimizadores de la CNN, funciones para pasar a hot encoding y funciones para que funcione la CNN.
from keras.models import model_from_json
from keras.optimizers import *



# ### Import para utilizar numpy arrays.
import numpy as np


# ### Imports de Bottle para que funcionen las peticiones POST al servidor.


from bottle import Bottle,route, run, request,response


# ### Imports de PIL para abrir la foto y poder manipularla.


from PIL import Image


# ### Imports para que funcionen los archivos temporales.

import tempfile


# ### VARIABLES GLOBALES


expressions = ('angry', 'disgust', 'fear', 'happy', 'sad', 'surprise', 'neutral')


# Direccion ip en donde se realizan las peticiones



ip = '0.0.0.0'


# # PROGRAMA PRINCIPAL

# Este programa funciona usando una red neuronal convolucional para realizar las predicciones.
# El programa es controlado mediante unas variables para indicar si se desea realizar algunas acciones que no son obligatorias para el funcionamiento del programa, pero que ayudan a entender mejor el funcionamiento.
# Es por ello, que aunque el programa funcione con una CNN, se ha incorporado también RandomForest con fines de aprendizaje. De esta forma, se ha podido comprobar qué método es mejor para clasificar imágenes.
# Las imágenes que llegan como peticion del cliente se han adecuado para que las pueda interpretar la CNN.


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

# el modelo ya existe y no hace falta entrenar la NN, por lo que cargamos el json
json_file = open('expresionsjson.json', 'r')
loaded_model_json = json_file.read()
json_file.close()
model = model_from_json(loaded_model_json)
# cargamos el archivo h5
model.load_weights("expressionsh5.h5")   
# compilamos el modelo para poder usarlo
adamOpt = Adam(learning_rate=0.001)
model.compile(loss='categorical_crossentropy', metrics=['accuracy'],optimizer=adamOpt)
print("El modelo ha sido cargado.")


# ### Peticion POST del lado del servidor.



app = Bottle()
@app.hook('after_request')
def enable_cors():
    response.headers['Access-Control-Allow-Origin'] = '*'

@app.route("/getMood", method="POST")
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


run(app,host=ip, port=9004)

