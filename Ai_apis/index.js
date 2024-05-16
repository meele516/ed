const {ChatGroq} =require("@langchain/groq")
const { ChatOpenAI } =require("@langchain/openai");

const  { createSqlQueryChain, SqlDatabaseChain, SQL_MYSQL_PROMPT } =require("langchain/chains/sql_db")
const {ConversationChain}=require("langchain/chains")
const  { SqlDatabase } =require("langchain/sql_db");
const  { DataSource } =require("typeorm");
const { QuerySqlTool } =require("langchain/tools/sql");
const  { PromptTemplate ,ChatPromptTemplate,HumanMessagePromptTemplate,MessagesPlaceholder} =require( "@langchain/core/prompts");
const  { StringOutputParser, } =require("@langchain/core/output_parsers");
const   { createSqlAgent, SqlToolkit} = require("langchain/agents/toolkits/sql");
const  { createOpenAIToolsAgent, AgentExecutor } = require("langchain/agents");
const { AIMessage, HumanMessage } =require("@langchain/core/messages");
const  {BufferMemory}=require("langchain/memory")
const express =require("express")
const aiRoute = express.Router()
const {
  RunnablePassthrough, 
  RunnableSequence,
}  =require ("@langchain/core/runnables");

  const datasource = new DataSource({
    type:"mysql",
    port:3306,
    url:"mysql://ujrrh5mr2koynblu:uGFhj03ml6FaTOvv8oY4@bcs5gehb4n0ke1oyivai-mysql.services.clever-cloud.com:3306/bcs5gehb4n0ke1oyivai",
    database:"bcs5gehb4n0ke1oyivai"
  });

const llm= new ChatGroq({
    apiKey:"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",
   temperature:0,
   verbose:true
   

  
  })
  var regex = /\\_(?=[^ ])/g;

  // Replace "\_" with "_"
  // var replacedString = inputString.replace(regex, "_");
 const chat_history =[]
aiRoute.post("/getData",async (req,res)=>{
    try{
        const db = await SqlDatabase.fromDataSourceParams({
            appDataSource: datasource,
          });
        
        const executeQuery = new QuerySqlTool(db);
        const toolkit = new SqlToolkit(db,llm); 
        const tools = toolkit.getTools();
        toolkit.dialect="mysql"
        // console.log(toolkit,"apple")
       
    
        const SQL_PREFIX = `You are an agent designed to interact with a SQL database.
        Given an input question, create a syntactically correct mysql query to run, then look at the results of the query and return the answer.
        Unless the user specifies a specific number of examples they wish to obtain, always limit your query to at most {top_k} results using the LIMIT clause.
        You can order the results by a relevant column to return the most interesting examples in the database.
        Never query for all the columns from a specific table, only ask for a the few relevant columns given the question.
        You have access to tools for interacting with the database.
        Only use the below tools. Only use the information returned by the below tools to construct your final answer.
        You MUST double check your query before executing it. If you get an error while executing a query, rewrite the query and try again.
        
        DO NOT make any DML statements (INSERT, UPDATE, DELETE, DROP etc.) to the database.
        
        If the question does not seem related to the database, just return "I don't know" as the answer.`;
        const SQL_SUFFIX = `Begin!  
         
        Question: {input}
        Thought: I should look at the tables in the database to see what I can query.
        {agent_scratchpad}`;
        // const prompt = ChatPromptTemplate.fromMessages([
        //   ["system", SQL_PREFIX], 
        //   HumanMessagePromptTemplate.fromTemplate("{input}"), 
        //   new AIMessage(SQL_SUFFIX.replace("{agent_scratchpad}", "")),
        //   new MessagesPlaceholder("agent_scratchpad"),
        // ]);
        // const newPrompt = await prompt.partial({
        //   dialect: toolkit.dialect,
        //   top_k: "10",
        // });
        // const runnableAgent = await createOpenAIToolsAgent({
        //   llm,
        //   tools,
        //   prompt:newPrompt
        // });
        // const agentExecutor = new AgentExecutor({
        //   agent: runnableAgent,
        //   tools,
        // });
        // console.log(
        //   await agentExecutor.invoke({
        //     input:
        //       "what are the coloumns of BillingReport?",
        //   }),"banana"
        // );
        
        // const answerPrompt =
        // PromptTemplate.fromTemplate(`your task is what ever input you get extract the mysql query from it and write only query donot wrap it any text and no need to write your ai answers
        // `);
        // const executor = createSqlAgent(llm, toolkit,[executeQuery],
        //   { inputVariables: ['question'],
        // prefix: SQL_PREFIX,
        // suffix: `Begin!
        
        // Question: {input} 
        // Thought: I should look at the tables in the database to see what I can query.`,
        // topK: 10,} 
      // );
        const input = `join getCostusage and BillingReport on name can u execute the query and give results`;
        // const sample =await executor.invoke({input:req.body.query}) 
        // console.log(sample.output,"saleem")
        const schema = await  db.run(req.body.query)
        console.log(typeof(schema),"potatao")
       const data =await  db.run("SHOW TABLES")
        // console.log(data,"apple")
        const correctquery =PromptTemplate.fromTemplate(`you are a given a mysql query {query}  correct it syntax  remove all '\\' and '\' ,replace all '\_' with '_',replace all \* with *  there should be no '\_' please in tables names there might be '_' no need to remove this for example if it is example_1 let it be example_1 check also if query has correct column names the actual columns are in {schema} ,veryimportantnote:Write only the ** SQL query and nothing else. Do not wrap the SQL query in any other text, not even backticks`)
        const correctchain =correctquery.pipe(llm).pipe(new StringOutputParser())
        // const extractchain =answerPrompt.pipe(llm).pipe(new StringOutputParser())
        const mycorrected =RunnableSequence.from([
          correctquery,
          llm,
          new StringOutputParser()
        ])   
      
// const writeQuery = await createSqlQueryChain({
//   llm,
//   db,
//   dialect: 'mysql',

   
// });

// const quey = new SqlDatabaseChain({
//   llm:llm,
//   database:db
// })
// const example = await quey.run("how many tables are there in my db?")
// console.log(example,"nodejs")
// console.log(writeQuery)
     const userquestion =req.body.query
     chat_history.push(new HumanMessage(userquestion))
    const timestampPrompt =   PromptTemplate.fromTemplate(`As a data analyst, you have been given a SQL query {query} and a schema {schema}. Your task is to:

    Update any timestamp column if (any u can know this by seeing if its  value is like 1723973500000)in the schema to a date format  using the DATE_FORMAT(FROM_UNIXTIME(column_name / 1000), '%d-%m-%y') formula.
    if there is no timestamp column no need to do anything.
    Please provide the updated SQL query with the timestamp columns converted to a date format and the analytical query as a single SQL query with no additional text or formatting
    Write only a SQL query and nothing else. Do not wrap the SQL query in any other text, not even backticks. .
   `);
     const anlysisPrompt =
     PromptTemplate.fromTemplate(`You are a data analyst at a company. you are also given a sql query {query} you need to write a analytical query on that query
     based on the users question {question} im providing the chathistory {chat_history} im also providing the query's response to see what the table consists of {response} each object is a row the columnsnames are keys and the values are corresponding key values no need to use JSON_EXTRACT or JSON_VALUE im sending u response for contextpurpose actual data is store in sql database 
    make sure you get the column names from this {schema} *** dont take ur own column names
    i need a readable query Don't skip anything by using ...,
    make sure not to use any reserved keywords as derived column names,
  note : please Write only a SQL query and nothing else. Do not wrap the SQL query in any other text, not even backticks donot give additional text other than sqlquery.
    `); 
const answerChain = anlysisPrompt.pipe(llm).pipe(new StringOutputParser());
// const answerChainWithMemory =new ConversationChain({
//   llm
// })
const timestampchain =timestampPrompt.pipe(llm).pipe(new StringOutputParser())
let aq=""
const chain = RunnableSequence.from([
  RunnablePassthrough.assign({}).assign({
 
    // query: (i) => timestampchain.invoke(i.query)
  }),
  
  // {schema:prev=>prev.schema,query:timestampchain,question:prev=>prev.question},
  prev=>{
    console.log(prev,"phase1") 
    return prev
  }, 
  prev=>{
    console.log(prev,"phase2")
    return prev  
  },  
  answerChain,  
  prev=>{
    console.log(prev,"phase3")
    return {query:prev,schema:Object.keys(JSON.parse(schema)[0])}
  },
 
  
prev=>{return {query:prev.query.replace(regex, "_")}}
,
prev=>{return{query:prev.query.replace(/\\_/g, '_')}},
prev=>{
  // let regex=/```sql\n(.*?)(?=\n```)/gs 
  console.log(prev.query,"phase4")
  aq= prev.query
  chat_history.push(new AIMessage(prev.query))
  return prev 
}   
  , 
  // prev=>executeQuery.invoke(prev.query) 

]);

let result=await chain.invoke({ query:userquestion ,schema: Object.keys(JSON.parse(schema)[0]),question:req.body.question,response:schema,chat_history:chat_history})
res.status(200).send(result)
console.log(chat_history)
    }
    catch(err){  
      console.log(err)
res.status(400).send(err) 
    }
})
aiRoute.post("/talk",async(req,res)=>{
try{
  const db = await SqlDatabase.fromDataSourceParams({
    appDataSource: datasource,
  });
  const executeQuery = new QuerySqlTool(db);
  const toolkit = new SqlToolkit(db,llm); 
  const tools = toolkit.getTools();
  toolkit.dialect="mysql"
  
  const SQL_PREFIX = `You are an agent designed to interact with a SQL database.
  Given an input question, create a syntactically correct mysql query to run, then look at the results of the query and return the answer.
  Unless the user specifies a specific number of examples they wish to obtain, always limit your query to at most {top_k} results using the LIMIT clause.
  You can order the results by a relevant column to return the most interesting examples in the database.
  Never query for all the columns from a specific table, only ask for a the few relevant columns given the question.
  You have access to tools for interacting with the database.
  Only use the below tools. Only use the information returned by the below tools to construct your final answer.
  You MUST double check your query before executing it. If you get an error while executing a query, rewrite the query and try again.
  
  DO NOT make any DML statements (INSERT, UPDATE, DELETE, DROP etc.) to the database.
  
  If the question does not seem related to the database, just return "I don't know" as the answer.`;
  const executor = createSqlAgent(llm, toolkit,[executeQuery],{
    prefix:SQL_PREFIX
  })
  const sample =await executor.invoke({input:req.body.query}) 
  res.status(200).send(sample)
} 
catch(err){
  console.log(err)
res.status(400).send({})
}
})



module.exports=aiRoute
 



/**
There are 8 employees. 
 */