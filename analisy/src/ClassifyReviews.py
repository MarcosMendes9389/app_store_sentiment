import mongo
import pickle
from sklearn.feature_extraction.text import CountVectorizer
from sklearn import model_selection

def run():
   count = mongo.countReviewsPendingClassification()
   if count > 0:
      print('\nReading Model ...') 
      logisticRegressionModel, vectorizer, lrAccuracy = pickle.load(open('../classification_model/Logistic_Regression_model.sav', 'rb'))
      multinomialNBModel, vectorizer, nbAccuracy = pickle.load(open('../classification_model/Multinomial_NB_model.sav', 'rb'))
      sgdClassifierModel, vectorizer, sgdAccuracy = pickle.load(open('../classification_model/SGD_model.sav', 'rb'))

      totalAccuracy = lrAccuracy + nbAccuracy + sgdAccuracy

      print('\nClassifying ' + str(count) + ' Reviews ...') 
      for review in mongo.getReviewsPendingClassification():

         posPercent = 0
         negPercent = 0

         if logisticRegressionModel.predict(vectorizer.transform([review.get('text')])) == 'pos':
            posPercent = posPercent + lrAccuracy/totalAccuracy
         else:
            negPercent = negPercent + lrAccuracy/totalAccuracy

         if multinomialNBModel.predict(vectorizer.transform([review.get('text')])) == 'pos':
            posPercent = posPercent + nbAccuracy/totalAccuracy
         else:
            negPercent = negPercent + nbAccuracy/totalAccuracy

         if sgdClassifierModel.predict(vectorizer.transform([review.get('text')])) == 'pos':
            posPercent = posPercent + sgdAccuracy/totalAccuracy
         else:
            negPercent = negPercent + sgdAccuracy/totalAccuracy
         
         #Saving committe prediction
         if posPercent >= negPercent:
            mongo.updateReviewsClassifications(review, 'Positivo')
         else:
            mongo.updateReviewsClassifications(review, 'Negativo')

   else:
      print('\nNo Reviews Pending Classification')

if __name__ == '__main__':
   run()