const express = require('express');
const app = express(); //top-level function of express

const path = require('path');
const apiData = require('./practice.json')

const port = 3000;

app.use((req,res,next)=>{
  console.log(`${req.method} request for ${req.url} `);
  next();
})


//used to send a default message before routing
// app.get('/', (req, res) => res.send('Hello World!'));

app.use(express.static('public'));//all files from public folder must be included
app.use('/bootstrap', express.static(path.join(__dirname, 'node_modules/bootstrap/dist')));
app.use('/jquery', express.static(path.join(__dirname, 'node_modules/jquery/dist')));
app.use('/popper', express.static(path.join(__dirname, 'node_modules/@popperjs/core/dist/umd')));
app.use('/js', express.static(path.join(__dirname, 'public/js')));
app.use('/css', express.static(path.join(__dirname, 'public/css')));


// set the route for index.html
app.get('/index', (req,res,)=>{
  res.sendFile(path.join(__dirname+'/public/index.html'));
});

// set the route for about.html
app.get('/about', (req,res,)=>{
  res.sendFile(path.join(__dirname+'/public/about.html'));
});

//give access to apiData
app.get('/practice', (req,res,)=>{
  res.json(apiData);
});

//set endpoint/=parameter
app.get('/gender/g=:gender',(req,res)=>{
	const genderParam = req.params.gender // retrieves the parameter value requested by user
	if ((genderParam === 'male') || (genderParam === 'female')){
		let filteredArray = []; // array to push the matching objects to user's value
		for (let i = 0; i < apiData.length; i++) {
			if (genderParam === apiData[i].gender.toLowerCase()){
				filteredArray.push(apiData[i]);
			}
		}
		res.send(filteredArray);
	} else {
		res.send('Invalid parameter');
	}

});

//set name/=first_name
app.get('/name/fn=:first_name',(req,res)=>{
	const nameParam = req.params.first_name // retrieves the parameter value requested by user
		let nameFilteredArray = []; // array to push the matching objects to user's value
		for (let i = 0; i < apiData.length; i++) {
			if (nameParam === apiData[i].first_name.toLowerCase()){
				nameFilteredArray.push(apiData[i]);
			}
		}
		res.send(nameFilteredArray);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))