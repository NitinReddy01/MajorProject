import pickle
import warnings
import sys
import numpy as np
import ast
warnings.filterwarnings('ignore', message='Trying to unpickle estimator')
warnings.filterwarnings('ignore', message='X does not have')

with open('./src/ML_Model/rf_model.pkl', 'rb') as f:
    rf_model = pickle.load(f)

with open('./src/ML_Model/gb_model.pkl', 'rb') as f:
    gb_model = pickle.load(f)

with open('./src/ML_Model/meta_model.pkl', 'rb') as f:
    meta_model = pickle.load(f)

x_test = sys.argv[1]
x_test = ast.literal_eval(x_test)
x_test = np.array(x_test)
x_test = x_test.reshape(1,-1)

rf_predictions = rf_model.predict(x_test)
gb_predictions = gb_model.predict(x_test)
meta_train = [rf_predictions, gb_predictions]
meta_train = np.array(meta_train).T
print(meta_model.predict(meta_train)[0])

