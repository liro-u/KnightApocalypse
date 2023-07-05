/**
 * @ContributorsList
 * @Inateno / http://inateno.com / http://dreamirl.com
 *
 * this is the audios list sample that will be loaded by the project
 * Please declare in the same way than this example.
 * To automatically preload a file just set "preload" to true.
 */
const audios = [
  // MUSICS
  /*[ "test_music", "audio/test_music", [ 'mp3' ], { "preload": true, "loop": true, "isMusic": true } ],
  [
    "test_sprite_music", "audio/test_music", [ 'mp3' ], {
    "preload": true, "loop": true, "isMusic": true,
    "sprite": {
      first: [ 0, 5000 ]
      ,second: [ 10000, 20000 ]
    } }
  ],*/

  [ "boss_music", "audio/boss_music", [ 'wav' ], { "preload": true, "loop": true, "pool": 10} ],
  // FX
  [ "piew", "audio/piew", [ 'mp3' ], { "preload": true, "loop": false, "pool": 10 } ],

  [ "effort_1", "audio/effort_1", [ 'wav' ], { "preload": true, "loop": false, "pool": 10} ],
  
  [ "death", "audio/death", [ 'wav' ], { "preload": true, "loop": false, "pool": 10} ],
  [ "revive", "audio/revive", [ 'wav' ], { "preload": true, "loop": false, "pool": 10} ],

  [ "armor_1", "audio/armor_1", [ 'wav' ], { "preload": true, "loop": false, "pool": 10 } ],
  [ "armor_2", "audio/armor_2", [ 'wav' ], { "preload": true, "loop": false, "pool": 10 } ],
  [ "armor_3", "audio/armor_3", [ 'wav' ], { "preload": true, "loop": false, "pool": 10 } ],
  [ "armor_4", "audio/armor_4", [ 'wav' ], { "preload": true, "loop": false, "pool": 10 } ],
];

export default audios;
