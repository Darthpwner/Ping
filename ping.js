function Game() {
	var canvas = document.getElementById("game");
	this.width = canvas.width;
	this.height = canvas.height;
	this.context = canvas.getContext("2d");
	this.context.fillStyle = "white";

	this.p1 = new Paddle(5, 0);
	this.p1.y = this.height/2 - this.p1.height/2;
	this.p2 = new Paddle(this.width - 15, 0);
	this.p2.y = this.height/2 - this.p2.height/2;
}

Game.prototype.draw = function()
{
	this.context.clearRect(0, 0, this.width, this.height);
	this.context.fillRect(this.width/2, 0, 10, this.height);

	this.p1.draw(this.context);
	this.p2.draw(this.context);
};

Game.prototype.update = function()
{
	if (this.paused)
		return;
};

function Paddle(x, y) {
	this.x = x;
	this.y = y;
	this.width = 10;
	this.height = 50;
	this.score = 0;
}

Paddle.prototype.draw = function(p) 
{
	p.fillRect(this.x, this.y, this.width, this.height);
}

function KeyListener() {
	this.pressedKeys = [];

	this.keydown = function(e) {
		this.pressedKeys[e.keyCode] = true;
	};

	this.keyup = function(e) {
		this.pressedKeys[e.keyCode] = false;
	};

	document.addEventListener("keydown", this.keydown.bind(this));
	document.addEventListener("keyup", this.keyup.bind(this));
}

KeyListener.prototype.isPressed = function(key)
{
	return this.pressedKeys[key] ? true : false;
};

KeyListener.prototype.addKeyPressListener = function(keyCode, callback)
{
	document.addEventListener("keypress", function(e) {
		if (e.keyCode == keyCode) 
			callback(e);
	});
};

// Initialize our game instance
var game = new Game();

function MainLoop() {
	game.update();
	game.draw();

	// Call the main loop again at a frame rate of 30fps
	setTimeout(MainLoop, 33.3333);
}

// Start the game execution
MainLoop();