//require the Elasticsearch librray
const elasticsearchLoading = require("elasticsearch");
const indexNameLoading = "cities";
const dataJsonFile = "../../data/cities.json";
// instantiate an Elasticsearch client
const loadIndexclient = new elasticsearchLoading.Client({
  hosts: ["http://localhost:9200"],
});
// ping the client to be sure Elasticsearch is up
loadIndexclient.ping(
  {
    requestTimeout: 30000,
  },
  function (error: any) {
    // at this point, elastic search is down, please check your Elasticsearch service
    if (error) {
      console.error("Elasticsearch cluster is down!");
    } else {
      console.log("Everything is ok");
    }
  }
);
// create a new index
loadIndexclient.indices.create(
  {
    index: indexNameLoading,
  },
  function (error: any, response: any, status: any) {
    if (error) {
      console.log(error);
    } else {
      console.log("created a new index", response);
    }
  }
);
// add 1 data to the index that has already been created
loadIndexclient.index(
  {
    index: indexNameLoading,
    type: "cities_list",
    body: {
      Key1: "Content for key one",
      Key2: "Content for key two",
      key3: "Content for key three",
    },
  },
  function (error: any, response: any, status: any) {
    console.log(response);
  }
);

// require the array of cities that was downloaded
const cities = require(dataJsonFile);
// declare an empty array called bulk
let bulk: any = [];
//loop through each city and create and push two objects into the array in each loop
//first object sends the index and type you will be saving the data as
//second object is the data you want to index
cities.forEach((city: any) => {
  bulk.push({
    index: {
      _index: indexNameLoading,
      _type: "cities_list",
    },
  });
  bulk.push(city);
});
//perform bulk indexing of the data passed
loadIndexclient.bulk({ body: bulk }, function (err: any, response: any) {
  if (err) {
    // @ts-ignore
    console.log("Failed Bulk operation".red, err);
  } else {
    // @ts-ignore
    console.log("Successfully imported %s".green, cities.length);
  }
});
