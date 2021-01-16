const mongoose = require('mongoose');
const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
mongoose.connect("<Your URI here>", { useNewUrlParser: true, useUnifiedTopology: true });
const Schema = mongoose.Schema;
const sch_data = new Schema({
    name: String,
    st: Number,
    ed: Number
});
const md_data = mongoose.model('interview_model', sch_data);

function check(interviews, data){
    var f = 0;
    f |= (interviews.id.length<2);
    for(let i = 0; i < interviews.id.length; i++)f |= isNaN(+interviews.id[i]);
    if(!f)for(let i = 0; i < interviews.id.length; i++)f |= ((interviews.id[i]-1) >= data.length || (interviews.id[i]-1) < 0);
    if(!f)for(let i = 0; i < interviews.id.length; i++)f |= (data[(interviews.id[i]-1)].st != -1);
    return f;
}

app.get('/', function (req, res) {res.status(200).sendFile(__dirname + '/index.html');})

app.get('/new', function (req, res) {res.status(200).sendFile(__dirname + '/form.html');})

app.get('/list', function (req, res) {
    const val = md_data.find({}, function (err, data) {
        if(err) throw err;
        res.status(200).send(data);
        return data;
    });
})

app.post('/new/add', function (req, res) {
    var interviews = req.body;
    md_data.find({}, function (err, data) {
        if(err) throw err;
        interviews.id = interviews.id.split(',');
        if(check(interviews, data))res.status(404).send('Invalid input.');
        else{
            for(let i = 0; i < interviews.id.length; i++){
                md_data.findOneAndUpdate({name: interviews.id[i]}, {st: interviews.st, ed: interviews.ed}, function(err, data){
                    if(err) throw err;
                    return data;
                })
            }
            res.redirect('/');
        }
        return data;
    });
})

const port = process.env.POR || 3000;
app.listen(port);