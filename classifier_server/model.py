import numpy as np
from keras import Sequential
from keras.layers import (
  Convolution2D,
  MaxPooling2D,
  Flatten,
  Dense,
  ELU,
  Dropout
)
from keras.preprocessing import image

class Model(Sequential):
  def __init__(self):
    super().__init__()
    self.__init_model()

  def __init_model(self):
    self.add(Convolution2D(
      filters=64,
      kernel_size=(5, 5),
      input_shape=(128, 128, 1)
    ))
    self.add(ELU())
    self.add(MaxPooling2D(pool_size=(2, 2)))

    self.add(Convolution2D(filters=32, kernel_size=(5, 5)))
    self.add(ELU())
    self.add(MaxPooling2D(pool_size=(2, 2)))

    self.add(Flatten())

    self.add(Dense(units=32))
    self.add(ELU())
    self.add(Dropout(0.2))

    self.add(Dense(units=16))
    self.add(ELU())
    self.add(Dense(units=2, activation='softmax'))

    self.compile(
      optimizer='sgd',
      loss='categorical_crossentropy',
      metrics=['categorical_accuracy']
    )

  def load(self, model_id):
    weights_filename = './weights-{}.h5'.format(model_id)
    self.load_weights(weights_filename)
    self._make_predict_function()

  def predict_by_path(self, path):
    test_image = self.image_path_to_matrix(path)
    test_image = self.rgb_to_grayscale(test_image)
    result = self.predict(test_image)
    result = result[0]
    return {
      'exterior': result[0],
      'interior': result[1]
    }

  @staticmethod
  def image_path_to_matrix(image_path):
    test_image = image.load_img(
      image_path,
      target_size=(128, 128)
    )
    test_image = image.img_to_array(test_image)
    test_image /= 255
    test_image = np.expand_dims(
      test_image,
      axis=0
    )
    return test_image

  @staticmethod
  def rgb_to_grayscale(arr):
    arr = np.dot(arr[...,:3], [0.299, 0.587, 0.114])
    arr = arr.reshape(128, 128, 1)
    arr = np.expand_dims(arr, axis=0)
    return arr