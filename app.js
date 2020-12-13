const express=require('express')
const bodyParser = require('body-parser') 
const mysql = require ('mysql') 
const handlebars = require('express-handlebars') 
const app = express() 
const urlencodeParser=bodyParser.urlencoded({extended:false})

const sql = mysql.createConnection({
	host:'localhost', 
	user:'root', 
	password:'pgp27214', 
	port:3306
	})
	
sql.query('use nodejs;') 
app.use('/img', express.static('img'))
app.use('/css', express.static('css'))
app.use('/js', express.static('js'))

app.listen(3000, function(req, res){
	console.log('SERVIDOR UP AND RUNNING!')
})	

// templates 
app.engine("handlebars", handlebars({defaultLayout :'main'}))
app.set('view engine','handlebars')

//INDEX
app.get("/", function(req, res) {
	res.render('index')
})

// INSERIR
app.get("/inserir", function (req,res) { 
	res.render("inserir")
})

// SELECIONAR
app.get("/selecionar/:id?", function (req,res) { 
	if (!req.params.id) {
		sql.query('select * from users order by id asc', function(err, results, fields) {
			res.render ('selecionar', {data:results})
		})
	} else { 
		sql.query('select * from users where id=? order by id asc',[req.params.id], function(err, results, fields) {
			res.render ('selecionar', {data:results})
		})
	}
})

// APAGAR
app.get("/deletar/:id", function (req,res) {
	sql.query("delete from users where id=?",[req.params.id])
	res.render("deletar")
})

// EDITAR
app.get("/editar/:id", function (req,res) { 
	sql.query('select * from users where id=?',[req.params.id], function (err, results,fields){
		res.render ('editar', {id:req.params.id, name:results[0].name, age:results[0].age})
	})
});

app.post("/controllerUpdate", urlencodeParser, function (req,res) {
	sql.query('update users set name=?, age=? where id=?',[req.body.name, req.body.age, req.body.id])
	res.render('controllerUpdate')
});

app.post('/controllerForm', urlencodeParser, function (req, res) {
	sql.query('insert into users value(?,?,?)',[req.body.id, req.body.name, req.body.age])
	res.render ('controllerForm', {name:req.body.name})
});
