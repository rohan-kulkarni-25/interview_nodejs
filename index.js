const mongoose = require('mongoose');
const express = require('express');
const async = require('async');
const app = express();
app.use(express.json());
app.set('view engine', 'hbs');
app.use(express.urlencoded({extended: true}));
mongoose.connect("<Your URI>", { useNewUrlParser: true, useUnifiedTopology: true });
const Schema = mongoose.Schema;
const sch_data = new Schema({
    name: String,
    st: Number,
    ed: Number
});
const md_data = mongoose.model('interview_model', sch_data);

app.get('/', function (req, res) {res.status(200).sendFile(__dirname + '/index.html');})

app.get('/new', function (req, res) {
    const val = md_data.find({}, function (err, data) {
        if(err) throw err;
        res.status(200).render('form', {names: data});
        return data;
    });
})

app.get('/list', function (req, res) {
    const val = md_data.find({}, function (err, data) {
        if(err) throw err;
        res.status(200).send(data);
        return data;
    });
})

app.post('/new/add', function (req, res) {
    var interviews = req.body, f = 0;
    if(typeof interviews.id == 'string') res.status(404).send('Wrong Input');
    else{
        async.eachSeries(interviews.id, function(obj, callback){
            md_data.findById(obj, function(err, data){
                if(err) throw err;
                var val = data.toObject();
                if(val.st != -1)f = 1;
                callback();
            })
        }, function (err) {
            if(err)throw err;
            if(f) res.status(404).send('Wrong Input');
            else{
                for(let i = 0; i < interviews.id.length; i++){
                    md_data.findByIdAndUpdate(interviews.id[i], {st: interviews.st, ed: interviews.ed}, function(err, data){
                        if(err) throw err;
                        return data;
                    })
                }
                res.redirect('/')
            }
        })
    }
})

const port = process.env.POR || 3000;
app.listen(port);