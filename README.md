# app_store_sentiment

## To Run

1. In folder **/webcli** start the front end in AgularJS, execute :
    ```$ ng serve```
Obs: (Execute ```$ npm install``` before) 
It will started in 'http://localhost:4200'

2. In folder **/webapi/src** start the back end in NodeJS, execute :
```$ node main.js``` 
It will started in http://localhost:3000

3. In http://localhost:4200/pages/tables/application register some app as in the example
Loja: google, Nome: WhatsApp, App ID: com.whatsapp

4. In foldder  **/webapi/src/scraper** execute: 
```$ node main .js```
to extract reviews for each registered app.

5. In folder **/analisy/src**, execute : 
```$ python GenerateCommitteeModels.py``` 
to generate classification models.
Obs: It will only be necessary to run the first time to generate the models.

6. In folder **/analisy/src**, execute : 
```$ python ClassifyReviews.py``` 
to classify pending classification reviews

### About Database

- Database: mongoDB
- Database name: app_sentiment
- Database host: localhost
- Database port: 27017
- Initial collection mandatory: **apps** (if you run scraper in webapi, it will create a collection **reviews**)


## Directories

### Analisy

- To create and save classification models in python
- See more detail in [README.md](https://github.com/MarcosMendes9389/app_store_sentiment/blob/master/analisy/README.md)

### webcli

- Angular Client. Used to show reviews and apps in tables
- See more detail in [README.md](https://github.com/MarcosMendes9389/app_store_sentiment/blob/master/webcli/README.md)

### webapi

- Backend server to angular client
- Scraper: it gets reviews from play store and aple store 
- See more detail in [README.md](https://github.com/MarcosMendes9389/app_store_sentiment/blob/master/webapi/README.md)


### See more detail about whole project in [ProjectReport.md](https://github.com/MarcosMendes9389/app_store_sentiment/blob/master/ProjectReport/ProjectReport.md)