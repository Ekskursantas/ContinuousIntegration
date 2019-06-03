(function() {
    var allAssets = {};
    /*START*/
allAssets['spines/robot/Robot_Export.json']='text';allAssets['spines/robot/Robot_Export.atlas']='text';allAssets['spines/sikker/Sikker.json']='text';allAssets['spines/sikker/Sikker.atlas']='text';allAssets['spines/son/Son.json']='text';allAssets['spines/son/Son.atlas']='text';allAssets['spines/robot/Robot_Export.png']='blob';allAssets['spines/sikker/Sikker.png']='blob';allAssets['spines/son/Son.png']='blob';allAssets['atlas/allSpritesAtlas1.png']='blob';allAssets['atlas/allSpritesAtlas2.png']='blob';allAssets['atlas/allSpritesAtlas3.png']='blob';allAssets['atlas/allSpritesAtlas.json']='text';allAssets['audio/audioSprites/allSounds.mp3']='arraybuffer';allAssets['audio/audioSprites/allSounds.json']='text';allAssets['atlas/animations.json']='text';allAssets['atlas/backgroundImages/Hangar_BG.jpg']='blob';allAssets['atlas/backgroundImages/Hangar_Map.jpg']='blob';allAssets['atlas/backgroundImages/Map3.jpg']='blob';allAssets['atlas/backgroundImages/Map4.jpg']='blob';allAssets['atlas/backgroundImages/Map5.jpg']='blob';allAssets['atlas/backgroundImages/Map6.jpg']='blob';allAssets['atlas/backgroundImages/Map7.jpg']='blob';allAssets['atlas/backgroundImages/Map8.jpg']='blob';allAssets['atlas/backgroundImages/Map9.jpg']='blob';allAssets['atlas/backgroundImages/Map1.jpg']='blob';allAssets['atlas/backgroundImages/Map2.jpg']='blob';allAssets['atlas/backgroundImages/Intromap.jpg']='blob';allAssets['audio/audioSprites/allTalk.mp3']='arraybuffer';allAssets['audio/audioSprites/allTalk.json']='text';
    
    function main(platform, element, resolve)
    {
        resolve();
        platform.assets.getBundle(allAssets, { from: 0, to: 100 })
        .then(function (assets) {
           start(assets, platform);
       });



    }
    return main;
})();