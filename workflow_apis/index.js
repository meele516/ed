const express = require('express');
const workFlowRoute =express.Router()
const axios =require('axios')

workFlowRoute.post('/api/post', async (req, res) => {
    try {
        
      const { pathParameters, authorization } = (req.body);
      console.log(authorization)
  
      // Extract path parameters
      const { projectId, datasetId } = pathParameters;
  
      // Construct URL
      const url = `https://bigquery.googleapis.com/bigquery/v2/projects/${projectId}/datasets/${datasetId}/tables`;
  
      // Prepare request headers
      const headers = {
        'Authorization': authorization,
        'Content-Type': 'application/json'
      };
  
      // Prepare request body
      const body = {
        url: url,
        httpMethod: 'GET',
        headers: headers
      };
  
      // Set the response body
      req.body = body;
  
      // Continue with your code logic or send the response
      // For now, just logging the constructed body
      console.log(req.body);
          const response = await axios.get(url, { headers });

    // Handle the response
    console.log('API Response:', response.data);
    res.json(response.data);

  
      res.send('Request body constructed successfully.');
    } catch (error) {
      console.error('Error:', error);
    
    }
  });
workFlowRoute.post('/api/get-job-details', async (req, res) => {
  try {
    const { pathParameters, authorization } = req.body;

    // Extract path parameters
    const { projectId, jobId } = pathParameters;

    // Construct URL
    const url = `https://bigquery.googleapis.com/bigquery/v2/projects/${projectId}/jobs/${jobId}`;

    // Prepare request headers
    const headers = {
      'Authorization': authorization,
      'Content-Type': 'application/json'
    };

    // Prepare request body
    const body = {
      url: url,
      httpMethod: 'GET',
      headers: headers
    };

    // Set the response body
    req.body = body;

    // Continue with your code logic or send the response
    // For now, just logging the constructed body
    console.log(req.body);

    res.send('Request body constructed successfully.');
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
});
// POST route for the "GetDatasetDetails" API
// POST route for the "GetDatasetDetails" API
workFlowRoute.post('/api/GetDatasetDetails', async (req, res) => {
  try {
    const { pathParameters, authorization } = req.body;

    // Extract path parameters
    const { projectId, datasetId } = pathParameters;

    // Construct URL
    const url = `https://bigquery.googleapis.com/bigquery/v2/projects/${projectId}/datasets/${datasetId}`;

    // Prepare request headers
    const headers = {
      'Authorization': authorization,
      'Content-Type': 'application/json'
    };

    // Make HTTP GET request
    const response = await axios.get(url, { headers });

    // Send response back to client
    res.json(response.data);
  } catch (error) {
    // Handle errors
    console.error('Error:', error.response ? error.response.data : error.message);
    res.status(error.response ? error.response.status : 500).send(error.response ? error.response.data : error.message);
  }
});
// POST route for the "GetProjectStorageDetails" API
workFlowRoute.post('/api/GetProjectStorageDetails', async (req, res) => {
  try {
    const { pathParameters, authorization, body: innerBody } = req.body;

    // Extract path parameters
    const { projectId } = pathParameters;

    // Construct URL
    const url = `https://bigquery.googleapis.com/bigquery/v2/projects/${projectId}/queries`;

    // Prepare request headers
    const headers = {
      'Authorization': authorization,
      'Content-Type': 'application/json'
    };

    // Prepare request body
    const requestBody = {
      url: url,
      httpMethod: 'POST',
      headers: headers,
      body: innerBody
    };

    // Make HTTP POST request
    const response = await axios.post(url, innerBody, { headers });

    // Send response back to client
    res.json(response.data);
  } catch (error) {
    // Handle errors
    console.error('Error:', error.response ? error.response.data : error.message);
    res.status(error.response ? error.response.status : 500).send(error.response ? error.response.data : error.message);
  }
});
// POST route for the "GetTableData" API
workFlowRoute.post('/api/GetTableData', async (req, res) => {
  try {
    const { pathParameters, authorization, body } = req.body;

    // Extract path parameters
    const { projectId, datasetId, tableId } = pathParameters;

    // Construct URL
    const url = `https://bigquery.googleapis.com/bigquery/v2/projects/${projectId}/queries`;

    // Prepare request headers
    const headers = {
      'Authorization': authorization,
      'Content-Type': 'application/json',
      'Accept': '*/*'
    };

    // Make HTTP POST request
    const response = await axios.post(url, body, { headers });

    // Send response back to client
    res.json(response.data);
  } catch (error) {
    // Handle errors
    console.error('Error:', error.response ? error.response.data : error.message);
    res.status(error.response ? error.response.status : 500).send(error.response ? error.response.data : error.message);
  }
});
// POST route for the "GetBucketDetails" API
workFlowRoute.post('/api/GetBucketDetails', async (req, res) => {
  try {
    const { pathParameters, authorization } = req.body;

    // Extract path parameters
    const { projection, bucketName } = pathParameters;

    // Construct URL
    const url = `https://storage.googleapis.com/storage/v1/b/${bucketName}/o?projection=${projection}`;

    // Prepare request headers
    const headers = {
      'Authorization': authorization
    };

    // Make HTTP GET request
    const response = await axios.get(url, { headers });

    // Send response back to client
    res.json(response.data);
  } catch (error) {
    // Handle errors
    console.error('Error:', error.response ? error.response.data : error.message);
    res.status(error.response ? error.response.status : 500).send(error.response ? error.response.data : error.message);
  }
});
// POST route for the "GetCostUsage" API
workFlowRoute.post('/api/GetCostUsage', async (req, res) => {
  try {
    const { pathParameters, body} = req.body;

    // Extract path parameters
    const { projectId } = pathParameters;

    // Construct URL
    const url = `https://bigquery.googleapis.com/bigquery/v2/projects/${projectId}/queries`;

    // Prepare request headers
    const headers = {
      'Authorization': req.body.authorization,
      'Content-Type': 'application/json'
    };

    // Prepare inner body
    const requestBody = {
      useLegacySql: false,
      query: body.query
    };

    // Prepare request body
    const fullRequestBody = {
      url: url,
      httpMethod: 'POST',
      headers: headers,
      body: requestBody
    };
    console.error(requestBody)
    // Make HTTP POST request
    const response = await axios.post(url, body, { headers });

    // Send response back to client
    res.json(response.data);
  } catch (error) {
    // Handle errors
    console.error('Error:', error.response ? error.response.data : error.message);
    res.status(error.response ? error.response.status : 500).send(error.response ? error.response.data : error.message);
  }
});
// POST route for the "StorageActivityLogs" API
workFlowRoute.post('/api/StorageActivityLogs', async (req, res) => {
  try {
    const { inputParameters } = req.body;

    // Extract query parameters
    const { api_version, filter } = inputParameters.queryParameter;

    // Construct URL
    const url = `https://management.azure.com/subscriptions/ef75a5b3-c965-4865-adf6-63ebfe1e2d97/providers/microsoft.insights/eventtypes/management/values?api-version=${api_version}&$filter=${filter}`;

    // Prepare request headers
    const headers = {
      'Authorization': req.body.authorization
    };

    // Make HTTP GET request
    const response = await axios.get(url, { headers });

    // Send response back to client
    res.json(response.data);
  } catch (error) {
    // Handle errors
    console.error('Error:', error.response ? error.response.data : error.message);
    res.status(error.response ? error.response.status : 500).send(error.response ? error.response.data : error.message);
  }
});

// POST route for the "StorageUsageDetails" API
workFlowRoute.post('/api/StorageUsageDetails', async (req, res) => {
  try {
    const { inputParameters } = req.body;
    
    // Extract query parameters
    const { api_version } = inputParameters.queryParameter;

    // Construct URL
    const url = `https://management.azure.com/subscriptions/cbd09df3-41d7-479d-aebf-eef705920c01/providers/Microsoft.Consumption/usageDetails?api-version=${api_version}`;

    // Prepare request headers
    const headers = {
      'Authorization': req.body.authorization
    };

    // Make HTTP GET request
    const response = await axios.get(url, { headers });

    // Send response back to client
    res.json(response.data);
  } catch (error) {
    // Handle errors
    console.error('Error:', error.response ? error.response.data : error.message);
    res.status(error.response ? error.response.status : 500).send(error.response ? error.response.data : error.message);
  }
});
// POST route for the "GetLogAnalyticsMetrics" API

// POST route for the "StorageIngress" API
workFlowRoute.post('/api/StorageIngress', async (req, res) => {
  try {
    const { inputParameters } = req.body;

    // Extract query parameters
    const { timespan, interval, metricnames, aggregation, metricnamespace, autoadjusttimegrain, validatedimensions, api_version } = inputParameters.queryParameter;

    // Construct URL
    const url = `https://management.azure.com/subscriptions/cbd09df3-41d7-479d-aebf-eef705920c01/resourceGroups/cloud-shell-storage-centralindia/providers/Microsoft.Storage/storageAccounts/mohammedsaleem/providers/microsoft.Insights/metrics?timespan=${timespan}&interval=${interval}&metricnames=${metricnames}&aggregation=${aggregation}&metricnamespace=${metricnamespace}&autoadjusttimegrain=${autoadjusttimegrain}&validatedimensions=${validatedimensions}&api-version=${api_version}`;

    // Prepare request headers
    const headers = {
      'Authorization': req.body.authorization
    };

    // Make HTTP GET request
    const response = await axios.get(url, { headers });

    // Send response back to client
    res.json(response.data);
  } catch (error) {
    // Handle errors
    console.error('Error:', error.response ? error.response.data : error.message);
    res.status(error.response ? error.response.status : 500).send(error.response ? error.response.data : error.message);
  }
});
// POST route for the "GetCostUsage" API
workFlowRoute.post('/api/GetCostUsage', async (req, res) => {
  try {
    const { pathParameters, body: innerBody } = req.body;

    // Extract path parameters
    const { projectId } = pathParameters;

    // Construct URL
    const url = `https://bigquery.googleapis.com/bigquery/v2/projects/${projectId}/queries`;

    // Prepare request headers
    const headers = {
      'Authorization': req.body.authorization,
      'Content-Type': 'application/json'
    };

    // Prepare inner body
    const requestBody = {
      useLegacySql: false,
      query: innerBody.query
    };

    // Prepare request body
    const fullRequestBody = {
      url: url,
      httpMethod: 'POST',
      headers: headers,
      body: requestBody
    };

    // Make HTTP POST request
    const response = await axios.post(url, requestBody, { headers });

    // Send response back to client
    res.json(response.data);
  } catch (error) {
    // Handle errors
    console.error('Error:', error.response ? error.response.data : error.message);
    res.status(error.response ? error.response.status : 500).send(error.response ? error.response.data : error.message);
  }
});
// POST route for the "GetMetricQueries" API
workFlowRoute.post('/api/GetMetricQueries', async (req, res) => {
  try {
    const { pathParameters } = req.body;
    
    // Extract path parameters
    const { projectId,filter, startTime, endTime} = pathParameters;

    // Construct URL
    const url = `https://monitoring.googleapis.com/v3/projects/${projectId}/timeSeries?filter=${filter}&interval.startTime=${startTime}&interval.endTime=${endTime}`;

    // Prepare request headers
    const headers = {
      'Authorization': req.body.authorization
    };

    // Make HTTP GET request
    const response = await axios.get(url, { headers });

    // Send response back to client
    res.json(response.data);
  } catch (error) {
    // Handle errors
    console.error('Error:', error.response ? error.response.data : error.message);
    res.status(error.response ? error.response.status : 500).send(error.response ? error.response.data : error.message);
  }
});
// POST route for the "ForecastedCostData" API
workFlowRoute.post('/api/ForecastedCostData', async (req, res) => {
  try {
    const { inputParameter, body: innerBody } = req.body;
    
    // Extract input parameters
    const { subcriptionId } = inputParameter.pathParameters;
    const { api_version, '%24top': filter } = inputParameter.queryParameter;

    // Construct URL
    const url = `https://management.azure.com/subscriptions/${subcriptionId}/resourceGroups/edo/providers/Microsoft.CostManagement/forecast?api_version=${api_version}&%24top=${filter}`;

    // Prepare request headers
    const headers = {
      'Authorization': req.body.authorization
    };

    // Prepare request body
    const requestBody = {
      // Add any specific properties required for the inner body if needed
    };

    // Prepare full request body
    const fullRequestBody = {
      url: url,
      httpMethod: 'POST',
      headers: headers,
      body: requestBody
    };

    // Make HTTP POST request
    const response = await axios.post(url, requestBody, { headers });

    // Send response back to client
    res.json(response.data);
  } catch (error) {
    // Handle errors
    console.error('Error:', error.response ? error.response.data : error.message);
    res.status(error.response ? error.response.status : 500).send(error.response ? error.response.data : error.message);
  }
});

// POST route for the "SystemLogs" API
// POST route for the "SystemLogs" API
workFlowRoute.post('/api/SystemLogs', async (req, res) => {
  try {
      // Prepare request headers
      const headers = {
          'Authorization': req.body.authorization,
         
          "Content-Type":"application/json",
          "Cache-Control":"no-cache",
      };

      // Prepare request body
      const requestBody = {
          url: 'https://dev-69282603-admin.okta.com/api/v1/logs',
          method: 'GET', // Change httpMethod to method
          headers: headers
      };

      // Make HTTP GET request
      const response = await axios.get(requestBody.url, { headers });
       console.log(req.body.aAutho)
      // Send response back to client
      res.json(response.data);
  } catch (error) {
      // Handle errors
      console.error('Error:', error.response ? error.response.data : error.message);
      res.status(error.response ? error.response.status : 500).send(error.response ? error.response.data : error.message);
  }
});
workFlowRoute.post('/api/ApplicationOperations', async (req, res) => {
  try {
    // Prepare request headers
    const headers = {
      'Authorization': req.body.authorization
    };

    // Prepare request body
    const requestBody = {
      url: 'https://dev-69282603-admin.okta.com/api/v1/apps',
      httpMethod: 'GET',
      headers: headers
    };

    // Make HTTP GET request
    const response = await axios.get(requestBody.url, { headers });

    // Send response back to client
    res.json(response.data);
  } catch (error) {
    // Handle errors
    console.error('Error:', error.response ? error.response.data : error.message);
    res.status(error.response ? error.response.status : 500).send(error.response ? error.response.data : error.message);
  }
});
workFlowRoute.post('/api/GetBucketList', async (req, res) => {
  try {
    const { pathParameters } = req.body;
    
    // Extract path parameters
    const { projectId } = pathParameters;

    // Construct URL
    const url = `https://storage.googleapis.com/storage/v1/b?project=${projectId}`;

    // Prepare request headers
    const headers = {
      'Authorization': req.body.authorization
    };

    // Make HTTP GET request
    const response = await axios.get(url, { headers });

    // Send response back to client
    res.json(response.data);
  } catch (error) {
    // Handle errors
    console.error('Error:', error.response ? error.response.data : error.message);
    res.status(error.response ? error.response.status : 500).send(error.response ? error.response.data : error.message);
  }
});
// POST route for the "BillingUsage" API
workFlowRoute.post('/api/billingusage', async (req, res) => {
  try {
    const { queryParameter } = req.body.inputParameter;

    // Extract query parameters
    const { end_date, start_date } = queryParameter;

    // Construct URL
    const url = `https://api.openai.com/dashboard/billing/usage?end_date=${end_date}&start_date=${start_date}`;

    // Prepare request headers
    const headers = {
      'Authorization': req.body.authorization,
      'Origin': 'https://platform.openai.com',
      'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36',
      'Host': 'api.openai.com'
    };

    // Make HTTP GET request
    const response = await axios.get(url, { headers });

    // Send response back to client
    res.json(response.data);
  } catch (error) {
    // Handle errors
    console.error('Error:', error.response ? error.response.data : error.message);
    res.status(error.response ? error.response.status : 500).send(error.response ? error.response.data : error.message);
  }
});
// POST route for the "Activities" API
workFlowRoute.post('/api/Activities', async (req, res) => {
  try {
    const { queryParameter } = req.body.inputParameter;

    // Extract query parameters
    const { end_date, start_date } = queryParameter;

    // Construct URL
    const url = `https://api.openai.com/v1/dashboard/activity?end_date=${end_date}&start_date=${start_date}`;

    // Prepare request headers
    const headers = {
      'Authorization': req.body.authorization
    };

    // Make HTTP GET request
    const response = await axios.get(url, { headers });

    // Send response back to client
    res.json(response.data);
  } catch (error) {
    // Handle errors
    console.error('Error:', error.response ? error.response.data : error.message);
    res.status(error.response ? error.response.status : 500).send(error.response ? error.response.data : error.message);
  }
});
workFlowRoute.post('/api/APCandidates', async (req, res) => {
    try {
    
      const url = `https://results.eci.gov.in/AcResultGenJune2024/election-json-S01-live.json`;
  
      // Prepare request headers
    //   const headers = {
    //     'Authorization': req.body.authorization
    //   };
  
      // Make HTTP GET request
      const response = await axios.get(url);
      console.log(response.data)
      let formattedData = response?.data?.["S01"]?.chartData?.map(dta=>{
        return {
            "party":dta[0],
            "zone":dta[1],
            "StateRank":dta[2],
            "Name":dta[3],
            "ID":dta[4]
        }
      })
      function generateSingleSQLInsert(jsonArray) {
        const keys = Object.keys(jsonArray[0]).join(', ');
        const valuesSets = jsonArray.map(obj =>
            '(' + Object.values(obj).map(value => typeof value === 'string' ? `'${value}'` : value).join(', ') + ')'
        ).join(', ');
        const sqlInsert = `INSERT INTO APCandidates (${keys}) VALUES ${valuesSets};`;
        return sqlInsert;
    }
    
    // Generate single SQL INSERT statement
    const singleSQLInsert = generateSingleSQLInsert(formattedData);
  
      // Send response back to client
      let response3 =await axios.post("https://express-2273.onrender.com/query",{
        "query":"TRUNCATE TABLE APCandidates"
       })
  let response2= await axios.post("https://express-2273.onrender.com/query",{
    "query":singleSQLInsert
   })
      res.json(singleSQLInsert);
    } catch (error) {
      // Handle errors
      console.error('Error:', error.response ? error.response.data : error.message);
      res.status(error.response ? error.response.status : 500).send(error.response ? error.response.data : error.message);
    }
  });


module.exports=workFlowRoute



