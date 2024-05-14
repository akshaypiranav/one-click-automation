const express = require('express');
const cors = require('cors');
const app = express();

const passer= require('./Controller/passer')



const port = 8000;

const corsOptions = {
  origin: 'http://localhost:8080', 
  optionsSuccessStatus: 200 
};

app.use(cors(corsOptions));

app.use(express.json());
app.get('/',(req,res)=>{

    res.send("Backend For One Click Automation")
})

app.post('/api', (req, res) => {
  const { Tool,Language,TestRunner,DirectoryName,DirectoryPath } = req.body;
  console.log(Tool,Language,TestRunner,DirectoryName,DirectoryPath)

  passer.oneclickAutomation(Tool,Language,TestRunner,DirectoryName,DirectoryPath)

  
  
  res.json({ status: 'success', message: 'Message received by Express.js' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
