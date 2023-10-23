const filesystem = require('./node_modules/graceful-fs/graceful-fs')
const inquirer = require("inquirer");
const {Circle, Square, Triangle, Pentagon} = require("./lib/shapes");

class Logo{
    constructor(){
        this.textElement = ''
        this.shapeElement = ''
    }
    render(){
       return `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="300" height="200">${this.shapeElement}${this.textElement}</svg>`
    }
    setTextElement(text,color){
        this.textElement = `<text x="150" y="125" font-size="60" text-anchor="middle" fill="${color}">${text}</text>`
    }
    setShapeElement(shape){
        this.shapeElement = shape.render()

    }
    
}

const questions = [
    {
        type: "input",
        name: "text",
        message: "Enter up to 3 characters to put into your logo",
    },
    {
        type: "input",
        name: "text-color",
        message: "Enter the color you want the text (can be Key color word or HexaDecimal)",
    },
    {
        type: "input",
        name: "shape",
        message: "Enter the color you want the shape to be (can be Key color word or HexaDecimal)",
    },
    {
        type: "list",
        name: "pixel-image",
        message: "What Shape would you like your logo to be",
        choices: ["Circle", "Square", "Triangle","Pentagon"],
    },
];

function writeToFile(fileName, data) {
	console.log("Writing [" + data + "] to file [" + fileName + "]")
    filesystem.writeFile(fileName, data, function (err) {
        if (err) {
            return console.log(err);
        }
        console.log("Your Logo has been created");
    });
}

async function init() {
    console.log("Initializing");
	var svgString = "";
	var svg_file = "logo.svg";

    const answers = await inquirer.prompt(questions);

	var user_text = "";
	if (answers.text.length > 0 && answers.text.length < 4) {
		user_text = answers.text;
	} else {
		console.log("Invalid user text field detected! Please enter 1-3 Characters, no more and no less");
        return;
	}


    user_font_color = answers["text-color"];
	user_shape_color = answers.shape;
	shape_type = answers["pixel-image"];
	
	let user_shape;
	if (shape_type === "Square") {
		user_shape = new Square();
	}
	else if (shape_type === "Circle") {
		user_shape = new Circle();
	}
	else if (shape_type === "Triangle") {
		user_shape = new Triangle();
	}
    else if (shape_type === "Pentagon") {
        user_shape = new Pentagon();
    }
	else {
		console.log("Invalid shape!");
	}

	user_shape.setColor(user_shape_color);

	var svg = new Logo();
	svg.setTextElement(user_text, user_font_color);
	svg.setShapeElement(user_shape);
	svgString = svg.render();
	
	writeToFile(svg_file, svgString); 
}
init()