from __future__ import print_function
import pandas
import os.path
import urllib.request
from sklearn import model_selection
from sklearn.metrics import accuracy_score, confusion_matrix, classification_report
from sklearn.naive_bayes import MultinomialNB
from sklearn.linear_model import LogisticRegression, SGDClassifier 

from sklearn.feature_extraction.text import CountVectorizer
import pickle


def run():
   dataset = load_data_set()

   print(dataset.shape)
   print(dataset.head(20))
   print(dataset.describe())
   print(dataset.groupby('sentiment').size())


   text = dataset['text_pt'].values
   sentiment = dataset['sentiment'].values

   validation_size = 0.10
   seed = 7

   print('\nSplitting training and validation ...')
   text_train, text_validation, sentiment_train, sentiment_validation = model_selection.train_test_split(text, sentiment, test_size=validation_size, random_state=seed)

   print('\nVectorizing the dataset ...') 
   vectorizer = CountVectorizer(analyzer='word')
   text_train_vectorized = vectorizer.fit_transform(text_train)

   print('\nRunning Logistic Regression ...')
   logisticRegressionModel = LogisticRegression( solver='liblinear' )
   logisticRegressionModel.fit(text_train_vectorized, sentiment_train)
   prediction = logisticRegressionModel.predict(vectorizer.transform(text_validation))
   lrAccuracy = accuracy_score(sentiment_validation, prediction)
   print('\nResult Logistic Regression')
   print('Accuracy: %f' % lrAccuracy)
   print(confusion_matrix(sentiment_validation, prediction))
   print(classification_report(sentiment_validation, prediction))
   save_model(logisticRegressionModel, vectorizer, lrAccuracy, 'Logistic_Regression')
   
   print('\nRunning Multinomial NB ...')
   multinomialNBModel = MultinomialNB()
   multinomialNBModel.fit(text_train_vectorized, sentiment_train)
   prediction = multinomialNBModel.predict(vectorizer.transform(text_validation))
   nbAccuracy = accuracy_score(sentiment_validation, prediction)
   print('\nResult Multinomial NB')
   print('Accuracy: %f' % nbAccuracy)
   print(confusion_matrix(sentiment_validation, prediction))
   print(classification_report(sentiment_validation, prediction))
   save_model(multinomialNBModel, vectorizer, nbAccuracy, 'Multinomial_NB')    

   print('\nRunning SGD ...')
   sgdClassifierModel = SGDClassifier()
   sgdClassifierModel.fit(text_train_vectorized, sentiment_train)
   prediction = sgdClassifierModel.predict(vectorizer.transform(text_validation))
   sgdAccuracy = accuracy_score(sentiment_validation, prediction)
   print('\nResult SGD')
   print('Accuracy: %f' % sgdAccuracy)
   print(confusion_matrix(sentiment_validation, prediction))
   print(classification_report(sentiment_validation, prediction))
   save_model(sgdClassifierModel, vectorizer, sgdAccuracy, 'SGD')    

   totalAccuracy = lrAccuracy + nbAccuracy + sgdAccuracy
   predictionCommittee = []


   print('\nRunning Committee ...')

   for i in range(len(text_validation)):
      
      posPercent = 0
      negPercent = 0

      if logisticRegressionModel.predict(vectorizer.transform([text_validation[i]])) == 'pos':
         posPercent = posPercent + lrAccuracy/totalAccuracy
      else:
         negPercent = negPercent + lrAccuracy/totalAccuracy

      if multinomialNBModel.predict(vectorizer.transform([text_validation[i]])) == 'pos':
         posPercent = posPercent + nbAccuracy/totalAccuracy
      else:
         negPercent = negPercent + nbAccuracy/totalAccuracy

      if sgdClassifierModel.predict(vectorizer.transform([text_validation[i]])) == 'pos':
         posPercent = posPercent + sgdAccuracy/totalAccuracy
      else:
         negPercent = negPercent + sgdAccuracy/totalAccuracy

      if posPercent >= negPercent:
         predictionCommittee = predictionCommittee + ['pos']
      else:
         predictionCommittee = predictionCommittee + ['neg']  	 


   accuracy = accuracy_score(sentiment_validation, predictionCommittee)
   print('\nResult Committee')
   print('Accuracy: %f' % accuracy)
   print(confusion_matrix(sentiment_validation, predictionCommittee))
   print(classification_report(sentiment_validation, predictionCommittee))


def load_data_set():
   
   if not os.path.exists('../data/imdb-reviews-pt-br.csv'):
      downloadDataset()
   
   url = '../data/imdb-reviews-pt-br.csv'
   names = ['id', 'text_en', 'text_pt', 'sentiment']
   dataset = pandas.read_csv(url, names=names, header=0)
   return dataset

def downloadDataset():
   
   print('Downloading Dataset ...')
   dataset = urllib.request.urlopen('https://ucb1188cceb2adcc632726a825a0.dl.dropboxusercontent.com/cd/0/get/A4mpVvN8m7Lw_VR4ebQHk7y4ShvJRKlCtFaVt6lEogF8o5EV5ZC3Kl-r4t7OtnllkyrMTvvW1uGulmfjGSHMtzFKcpuBjdqLcBSx5snY7mzDMzipKzv3RjKMdhYhwuQNTss/file?dl=1#')
   with open('../data/imdb-reviews-pt-br.csv','wb') as output:
      output.write(dataset.read())

def save_model(algorithm, vectorizer, accuracy, model_name):
    # Saving model
    print('Saving model ' + model_name)
    pickle.dump((algorithm, vectorizer, accuracy), open('../classification_model/' + model_name +'_model.sav', 'wb'))
    print('Model saved (' + model_name +'_model.sav) in folder classification_model/')

if __name__ == '__main__':
   run()