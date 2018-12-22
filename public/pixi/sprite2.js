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

    let path1 = "assets/back2.png";

    document.body.appendChild(app.view);

    loader
        .add(path1)
        .load(setup);

    const aspRatio = app.renderer.width / app.renderer.height;
    const numberSprites = 144;
    let finalX = 0;

    function setup() {
        for(let i  = 0; i < numberSprites; i++){
            const sprite = new Sprite(
                resources[path1].texture
            );
            sprite.id = i+1;
            sprite.timer = 0;
            sprite.timeStart = 0;
            sprite.canMove = false;
            sprite.width = sprite.width / aspRatio;
            sprite.height = sprite.height / aspRatio;
            sprite.x = app.renderer.width / 10;
            sprite.y = i*4;
            sprite.finalY = (numberSprites-1)*4 - sprite.y;
            sprite.vy = (sprite.finalY - sprite.y)/120;

            app.stage.addChild(sprite);

            app.ticker.add((delta) => animation(sprite, delta));
        }
    }

    function animation(sprite, delta) {
        sprite.timer += delta;

        //timeRatio is to check when a determined sprite can move
        const timeRatio = sprite.timer/(sprite.id*60);

        if(timeRatio > 1 && (!sprite.canMove || sprite.timer <= sprite.timeStart + 120)){
            if(!sprite.canMove){
                sprite.canMove = true;
                sprite.timeStart = sprite.timer;
            }
            sprite.x += app.renderer.width/300 * delta;
            sprite.y += sprite.vy*delta;
        }
        else if (sprite.canMove && sprite.timer > sprite.timeStart + 120){
            sprite.y = sprite.finalY; //this is just to force the final position and not be unaligned
            if(finalX===0) finalX = sprite.x;
            else sprite.x = finalX;
        }
    }
};