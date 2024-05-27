const express = require('express')
const mongoose = require('mongoose')
const Article = require('./models/articledata')
const articleRouter = require('./routes/articles')
const methodOverride = require('method-override')
const app = express()


mongoose.connect('mongodb://127.0.0.1:27017/blog').then(()=>{
    console.log('conntected')
}).catch(()=>{
    console.log('disconnect')
})



app.set('view engine','ejs')
app.engine('ejs', require('ejs').__express);
// to acesss the data in form
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'))
app.use('/articles',articleRouter)


//const articles=[{
  //  title:'Title1',
    //createdAt:new Date(),
    //description:'Test description',
//}]

app.get("/",async(req,res)=>{
    const articles=await find().sort({
      createdAt:"desc"
    })
    res.render('articles/index',{articles:articles});
});

app.listen(5001)


