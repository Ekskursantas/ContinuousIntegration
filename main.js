"use strict";
var debug = false;
var gameManager = null;
var introCinematic = null;
var ASSETLOADER = [];
var PLAT;

function start(assets, platform) {
    ASSETLOADER = assets;
    PLAT = platform;
    var game = new Phaser.Game({
        title: "sikker-og-son",
        width: 1920,
        height: 1080,
        type: Phaser.AUTO,
        backgroundColor: "#000",
        scale: {
            min: {
                width: 480,
                height: 270
            },
            autoCenter: Phaser.Scale.CENTER_BOTH,
            mode: Phaser.Scale.ENVELOP
        },
        physics: {
            default: "matter",
            matter: {
                debug: debug,
                gravity: {
                    x: 0,
                    y: 0
                }
            }
        },
        parent: "game_parent_div",
        plugins: {
            scene: [{
                key: "SpineWebGLPlugin",
                plugin: SpineWebGLPlugin,
                mapping: "spine"
            }]
        }
    });
    game.scene.add("Boot", Boot, true)
}
class Boot extends Phaser.Scene {
    preload() {
        this.load.multiatlas({
            url: ASSETLOADER["atlas/allSpritesAtlas.json"],
            path: "atlas/",
            key: "allSpritesAtlas"
        });
        this.load.audioSprite({
            url: ASSETLOADER["audio/audioSprites/allSounds.mp3"],
            jsonURL: ASSETLOADER["audio/audioSprites/allSounds.json"],
            key: "allSounds"
        });
        this.load.animation({
            url: ASSETLOADER["atlas/animations.json"],
            key: "animations"
        });
        this.load.image({
            url: ASSETLOADER["atlas/backgroundImages/Hangar_BG.jpg"],
            normalMap: "",
            key: "Hangar_BG"
        });
        this.load.image({
            url: ASSETLOADER["atlas/backgroundImages/Hangar_Map.jpg"],
            normalMap: "",
            key: "Hangar_Map"
        });
        this.load.image({
            url: ASSETLOADER["atlas/backgroundImages/Map3.jpg"],
            normalMap: "",
            key: "Map3"
        });
        this.load.image({
            url: ASSETLOADER["atlas/backgroundImages/Map4.jpg"],
            normalMap: "",
            key: "Map4"
        });
        this.load.image({
            url: ASSETLOADER["atlas/backgroundImages/Map5.jpg"],
            normalMap: "",
            key: "Map5"
        });
        this.load.image({
            url: ASSETLOADER["atlas/backgroundImages/Map6.jpg"],
            normalMap: "",
            key: "Map6"
        });
        this.load.image({
            url: ASSETLOADER["atlas/backgroundImages/Map7.jpg"],
            normalMap: "",
            key: "Map7"
        });
        this.load.image({
            url: ASSETLOADER["atlas/backgroundImages/Map8.jpg"],
            normalMap: "",
            key: "Map8"
        });
        this.load.image({
            url: ASSETLOADER["atlas/backgroundImages/Map9.jpg"],
            normalMap: "",
            key: "Map9"
        });
        this.load.image({
            url: ASSETLOADER["atlas/backgroundImages/Map1.jpg"],
            normalMap: "",
            key: "Map1"
        });
        this.load.image({
            url: ASSETLOADER["atlas/backgroundImages/Map2.jpg"],
            normalMap: "",
            key: "Map2"
        });
        this.load.image({
            url: ASSETLOADER["atlas/backgroundImages/Intromap.jpg"],
            normalMap: "",
            key: "Intromap"
        });
        this.load.audioSprite({
            url: ASSETLOADER["audio/audioSprites/allTalk.mp3"],
            jsonURL: ASSETLOADER["audio/audioSprites/allTalk.json"],
            key: "allTalk"
        });
        this.load.spine({
            key: "robot",
            jsonURL: ASSETLOADER["spines/robot/Robot_Export.json"],
            atlasURL: ASSETLOADER["spines/robot/Robot_Export.atlas"],
            path: "spines/robot/"
        });
        this.load.spine({
            key: "sikker",
            jsonURL: ASSETLOADER["spines/sikker/Sikker.json"],
            atlasURL: ASSETLOADER["spines/sikker/Sikker.atlas"],
            path: "spines/sikker/"
        });
        this.load.spine({
            key: "son",
            jsonURL: ASSETLOADER["spines/son/Son.json"],
            atlasURL: ASSETLOADER["spines/son/Son.atlas"],
            path: "spines/son/"
        })
    }
    create() {
        PLAT.subscribe("DRRS_ON_APP_RESUME", () => {
            if (AppWake) AppWake()
        });
        PLAT.subscribe("DRRS_ON_APP_PAUSE", () => {
            if (AppSleep) AppSleep()
        });
        PLAT.sendMessage("DRRS_HIDE_LOADING_SCREEN", {});
        this.scene.add("Level2", Level2);
        this.scene.add("Level1", Level1);
        this.scene.add("SLVTest", SLVTest);
        this.scene.add("Hangar", Hangar);
        this.scene.add("Map", Map);
        this.scene.add("PathRiderTest", PathRiderTest);
        this.scene.add("Title", Title);
        this.scene.add("Level3", Level3);
        this.scene.add("Level4", Level4);
        this.scene.add("Level5", Level5);
        this.scene.add("Level6", Level6);
        this.scene.add("Level7", Level7);
        this.scene.add("Level8", Level8);
        this.scene.add("Level9", Level9);
        this.scene.add("Intro", Intro);
        var levels = ["Title", "Hangar", "Map", "Intro", "Level1", "Level2", "Level3", "Level4", "Level5", "Level6", "Level7", "Level8", "Level9"];
        gameManager = new GameManager(this.game, levels);
        var gameState = loadGameState();
        if (gameState == null || gameState == GAMESTATES.INTRO) {
            saveGameState(GAMESTATES.INTRO);
            introCinematic = new IntroCinematic(this);
            introCinematic.initialize(this);
            introCinematic.start()
        } else {
            gameManager.StartNext()
        }
    }
}
