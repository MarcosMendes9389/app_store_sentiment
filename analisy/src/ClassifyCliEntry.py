import mongo
import pickle
from sklearn.feature_extraction.text import CountVectorizer
from sklearn import model_selection

def run():
   
   print('\nReading Model ...') 
   logisticRegressionModel, vectorizer, lrAccuracy = pickle.load(open('../classification_model/Logistic_Regression_model.sav', 'rb'))
   multinomialNBModel, vectorizer, nbAccuracy = pickle.load(open('../classification_model/Multinomial_NB_model.sav', 'rb'))
   sgdClassifierModel, vectorizer, sgdAccuracy = pickle.load(open('../classification_model/SGD_model.sav', 'rb'))

   totalAccuracy = lrAccuracy + nbAccuracy + sgdAccuracy

   print('\n################################\n')
   print('Enter with the statement: \n')
   entry = input()

   posPercent = 0
   negPercent = 0

   if logisticRegressionModel.predict(vectorizer.transform([entry])) == 'pos':
      posPercent = posPercent + lrAccuracy/totalAccuracy
   else:
      negPercent = negPercent + lrAccuracy/totalAccuracy

   if multinomialNBModel.predict(vectorizer.transform([entry])) == 'pos':
      posPercent = posPercent + nbAccuracy/totalAccuracy
   else:
      negPercent = negPercent + nbAccuracy/totalAccuracy

   if sgdClassifierModel.predict(vectorizer.transform([entry])) == 'pos':
      posPercent = posPercent + sgdAccuracy/totalAccuracy
   else:
      negPercent = negPercent + sgdAccuracy/totalAccuracy
   
   if posPercent >= negPercent:
      print('\nResult: Positivo\n')
   else:
      print('\nResult: Negativo\n')
  
if __name__ == '__main__':
   run()