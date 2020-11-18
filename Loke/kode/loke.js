//@ts-check

class Bil {
    /**
     * @param {number} x
     * @param {number} y
     */
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.vx = 0;
        this.vy = 0;
        this.ax = 0;
        this.ay = 0;
        this.width = 50;
        this.height = 100;
        this.rotation = 0;
        this.div = ""
    }
    render() {
        this.x += this.vx;
        this.vx *= 0.98;

        this.div.style.bottom = `${this.y}px`;
        this.div.style.left = `${this.x}px`;
    }
    /**
 * Roterer bilen rundt midtpunktet i bil-div
 * @param {string} direction
 */
    turn(direction) {
        if (direction === "right") {
            this.rotation -= 5
            this.div.style.transform = `rotate(${this.rotation}deg) scaleX(-1)`
        } else {
            this.rotation += 5
            this.div.style.transform = `rotate(${this.rotation}deg) scaleX(-1)`
        }
    }
}

/** @type {any} */
window.onload = function () {
    const divBane = document.getElementById("bane");
    const divBil = document.getElementById("bil");
    const divFjell = document.getElementById("fjell");
    //document.addEventListener("keydown", drive);

    let keysPressed = new Set;

    window.addEventListener("keydown", (e) => {
        keysPressed.add(e.key);
    })

    window.addEventListener("keyup", (e) => {
        for (let i = 0; i < keysPressed.size; i++) {
            if (keysPressed.has(e.key)) {
                keysPressed.delete(e.key);
            }
        }
    })

    let bil = new Bil(0, 635);
    bil.div = document.getElementById("bil");

    function drive() {
        let array = Array.from(keysPressed)
        for (let i = 0; i < array.length; i++) {
            if (array[i] === "w") {
                bil.vx += 0.2;
            }
            if (array[i] === "s") {
                bil.vx -= 0.2;
            }
            if (array[i] === "a") {
                bil.turn("right");
            }
            if (array[i] === "d") {
                bil.turn("left");
            }
        }
    }

    function animation() {

        drive();
        bil.render()
        requestAnimationFrame(animation);
    }
    animation();
}