window.onload = function() {
    let Application = PIXI.Application,
        loader = PIXI.loader,
        resources = PIXI.loader.resources,
        Sprite = PIXI.Sprite;

    let app = new Application({
        width: screen.width,
        height: screen.height,
        antialias: true,
        transparent: true
    });

    let path1 = "assets/squirtle1.gif";
    let path2 = "assets/bunny.png";

    document.body.appendChild(app.view);

    loader
        .add(path1)
        .add(path2)
        .load(setup);
    
    const aspRatio = app.renderer.width / app.renderer.height;
    const numberElements = 3;
    const twoMinuteFrames = 120;

    function setup() {
        let container = new Container();
        let objects = [];
        let counter = 0;

        function getText() {
            let style = new TextStyle({
                fontFamily: "Arial",
                fontSize: 36,
                fill: "white",
                stroke: '#ff3300',
                strokeThickness: 4,
                dropShadow: true,
                dropShadowColor: "#000000",
                dropShadowBlur: 4,
                dropShadowAngle: Math.PI / 6,
                dropShadowDistance: 6,
            });
            return new Text("Hello", style);
        }

        function gameLoop() {
            //(which happens 60 times per second)
            requestAnimationFrame(gameLoop);

            counter+=1;

            if(counter > twoMinuteFrames){
                counter = 0;
                objects = [];
                container = new Container();

                for(let i = 0; i < numberElements; i++){
                    let random = Math.random();

                    if(random < 0.5){
                        let message = getText();
                        container.addChild(message);
                        objects.push(message);
                    }
                    else{
                        const sprite = new Sprite(
                            resources[path1].texture
                        );
                        container.addChild(sprite);
                        objects.push(sprite);
                    }
                }

                app.stage.addChild(container);
            }
        }

        //Start the loop
        gameLoop();
    }
};