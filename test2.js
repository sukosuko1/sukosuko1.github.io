console.log("xxzzgot it");

stage = {
    counter : 102,
    action(elapsed) {
        this.counter--;
        if (this.counter <= 0) this.done = true;
    },
    render() {
        ctx.fillStyle="white";
        ctx.fillRect(0,0,ctx.canvas.width, ctx.canvas.height);
        ctx.fillStyle="red";
        ctx.font = "100px arial";
        ctx.fillText(this.counter, 100,100 + this.counter);
    }
};


