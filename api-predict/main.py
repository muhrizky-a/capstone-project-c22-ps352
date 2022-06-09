import os
import json

import tensorflow as tf
from flask import Flask, request
from keras.models import load_model
import numpy as np
from google.cloud import storage
from decouple import config

app = Flask(__name__)

#Setup env
config('GOOGLE_APPLICATION_CREDENTIALS')
BUCKET_NAME = config('BUCKET_NAME')

def get_classes():
    storage_client = storage.Client()

    bucket = storage_client.bucket(BUCKET_NAME)
    blob = bucket.blob('classes.txt')
    contents = blob.download_as_string()
    contents = contents.decode('utf8')
    data = json.loads(contents)
    
    return data

@app.route("/predict", methods=['POST'])
def predict():
    # Request form data (File)
    file = request.files['file']

    if file:
        # Convert to List
        image = './tmp/' + file.filename
        file.save(image)

        img_height = 180
        img_width = 180
        class_names = get_classes()['classes']

        img = tf.keras.utils.load_img(image, target_size=(img_height, img_width))
        img_array = tf.keras.utils.img_to_array(img)
        img_array = tf.expand_dims(img_array, 0) # Create a batch
        os.remove(image)
        
        model = load_model('./saved_model')
        predictions = model.predict(img_array)
        score = tf.nn.softmax(predictions[0])

        return json.dumps(
            {
                "status": "success",
                "food": class_names [ np.argmax(score) ],
                "percentage": 100 * np.max(score)
            })
    return json.dumps(
        {
            "status": "error",
            "message": "Please add the image"
        })

# APP Run
if __name__ == "__main__":
    app.run(host='0.0.0.0', port=8080, debug=True)
