import pickle
import pandas
import ClassifyReviews
import ClassifyCliEntry
import GenerateCommitteeModels
from sklearn.feature_extraction.text import CountVectorizer



def user_interaction():
   while True:
      print('##########################################################\n')
      print('Choose a option\n')
      print('##########################################################\n')
      print('1 - Classify Line Command Entry')
      print('2 - Generate Models')
      print('3 - Classify Pending Reviews')
      print('4 - Exit')
      option = input()

      if option == '1':
         ClassifyCliEntry.run()
      if option == '2':
         GenerateCommitteeModels.run() 
      if option == '3':
         ClassifyReviews.run()
      if option == '4':
         break

if __name__ == '__main__':

   user_interaction()
