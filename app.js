const { json } = require('body-parser');

var express = require('express'),
    bodyParser = require('body-parser'),
    app     = express(),
    fs      = require('fs');

//
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine','ejs');


function getTimeAndHeight(H_ini,e){
    // after initial height(H_ini), H(nth) = (e^2(n))(H_ini)
    //t(nth) = sqrt(2H(nth)/g)
    // g= acceleration due to gravity = 10
    var data = {
        coordinates : [],
        bounce:0,
        distance:0
    }
    var t = 0,
        g = 10,
        count = 0,
        localH = H_ini;

    while(localH!=0){
        if(data.coordinates.length===0){
            t = Math.sqrt((2*H_ini)/g);
            t/=2;
            t=t.toFixed(3);
            data.coordinates.push([t,H_ini]);
            data.distance+=H_ini;
            count++;
        }
        else{
           h_n = (Math.pow(e,(2*count)))*H_ini;
           t = Math.sqrt((2*h_n)/g);
           localH=h_n;
           t=t.toFixed(3);
           h_n=h_n.toFixed(2);
           localH = h_n;
           data.coordinates.push([t,h_n]);
           data.distance+=(2*h_n);
           count++;
        }
        console.log(data);
    }
    data.bounce = count-1;
    // write data to coordinatesJSON file
    data = JSON.stringify(data,null,2);
    fs.writeFileSync(`data.json`,data);
}


function readData(){
    var data = fs.readFileSync('data.json');
    return data;
}

//ROUTES
app.post("/values",(req,res)=>{
    var height = Number(req.body.heightSent);
    var coeff = Number(req.body.coefficient);
    
    getTimeAndHeight(height,coeff);
    
    res.redirect("/");
});

app.get("/values/show",(req,res)=>{
    var data = readData();
    var link = `<br/> <a href = "/">Click to go back</a>`;
    res.send('<h1>DATA Calculated is: </h1><br/>'+data+link);
});

app.get("/",(req,res)=>{
    res.render('index');
});

app.listen(8085,()=>{
    console.log("SERVER STARTED");
})