/**
 * @ContributorsList
 * @Inateno / http://inateno.com / http://dreamirl.com
 *
 * this is the achievements list sample that will be loaded by the project
 * Please declare in the same way than this example.
 */

const achievements = [
  {
    "namespace"    : "survivor",
    "names"        : { "fr": "Survivant", "en": "Survivor" },
    "descriptions" : { "fr": "Atteindre 10 000 pts", "en": "Reach 10 000 pts" },
    "objectives"   : { "point": { "target": 10000, "type": "increment" } },
    "reward"       : [],
    "order"        : 0
  },
  {
    "namespace"    : "goldReject",
    "names"        : { "fr": "tu n'aimes pas l'argent ?", "en": "Dont You like gold ?" },
    "descriptions" : { "fr": "Atteindre 10 000 pts sans prendre un seul coffre", "en": "Reach 10 000 pts without any chest" },
    "objectives"   : { "point_no_chest": { "target": 10000, "type": "increment" } },
    "reward"       : [],
    "order"        : 0
  },
  {
    "namespace"    : "baby",
    "names"        : { "fr": "bébé", "en": "baby" },
    "descriptions" : { "fr": "Atteindre un total de 5000 pts", "en": "Reach a total of 5000 pts" },
    "objectives"   : { "point_total_beginer": { "target": 5000, "type": "increment" } },
    "reward"       : [],
    "order"        : 0
  },
  {
    "namespace"    : "traveler",
    "names"        : { "fr": "Voyageur", "en": "Traveller" },
    "descriptions" : { "fr": "Atteindre un total de 100 000 pts", "en": "Reach a total of 100 000 pts" },
    "objectives"   : { "point_total": { "target": 100000, "type": "increment" } },
    "reward"       : [],
    "order"        : 0
  } 
];

export default achievements;
