const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

mongoose.set( 'useUnifiedTopology', 'true' );
mongoose.set('useFindAndModify', 'true');
mongoose.connect('mongodb://localhost:27017/facebookDB', { useNewUrlParser: true });

const facebookSchema = {
	email:String,
	password:String
};
const Facebook = mongoose.model('Facebook',facebookSchema);

app.post("/signin", (req, res) => {
  const newFacebook = new Facebook({
			email:req.body.email,
			password:req.body.password
		});
		newFacebook.save(function(err) {
			if(!err) {
				res.json("succesfully added one article");
			} else {
				res.json(err);
			}
		});
})

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}
app.listen(port,()=> console.log(`app is running on port ${port}`));