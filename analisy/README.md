### Use python 3.8

#### Execute UserInteraction.py

#### It'll show at terminal 3 options: 
  1. Classify Line Command Entry
  2. Generate Models
  3. Classify Pending Reviews
  4. Exit

#### Option 1- Classify Line Command Entry

It classify new entries in file in command line and show the result

This option can be performed directly by the file **ClassifyCliEntry.py**

#### Option 2 - Generate Models

It performs the training of algorithms (Logistic Regression, Multinomial Naive Bayes and SGD) and saves the model for each one, as well as executes the committee to verify the result based on the vote.

This option can be performed directly by the file **GenerateCommitteeModels.py**


#### Option 3 - Classify Pending Reviews

It get unclassified reviews from the mongoDB 'reviews' collection to sort and save the 'classification' attribute according to the rating of the models saved in the previous step

This option can be performed directly by the file **ClassifyReviews.py**

#### Option 4 - Exit

Exit the program