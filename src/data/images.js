/**
 * @ContributorsList
 * @Inateno / http://inateno.com / http://dreamirl.com
 *
 * this is the images file sample that will be loaded by the project in the ResourcesManager module
 * it can also load .json files (for sheets and particles)
 * Please declare in the same way than this example.
 * To load image as default just set "load" to true.
 *
 * Otherwise you can load/add images when you want, load images by calling the DREAM_ENGINE.ImageManager.pushImage function
 *
 * - [ name, url, { load:Bool, totalFrame:Int, totalLine:Int, interval:Int (ms), animated:Bool, isReversed:Bool } ]
 *
 * name, and url are required
 */
const images = {
  // images folder name 
  baseUrl: "imgs/",
  
  // usage name, real name (can contain subpath), extension, parameters
  pools: {
    // loaded when engine is inited
    default: [
      // [ "example", "example", "png", { "totalFrame": 4, "totalLine": 2, "interval": 50, "animated":true, "isReversed": false } ]
      // [ "ship", "ayera/ship.png", { "totalFrame": 10, "totalLine": 1, "interval": 100, "animated":true, "isReversed": false } ]
      [ "hero_idle", "hero/_Idle.png", { "totalFrame": 10, "totalLine": 1, "interval": 50, "animated": true, "loop": false} ],      
      [ "hero_roll", "hero/_Roll.png", { "totalFrame": 12, "totalLine": 1, "interval": 50, "animated": true, "loop": false} ],      
      [ "hero_death", "hero/_DeathNoMovement.png", { "totalFrame": 10, "totalLine": 1, "interval": 50, "animated": true, "loop": false} ],      
      
      [ "projectil_1", "projectil/1.png", { "totalFrame": 61, "totalLine": 1, "interval": 10, "animated": true, "loop": true} ],      
      [ "projectil_2", "projectil/2.png", { "totalFrame": 61, "totalLine": 1, "interval": 10, "animated": true, "loop": true} ],      
      [ "projectil_3", "projectil/3.png", { "totalFrame": 61, "totalLine": 1, "interval": 10, "animated": true, "loop": true} ],   

      [ "chest", "chest/Chests.png", { "totalFrame": 5, "totalLine": 8, "interval": 50, "animated": true, "loop": true} ],      
      [ "shield", "shield/Icon18.png", { "totalFrame": 1, "totalLine": 1, "animated": false} ],      
      [ "semi_shield", "shield_spell/semi_shield.png", { "totalFrame": 5, "totalLine": 3, "animated": true, "loop": true} ],      
      [ "complete_shield", "shield_spell/complete_shield.png", { "totalFrame": 5, "totalLine": 3, "animated": true, "loop": true} ],      

      [ "bg", "env/bg.jpg", { "totalFrame": 1, "animated":false, "isReversed": false } ],
      [ "background_0", "env/background_0.png", { "totalFrame": 1, "animated":false, "isReversed": false } ],
      [ "background_1", "env/background_1.png", { "totalFrame": 1, "animated":false, "isReversed": false } ],
      [ "background_2", "env/background_2.png", { "totalFrame": 1, "animated":false, "isReversed": false } ],
      [ "map", "env/map.png", { "totalFrame": 1, "animated":false, "isReversed": false } ],
      
      [ "touchControlBackground", "touch-control/background.png", { "totalFrame": 1, "animated": false } ],
      [ "touchControlStick", "touch-control/stick.png", { "totalFrame": 1, "animated": false } ],
    ],
    
    // a custom pool not loaded by default, you have to load it whenever you want (you can display a custom loader or just the default loader)
    aCustomPool: [
      // resources
    ]
  }
};

export default images;
