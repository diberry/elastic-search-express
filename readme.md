# Run Web site with search capabilities

Based on:
* [How To Build a Real-time Search Engine With Node, Vue, and ElasticSearch](https://www.digitalocean.com/community/tutorials/how-to-build-a-real-time-search-engine-with-node-vue-and-elasticsearch) by Ogundipe Samuel Ayo 
* Originally Posted December 12, 2019

Changes: 
* TypeScript 
* Docker for ElasticSearch engine

* Server
    * Elastic search from Docker container
    * Express JS
* Client
    * Vue (sorta)
* Data
    * city list in /Data directory

## Requirements

* [Docker](https://docs.docker.com/get-docker/)
* [Node.js](https://nodejs.org/) (this sample tested with 10.x)
* [Git](https://git-scm.com/downloads)

## Get Code

* Clone or download this [repository](https://github.com/diberry/elastic-search-express)
    * `git clone https://github.com/diberry/elastic-search-express` 
* `cd elastic-search-express` - move into directory just created
* `npm install` to install dependencies

## Start ElasticSearch as local docker container

If you don't have an ElasticSearch server yet, you can use it from a Docker container.

* `docker pull docker.elastic.co/elasticsearch/elasticsearch:7.8.1` to bring image down to local computer
* `docker run -p 9200:9200 -p 9300:9300 -e "discovery.type=single-node" docker.elastic.co/elasticsearch/elasticsearch:7.8.1` to start container
* `docker ps` to see if container is running 
    
## Verify ElasticSearch is running with cURL CLI

* curl -X GET "localhost:9200/_cat/nodes?v&pretty"

## Load city list into index

This is a one-time action to load city list into ElasticSearch index. 

* `npm run load_data`

## Build website code
 
* `npm run prebuild` to prep directories
* `npm run build` to transpile typescript into javascript into `/dist` folder

## Run website code

* `npm run open` to open browser to http://localhost:3001
* `npm run start`


## Run process over and over

* `npm run start:all:again` - assumes data is loaded and you just need to prebuilt, build, start, and open in browser

## Website queries

* `http://localhost:3001/?search=a` - all cities beginning with the letter a

## Known issues

When you query, there is no visual indicator blocking UI - just wait...