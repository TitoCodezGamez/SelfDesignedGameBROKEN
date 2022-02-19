class Ground{
    constructor(x, y, width, height){
        var opt={
            isStatic: true
        }

        this.body = Bodies.rectangle(x,y,width,height,opt);
        World.add(world,this.body);
        this.width = width;
        this.height = height;

    }

    display(){
        fill(255);
        rectMode(CENTER);
        rect(this.body.position.x,this.body.position.y,this.width,this.height);
    }

}