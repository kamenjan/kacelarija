

// constructor function for the Cat class
function Cat(name) {
	this.age = 0;
	this.name = name;
	console.log(name);
}

// now we export the class, so other modules can create Cat objects
module.exports = {
	Cat: Cat
};