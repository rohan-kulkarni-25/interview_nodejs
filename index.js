const express = require('express');
const joi = require('joi');
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: false}));
const schema = joi.object({id:joi.string().required(), st:joi.number().required(), ed:joi.number().required()});
var data = [
    {id:1, st:-1, ed:-1},
    {id:2, st:-1, ed:-1},
    {id:3, st:-1, ed:-1},
    {id:4, st:-1, ed:-1},
    {id:5, st:-1, ed:-1},
    {id:6, st:-1, ed:-1},
    {id:7, st:-1, ed:-1},
    {id:8, st:-1, ed:-1},
    {id:9, st:-1, ed:-1},
    {id:10, st:-1, ed:-1},
    {id:11, st:-1, ed:-1},
    {id:12, st:-1, ed:-1},
    {id:13, st:-1, ed:-1},
    {id:14, st:-1, ed:-1},
    {id:15, st:-1, ed:-1},
];

function check(interviews){
    var f = 0;
    f |= (interviews.id.length<2);
    for(let i = 0; i < interviews.id.length; i++)f |= isNaN(+interviews.id[i]);
    if(!f)for(let i = 0; i < interviews.id.length; i++)f |= ((interviews.id[i]-1) >= data.length || (interviews.id[i]-1) < 0);
    if(!f)for(let i = 0; i < interviews.id.length; i++)f |= (data[(interviews.id[i]-1)].st != -1);
    return f;
}

app.get('/', function(req, res){res.status(200).sendFile(__dirname + '/index.html')});

app.get('/list', function(req, res){res.status(200).send(data);});

app.get('/new', function(req, res){res.status(200).sendFile(__dirname + '/form.html');});

app.post('/new/add', function(req, res){
    var interviews = req.body;
    var result = schema.validate(interviews);
    if(result.error)res.status(404).send('Invalid input.');
    else{
        interviews.id = interviews.id.split(',');
        console.log(interviews);
        if(check(interviews))res.status(404).send('Invalid input.');
        else{
            for(let i = 0; i < interviews.id.length; i++)data[interviews.id[i]-1].st = interviews.st, data[interviews.id[i]-1].ed = interviews.ed;
            res.status(200).send('right');
        }
    }
});

const port = 3000 || process.env.PORT;
app.listen(port, function(){console.log(`Listening to ${port}`);});