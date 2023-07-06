/**
 * @ContributorsList
 * @Liro_u / http://dreamirl.com
 *
 * this is the audios list sample that will be loaded by the project
 * Please declare in the same way than this example.
 * To automatically preload a file just set "preload" to true.
 */
const audios = [
  [ "boss_music", "audio/boss_music", [ 'wav' ], { "preload": true, "loop": true, "pool": 10} ],
  // FX
  [ "effort_1", "audio/effort_1", [ 'wav' ], { "preload": true, "loop": false, "pool": 10} ],
  
  [ "death", "audio/death", [ 'wav' ], { "preload": true, "loop": false, "pool": 10} ],
  [ "revive", "audio/revive", [ 'wav' ], { "preload": true, "loop": false, "pool": 10} ],

  [ "armor_1", "audio/armor_1", [ 'wav' ], { "preload": true, "loop": false, "pool": 10 } ],
  [ "armor_2", "audio/armor_2", [ 'wav' ], { "preload": true, "loop": false, "pool": 10 } ],
  [ "armor_3", "audio/armor_3", [ 'wav' ], { "preload": true, "loop": false, "pool": 10 } ],
  [ "armor_4", "audio/armor_4", [ 'wav' ], { "preload": true, "loop": false, "pool": 10 } ],
];

export default audios;
