function RestController(){
	
	this.response = {
		errors : [],
		success : false,
		result : {}
	};

}

RestController.prototype.finalizeWithResponse = function(res){
	res.send(this.response);
}

module.exports = RestController;