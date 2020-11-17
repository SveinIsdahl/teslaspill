//@ts-check

//Globale variabler fordi de brukes i alle deler av koden, 
//const forhindrer at man senere endrer på dem ved uhell, derfor greit å bruke
const width = 1000;
const height = 600;
const friction = 0.98;
const speedConstant = 0.15;
const accConstant = 0.1;


//Game-stats
let score = 0;
let highscore = 0;
let scoreLimit = 1000;

//Funksjoner 
/**
 * @param {number} x
 */
const cos = (x) => Math.cos(x * Math.PI / 180);
/**
 * @param {number} x
 */
const sin = (x) => Math.sin(x * Math.PI / 180);
/**
 * @param {number} x
 */
const atan = (x) => Math.atan(x) * 180 / Math.PI;
/**
 * @param {string} x
 */
const log = (x) => console.log(x)



class Car {
    /**
     * @param {number} x
     * @param {number} y
     * @param {string} img
     */
    constructor(x, y, img) {
        this.x = x;
        this.y = y;
        this.vx = 0;
        this.vy = 0;
        this.ax = 0;
        this.ay = 0;
        this.img = img;
        this.width = 50;
        this.height = 100;
        this.rotation = 0;
        this.prevRotation = 0;
        this.S = {};
        this.SA = {};
        this.SB = {};
        this.SC = {};
        this.SD = {};

        //Vinkel mellom sentrum og A i startposisjon (når rotation = 0)
        this.pointAngle = atan(this.width / this.height);
        this.radius = 25 * Math.sqrt(5);
    }
    updateVectors() {
            if (this.rotation === this.prevRotation) {
                return
            }
            this.phi = this.rotation;
            //Senter av div
            this.S = {
                x: this.x + 25,
                y: this.y + 50
            }

            //Vektorer fra punkt S til hjørnene,
            //oppdaterer seg når rotasjon endres, eller x/y endres


            this.SA = {
                x: -this.radius * cos(this.phi + this.pointAngle - 90) + this.S.x,
                y: this.radius * sin(this.phi + this.pointAngle - 90) + this.S.y
            }
            this.SB = {
                x: -this.radius * cos(this.phi + -this.pointAngle - 90) + this.S.x,
                y: this.radius * sin(this.phi + -this.pointAngle - 90) + this.S.y
            }
            this.SC = {
                x: -this.radius * cos(this.phi + this.pointAngle + 90) + this.S.x,
                y: this.radius * sin(this.phi + this.pointAngle + 90) + this.S.y
            }
            this.SD = {
                x: -this.radius * cos(this.phi + -this.pointAngle + 90) + this.S.x,
                y: this.radius * sin(this.phi + -this.pointAngle + 90) + this.S.y
            }
            this.prevRotation = this.rotation;
        }
        /**
         * @param {string} id
         */
    initialize(id) {
            this.div = document.getElementById(id);

            let stl = this.div.style;

            stl.position = "absolute";
            stl.backgroundColor = "black";
            //stl.backgroundImage = `url(${this.img})`;
            //stl.backgroundSize = "100px"
            stl.width = this.width + "px";
            stl.height = this.height + "px";
        }
        /**
         * Roterer bilen rundt midtpunktet i bil-div
         * @param {string} direction
         */
    turn(direction) {
            if (direction === "right") {
                this.rotation -= 5
                this.div.style.transform = `rotate(${-this.rotation}deg)`
            } else {
                this.rotation += 5
                this.div.style.transform = `rotate(${-this.rotation}deg)`
            }
        }
        //Oppdaterer verdier som akselerasjon, fart, posisjon
        //Setter også riktig posisjon på div i forhold til x og y-variablene
    render() {
        this.vx *= friction;
        this.vy *= friction;
        this.ax *= 0.55;
        this.ay *= 0.55;
        this.vx += this.ax;
        this.vy += this.ay;
        this.x += this.vx;
        this.y += this.vy;
        this.div.style.left = this.x + "px";
        this.div.style.top = this.y + "px";
        this.div.style.transform = `rotate(${-this.rotation}deg)`

    }
    collisionCheck() {
            //String for å vite hvor mange hjørner som har kollidert
            let collisions = "";
            ["A", "B", "C", "D"].forEach((f) => {
                let k = this[f];
                if (((k.x) > width) || k.x < 0) {
                    collisions += f;
                } else if (((k.y) > height) || k.y < 0) {
                    collisions += f;
                }
            })

            //Dersom en kollisjon skjer, log kollisjonshjørner og reset spill
            if (collisions !== "") {
                log(collisions);
                this.reset();
            }


        }
        //Restarter spill, både posisjon og score
    reset() {
        this.x = 100;
        this.y = 100;
        this.vx = 0;
        this.vy = 0;
        this.rotation = 0;

        if (score > highscore) {
            highscore = score;
        }
        score = 0;
        if (highscore > scoreLimit) {
            alert("Du har høy nok highscore til å gå videre");
        }


    }
}

class Stone {
    /**
     * @param {number} x
     * @param {number} y
     * @param {number} w
     * @param {number} h
     */
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.div = "";
        this.A = {};
        this.B = {};
        this.C = {};
        this.D = {};
    }
    updateVectors() {
        this.A = {
            x: this.x,
            y: this.y
        };
        this.B = {
            x: this.x + this.w,
            y: this.y
        };
        this.C = {
            x: this.x + this.w,
            y: this.y + this.h
        };
        this.D = {
            x: this.x,
            y: this.y + this.h
        };
    }
}

class Funcs {
    /**
     * @param {object} rect1
     * @param {object} rect2
     */
    doRectOverlap(rect1, rect2) {

    }
}

window.onload = () => {
    //Lager bil
    let tesla = new Car(100, 100, "bil.png");
    tesla.initialize("bil");

    //Array som inneholder tasten som er trykket ved en gitt frame
    let keysPressed = new Set;

    const scoreDiv = document.getElementById("score");
    const highscoreDiv = document.getElementById("highscore");
    const scoreLimitDiv = document.getElementById("scorelimit");

    window.addEventListener("keydown", (e) => {
        keysPressed.add(e.key);
    });

    window.addEventListener("keyup", (e) => {
        for (let i = 0; i < keysPressed.size; i++) {
            if (keysPressed.has(e.key)) {
                keysPressed.delete(e.key);
            }
        }
    });

    function animation() {
        scoreDiv.innerHTML = String(score);
        highscoreDiv.innerHTML = String(highscore);
        scoreLimitDiv.innerHTML = String(scoreLimit);

        //Sjekker hvilke taster som er trykket ned og gjør korresponderende bevegelse
        keysPressed.forEach((k) => {
            switch (k) {
                case "w":
                    tesla.ay -= 0.15 * sin(tesla.rotation + 90)
                    tesla.ax += 0.15 * cos(tesla.rotation + 90)
                    break;
                case "a":
                    tesla.turn("left")
                    break;
                case "s":
                    tesla.ay += 0.15 * sin(tesla.rotation + 90)
                    tesla.ax -= 0.15 * cos(tesla.rotation + 90)
                    break;
                case "d":
                    tesla.turn("right")
                    break;
                case "ArrowRight":
                    tesla.vx += 0.15;
                    break;
                case "ArrowLeft":
                    tesla.vx -= 0.15;
                    break;
                case "ArrowDown":
                    tesla.vy += 0.15;
                    break;
                case "ArrowUp":
                    tesla.vy -= 0.15
                    break;
                default:
                    log("Error/wrong key pressed")
                    break;
            }
        })
        tesla.collisionCheck()
        tesla.updateVectors();
        tesla.render();
        requestAnimationFrame(animation);
    }
    animation();
}

//Når highscore er høy nok, initiate end-sequence