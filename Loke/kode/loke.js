//@ts-check

class Car {
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
        this.S = {};
        this.A = {};
        this.B = {};
        this.C = {};
        this.D = {};
        this.pointAngle = atan(this.width / this.height);
        this.radius = 25 * Math.sqrt(5);
    }

    window.onload = function () {
        const divBane = document.getElementById("bane");
        const divBil = document.getElementById("bil");
        const divFjell = document.getElementById("fjell")

        document.addEventListener("keydown", drive);

        function drive(e) {
            if (e.key === "d") {
                divBil
            }
        }



    }