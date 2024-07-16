import express from 'express';
import cors from 'cors';
import router from './src/Apis/EmailApi.js';


const app = express();
app.use(express.json());
app.use(cors({origin: true, credentials: true}));
app.use('/api',router);
const port = 3600;



app.use((err, req, res, next) => {
    res.status(500).send("Uh oh! An unexpected error occured.")
  })

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });