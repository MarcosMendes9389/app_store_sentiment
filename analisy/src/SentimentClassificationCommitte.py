from __future__ import print_function
import pandas
from sklearn import model_selection
from sklearn.metrics import accuracy_score, confusion_matrix, classification_report
from sklearn.svm import SVC
from sklearn.naive_bayes import MultinomialNB
from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import RandomForestClassifier
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

   validation_size = 0.30
   seed = 7

   print('Splitting training and validation ...')
   text_train, text_validation, sentiment_train, sentiment_validation = model_selection.train_test_split(text, sentiment, test_size=validation_size, random_state=seed)

   print('Vectorizing the dataset ...') 
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
   save_model(logisticRegressionModel, 'Logistic_Regression')
   
   print('\nRunning Multinomial NB ...')
   multinomialNBModel = MultinomialNB()
   multinomialNBModel.fit(text_train_vectorized, sentiment_train)
   prediction = multinomialNBModel.predict(vectorizer.transform(text_validation))
   nbAccuracy = accuracy_score(sentiment_validation, prediction)
   print('\nResult Multinomial NB')
   print('Accuracy: %f' % nbAccuracy)
   print(confusion_matrix(sentiment_validation, prediction))
   print(classification_report(sentiment_validation, prediction))
   save_model(multinomialNBModel, 'Multinomial_NB')    

   print('\nRunning Random Forest ...')
   randomForestClassifierModel = RandomForestClassifier(max_depth=2, random_state=0)
   randomForestClassifierModel.fit(text_train_vectorized, sentiment_train)
   prediction = randomForestClassifierModel.predict(vectorizer.transform(text_validation))
   rfAccuracy = accuracy_score(sentiment_validation, prediction)
   print('\nResult Random Forest')
   print('Accuracy: %f' % rfAccuracy)
   print(confusion_matrix(sentiment_validation, prediction))
   print(classification_report(sentiment_validation, prediction))
   save_model(randomForestClassifierModel, 'Random_Forest')    

   totalAccuracy = rfAccuracy + lrAccuracy + nbAccuracy
   predictionCommitte = []


   print('\nRunning Committe ...')

   for i in range(len(text_validation)):
      logisticRegressionPrediction = logisticRegressionModel.predict(vectorizer.transform([text_validation[i]]))
      multinomialNBPrediction = multinomialNBModel.predict(vectorizer.transform([text_validation[i]]))
      randomForestClassifierPrediction = randomForestClassifierModel.predict(vectorizer.transform([text_validation[i]]))
      
      posPercent = 0
      negPercent = 0

      if logisticRegressionPrediction == 'pos':
         posPercent = posPercent + lrAccuracy/totalAccuracy
      else:
         negPercent = negPercent + lrAccuracy/totalAccuracy

      if multinomialNBPrediction == 'pos':
         posPercent = posPercent + nbAccuracy/totalAccuracy
      else:
         negPercent = negPercent + nbAccuracy/totalAccuracy

      if randomForestClassifierPrediction == 'pos':
         posPercent = posPercent + rfAccuracy/totalAccuracy
      else:
         negPercent = negPercent + rfAccuracy/totalAccuracy

      if posPercent >= negPercent:
         predictionCommitte = predictionCommitte + ['pos']
      else:
         predictionCommitte = predictionCommitte + ['neg']  	 


   accuracy = accuracy_score(sentiment_validation, predictionCommitte)
   print('\nResult Committe')
   print('Accuracy: %f' % accuracy)
   print(confusion_matrix(sentiment_validation, predictionCommitte))
   print(classification_report(sentiment_validation, predictionCommitte))


def load_data_set():
   url = '../data/imdb-reviews-pt-br.csv'
   #url = 'https://doc-0k-94-docs.googleusercontent.com/docs/securesc/h834jipfsv4sk0m8b3i8f7lubjkce2i0/bubhq16e424te0alr4b7h1asa56dts7a/1590243075000/09024457658019831713/09024457658019831713/1c9mevJHx-sAwAUT-qRwYXVfyBIDhITc6?e=download&authuser=0&nonce=0qbku6hdggags&user=09024457658019831713&hash=pjdvmpva0676u12sh3r6nkrl6obbv6gp'
   names = ['id', 'text_en', 'text_pt', 'sentiment']
   dataset = pandas.read_csv(url, names=names, header=0)
   return dataset

def save_model(algorithm, model_name):
    # Saving model
    print('Saving model ' + model_name)
    pickle.dump(algorithm, open('../classification_model/' + model_name +'_model.sav', 'wb'))
    print('Model saved (' + model_name +'_model.sav) in folder classification_model/')