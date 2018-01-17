console.log("xxzzgot it");

var stage = {
    counter : 101,
    action(elapsed) {
        counter--;
        if (counter <= 0) this.done = true;
    },
    render() {
        ctx.fillStyle("green");
        ctx.fillText(counter, 100,100);
    }
};


