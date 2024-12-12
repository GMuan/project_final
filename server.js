const express = require('express');
const cors = require('cors');
const fs = require('fs');
const app = express();

let userdata = [];

function loadUserData() {
    try {
        const csv = fs.readFileSync("customer.csv", "utf-8");
        const rows = csv.split("\r\n").filter(row => row.trim() !== "");
        userdata = rows.map(row => {
            const [id, pw, name, exerciselistString] = row.split(",");
            const exerciselist = exerciselistString ? JSON.parse(exerciselistString) : [];
            return { id, pw, name, exerciselist };
        });
    } catch (err) {
        console.error("Error loading customer.csv:", err.message);
    }
}

function saveUserData() {
    const csv = userdata.map(user => {
        const exerciselistString = user.exerciselist ? JSON.stringify(user.exerciselist) : '[]';
        return `${user.id},${user.pw},${user.name},${exerciselistString}`;
    }).join("\r\n");

    fs.writeFileSync("customer.csv", csv, "utf-8");
}

app.use(express.json())
app.use(cors());
app.listen(8080, function () {
    console.log("listening on 8080");
    loadUserData();
});

app.get('/idcheck/:id', function(req, res) {
    const id = req.params.id;   
    const idcheck = userdata.some(user => user.id === id);
    res.send({ "ok": !idcheck });
});

app.get('/signup/:id/:pw/:name', function(req, res) {
    const id = req.params.id;
    const pw = req.params.pw;
    const name = req.params.name;
    const idcheck = userdata.some(user => user.id === id);
    if(idcheck){
        res.send({ "ok": false});
    }
    else if (id && pw && name) {
        userdata.push({ id, pw, name });
        saveUserData(); 
        console.log("회원가입 완료:", userdata);
        res.send({ "ok": true });
    } 
    else {
        res.send({ "ok": false});
    }
});

app.get('/login/:id/:pw', function(req, res) {
    const id = req.params.id;
    const pw = req.params.pw;
    
    if (id && pw) {
        const user = userdata.find(user => user.id === id && user.pw === pw);

        if (user) {
            if (!user.exerciselist) {
                user.exerciselist = [];
            }
            res.send({ 
                "ok": true,
                user : {id: user.id, name : user.name, pw : user.pw, exeriselist : user.exeriselist}
            });
        } else {
            res.send({ "ok": false});
        }
    } else {
        res.send({ "ok": false});
    }
});

app.get('/changepw/:id/:pw', function(req,res) {
    const id = req.params.id;
    const pw = req.params.pw;

    console.log(req.body)

    const user = userdata.find(user => user.id === id);

    if (user) {
        user.pw = pw;
        saveUserData();
        res.send({ ok: true});
    } else {
        res.send({ ok: false});
    }
})

app.post('/exercises/:id', function(req, res) {
    const id = req.params.id;
    const newExercise = req.body.exercise;

    const user = userdata.find(user => user.id === id);
    if (user) {
        if (!user.exerciselist) {
            user.exerciselist = [];
        }
        user.exerciselist.push(newExercise);
        saveUserData();
        res.send({ ok: true, exerciselist: user.exerciselist });
    } else {
        res.send({ ok: false });
    }
});


app.delete('/exercises/:id/:index', function(req, res) {
    const id = req.params.id;
    const index = parseInt(req.params.index);
    
    const user = userdata.find(user => user.id === id);
    if (user && user.exerciselist.length > index) {
        user.exerciselist.splice(index, 1);
        saveUserData();
        res.send({ ok: true, exerciselist: user.exerciselist });
    } else {
        res.send({ ok: false });
    }
});


app.put('/exercises/:id/:index', function(req, res) {
    const id = req.params.id;
    const index = parseInt(req.params.index);
    const updatedExercise = req.body.exercise;
    
    const user = userdata.find(user => user.id === id);
    if (user && user.exerciselist.length > index) {
        user.exerciselist[index] = updatedExercise;
        saveUserData();
        res.send({ ok: true, exerciselist: user.exerciselist });
    } else {
        res.send({ ok: false });
    }
});