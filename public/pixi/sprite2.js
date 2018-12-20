let Application = PIXI.Application,
    loader = PIXI.loader,
    resources = PIXI.loader.resources,
    Sprite = PIXI.Sprite;

let app = new Application({width: 512, height: 512});

let path1 = "assets/squirtle1.gif";
let path2 = "assets/bunny.png";

document.body.appendChild(app.view);

loader
    .add(path1)
    .add(path2)
    .load(setup);

function setup() {
    let sprite = new Sprite(
        resources[path1].texture
    );
    app.stage.addChild(sprite);
}