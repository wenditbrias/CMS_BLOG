// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const mongoose = require('mongoose');
const uri = `mongodb://127.0.0.1:27017/local`;


const index = async (req,res) => {
  res.send('peterparker');
}

export default index;