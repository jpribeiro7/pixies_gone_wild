window.onload = function() {
    let Application = PIXI.Application,
        loader = PIXI.loader,
        resources = PIXI.loader.resources,
        TextureCache = PIXI.utils.TextureCache,
        AnimatedSprite = PIXI.extras.AnimatedSprite,
        Rectangle = PIXI.Rectangle,
        Sprite = PIXI.Sprite;

    let app = new Application({
        width: screen.width,
        height: screen.height,
        antialias: true,
        transparent: true
    });

    let path1 = "assets/flame_sprite.png";

    document.body.appendChild(app.view);

    loader
        .add(path1)
        .load(setup);

    const aspRatio = app.renderer.width / app.renderer.height;
    let id = 0;
    let timer = 0;

    function setup() {
        // const sprite = new Sprite(
        //     resources[path1].texture
        // );
        let sprites = [];
        let texture = TextureCache[path1];
        for(let i = 0; i < 1 ; i++ ){
            for(let j = 0; j < 6 ; j++){

                texture.frame = new Rectangle(512*j,i,3072-512*j,512);
                let sprite = new Sprite(texture);
                sprite.width = sprite.width / aspRatio;
                sprite.height = sprite.height / aspRatio;
                sprite.id = j + i*8;
                sprites.push(sprite);
                sprite.visible = false;
                app.stage.addChild(sprite);
            }
        }

        app.ticker.add((delta) => animation(sprites, delta));
    }

    function animation(sprites, delta) {
        timer += delta;
        if(timer > 6){
            timer = 0;
            sprites[id].visible = true;
            if(id === 0)sprites[5].visible = false;
            else sprites[id-1].visible = false;
        }
        // app.stage.removeChildren();
        // app.stage.addChild(sprites[id]);
    }
};