# coding: utf-8
# MONGODB DATABASE
import configparser
from pymongo import MongoClient

config = configparser.ConfigParser()
config.read('config.ini')
client = None
reviewsCollection = 'reviews'
appsCollection = 'apps'

def getConection():
   global client 
   client = MongoClient(config.get('DATABASE','SERVER'), config.getint('DATABASE','PORT'))
   return client['app_sentiment']

def countReviewsPendingClassification():
   global client
   reviews = getConection()[reviewsCollection]
   result = reviews.count_documents({'classification' : None, 'text': {"$ne":None}})
   client.close()
   return result

def getReviewsPendingClassification():
   global client
   reviews = getConection()[reviewsCollection]
   result = reviews.find({'classification' : None, 'text': {"$ne":None}})
   client.close()
   return result


def updateReviewsClassifications(review, classification):
   global client 
   reviews = getConection()[reviewsCollection]
   query = { '_id': review.get('_id') }
   value = { '$set': { 'classification': classification } }
   reviews.update_one(query, value)
   client.close()