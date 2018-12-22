window.onload = function() {
    let Application = PIXI.Application,
        loader = PIXI.loader,
        resources = PIXI.loader.resources,
        Container = PIXI.Container,
        Text = PIXI.Text,
        TextStyle = PIXI.TextStyle,
        Sprite = PIXI.Sprite;

    let app = new Application({
        width: screen.width,
        height: screen.height,
        antialias: true,
        transparent: true
    });

    let path = "assets/random_emoji/";
    let imagePaths = [];
    for(let i = 1; i <= 6; i++){
        imagePaths.push(path + i + ".png");
        loader.add(imagePaths[i-1]);
    }

    document.body.appendChild(app.view);

    loader.load(setup);
    
    const aspRatio = app.renderer.width / app.renderer.height;
    const numberElements = 3;
    const twoMinuteFrames = 120;

    function setup() {
        let container = new Container();
        let objects = [];
        let counter = 0;
        let bagOfWords = ["hello","goodbye","friend","uno","dos","crunch","pi","word","alleluia"]

        function getText() {
            let text = bagOfWords[Math.floor(Math.random()*bagOfWords.length)];
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
            return new Text(text, style);
        }

        function getImage() {
            let imagePath = imagePaths[Math.floor(Math.random()*imagePaths.length)];
            const sprite = new Sprite(
                resources[imagePath].texture
            );
            sprite.width = sprite.width / aspRatio;
            sprite.height = sprite.height / aspRatio;
            return sprite;
        }

        function gameLoop() {
            //(which happens 60 times per second)
            requestAnimationFrame(gameLoop);
            counter+=1;
            if(counter > twoMinuteFrames){

                counter = 0;
                objects = [];
                app.stage.removeChildren();

                container = new Container();

                for(let i = 0; i < numberElements; i++){
                    let random = Math.random();
                    let object2add = (random < 0.5) ? getText() : getImage();
                    if(objects.length !== 0){
                        object2add.x = objects[i-1].x + objects[i-1].width + app.renderer.width/300;
                    }
                    container.addChild(object2add);
                    objects.push(object2add);
                }

                container.position.set(app.renderer.width/10, app.renderer.height/100);
                app.stage.addChild(container);
            }
        }

        //Start the loop
        gameLoop();
    }
};