var TEAM_LABEL = new Array();
TEAM_LABEL[0] = 0; //"russia";
TEAM_LABEL[1] = 1; //"japan";
TEAM_LABEL[2] = 2; //"iran";
TEAM_LABEL[3] = 3; //"brazil";
TEAM_LABEL[4] = 4; //"mexico";
TEAM_LABEL[5] = 5; //"usa";
TEAM_LABEL[6] = 6; //"south_korea";
TEAM_LABEL[7] = 7; //"saudi_arabia";
TEAM_LABEL[8] = 8; //"germany";
TEAM_LABEL[9] = 9; //"england";
TEAM_LABEL[10] = 10; //"spain";
TEAM_LABEL[11] = 11; //"nigeria";
TEAM_LABEL[12] = 12; //"costa_rica";
TEAM_LABEL[13] = 13; //"poland";
TEAM_LABEL[14] = 14; //"egypt";
TEAM_LABEL[15] = 15; //"serbia";
TEAM_LABEL[16] = 16; //"canada";
TEAM_LABEL[17] = 17; //"france";
TEAM_LABEL[18] = 18; //"portugal";
TEAM_LABEL[19] = 19; //"uruguay";
TEAM_LABEL[20] = 20; //"argentina";
TEAM_LABEL[21] = 21; //"colombia";
TEAM_LABEL[22] = 22; //"italy";
TEAM_LABEL[23] = 23; //"senegal";
TEAM_LABEL[24] = 24; //"morocco";
TEAM_LABEL[25] = 25; //"tunisia";
TEAM_LABEL[26] = 26; //"switzerland";
TEAM_LABEL[27] = 27; //"croatia";
TEAM_LABEL[28] = 28; //"sweden";
TEAM_LABEL[29] = 29; //"denmark";
TEAM_LABEL[30] = 30; //"australia";
TEAM_LABEL[31] = 31; //"peru";


var NUM_TEAMS = TEAM_LABEL.length;

var TEAM_COLORS = new Array();
TEAM_COLORS[0] = {first_kit:{jersey:1,
                             shorts:3,
                             socks:0,
                             stripes:null,
                             band:null
                             },
                 second_kit:{jersey:0,
                             shorts:4,
                             socks:0,
                             stripes:null,
                             band:null
                             },
                skin:0,
                similar_opponent:[4, 6, 10, 12, 14, 15, 16, 18, 24, 25, 26, 29]};
TEAM_COLORS[1] = {first_kit:{jersey:4,
                             shorts:4,
                             socks:3,
                             stripes:null,
                             band:null
                             },
                 second_kit:{jersey:0,
                             shorts:0,
                             socks:0,
                             stripes:null,
                             band:null
                             },
                skin:0,
                similar_opponent:[17, 22]};
TEAM_COLORS[2] = {first_kit:{jersey:0,
                             shorts:10,
                             socks:0,
                             stripes:null,
                             band:null
                             },
                 second_kit:{jersey:2,
                             shorts:5,
                             socks:2,
                             stripes:null,
                             band:null
                             },
                skin:0,
                similar_opponent:[5, 8, 9, 11, 13, 23, 27, 31]};
TEAM_COLORS[3] = {first_kit:{jersey:5,
                             shorts:1,
                             socks:0,
                             stripes:null,
                             band:null
                             },
                 second_kit:{jersey:6,
                             shorts:0,
                             socks:5,
                             stripes:null,
                             band:null
                             },
                skin:0,
                similar_opponent:[21, 28, 30]};
TEAM_COLORS[4] = {first_kit:{jersey:2,
                             shorts:2,
                             socks:2,
                             stripes:null,
                             band:null
                             },
                 second_kit:{jersey:3,
                             shorts:8,
                             socks:9,
                             stripes:null,
                             band:null
                             },
                skin:0,
                similar_opponent:[0, 6, 10, 12, 14, 15, 16, 18, 24, 25, 26, 29]};
TEAM_COLORS[5] = {first_kit:{jersey:0,
                             shorts:1,
                             socks:0,
                             stripes:null,
                             band:null
                             },
                 second_kit:{jersey:6,
                             shorts:3,
                             socks:1,
                             stripes:null,
                             band:null
                             },
                skin:0,
                similar_opponent:[]};
TEAM_COLORS[6] = {first_kit:{jersey:1,
                             shorts:3,
                             socks:1,
                             stripes:null,
                             band:null
                             },
                 second_kit:{jersey:9,
                             shorts:5,
                             socks:6,
                             stripes:null,
                             band:null
                             },
                skin:0,
                similar_opponent:[0, 4, 10, 12, 14, 15, 16, 18, 24, 25, 26, 29]};
TEAM_COLORS[7] = {first_kit:{jersey:11,
                             shorts:5,
                             socks:10,
                             stripes:null,
                             band:null
                             },
                 second_kit:{jersey:0,
                             shorts:0,
                             socks:10,
                             stripes:null,
                             band:null
                             },
                skin:0,
                similar_opponent:[]};
TEAM_COLORS[8] = {first_kit:{jersey:0,
                             shorts:0,
                             socks:0,
                             stripes:null,
                             band:null
                             },
                 second_kit:{jersey:4,
                             shorts:4,
                             socks:3,
                             stripes:null,
                             band:null
                             },
                skin:0,
                similar_opponent:[]};
TEAM_COLORS[9] = {first_kit:{jersey:0,
                             shorts:4,
                             socks:0,
                             stripes:null,
                             band:null
                             },
                 second_kit:{jersey:4,
                             shorts:4,
                             socks:3,
                             stripes:null,
                             band:null
                             },
                skin:0,
                similar_opponent:[]};
TEAM_COLORS[10] = {first_kit:{jersey:1,
                             shorts:1,
                             socks:1,
                             stripes:null,
                             band:null
                             },
                 second_kit:{jersey:5,
                             shorts:7,
                             socks:4,
                             stripes:null,
                             band:null
                             },
                skin:0,
                similar_opponent:[0, 4, 6, 12, 14, 15, 16, 18, 24, 25, 26, 29]};
TEAM_COLORS[11] = {first_kit:{jersey:0,
                             shorts:0,
                             socks:0,
                             stripes:null,
                             band:null
                             },
                 second_kit:{jersey:11,
                             shorts:5,
                             socks:6,
                             stripes:null,
                             band:null
                             },
                skin:1,
                similar_opponent:[]};
TEAM_COLORS[12] = {first_kit:{jersey:1,
                             shorts:4,
                             socks:1,
                             stripes:null,
                             band:null
                             },
                 second_kit:{jersey:0,
                             shorts:0,
                             socks:0,
                             stripes:null,
                             band:null
                             },
                skin:0,
                similar_opponent:[0, 4, 6, 10, 14, 15, 16, 18, 24, 25, 26, 29]};
TEAM_COLORS[13] = {first_kit:{jersey:0,
                             shorts:3,
                             socks:0,
                             stripes:null,
                             band:null
                             },
                 second_kit:{jersey:1,
                             shorts:3,
                             socks:0,
                             stripes:null,
                             band:null
                             },
                skin:0,
                similar_opponent:[]};
TEAM_COLORS[14] = {first_kit:{jersey:2,
                             shorts:5,
                             socks:6,
                             stripes:null,
                             band:null
                             },
                 second_kit:{jersey:0,
                             shorts:5,
                             socks:0,
                             stripes:null,
                             band:null
                             },
                skin:0,
                similar_opponent:[0, 4, 6, 10, 12, 15, 16, 18, 24, 25, 26, 29]};
TEAM_COLORS[15] = {first_kit:{jersey:8,
                             shorts:1,
                             socks:0,
                             stripes:null,
                             band:null
                             },
                 second_kit:{jersey:0,
                             shorts:0,
                             socks:0,
                             stripes:null,
                             band:null
                             },
                skin:0,
                similar_opponent:[0, 4, 6, 10, 12, 14, 16, 18, 24, 25, 26, 29]};
TEAM_COLORS[16] = {first_kit:{jersey:1,
                             shorts:0,
                             socks:1,
                             stripes:null,
                             band:null
                             },
                 second_kit:{jersey:0,
                             shorts:3,
                             socks:0,
                             stripes:null,
                             band:null
                             },
                skin:0,
                similar_opponent:[0, 4, 6, 10, 12, 14, 15, 18, 24, 25, 26, 29]};
TEAM_COLORS[17] = {first_kit:{jersey:6,
                             shorts:0,
                             socks:1,
                             stripes:null,
                             band:null
                             },
                 second_kit:{jersey:0,
                             shorts:1,
                             socks:0,
                             stripes:null,
                             band:null
                             },
                skin:0,
                similar_opponent:[1, 22]};
TEAM_COLORS[18] ={first_kit:{jersey:1,
                             shorts:10,
                             socks:1,
                             stripes:null,
                             band:null
                             },
                 second_kit:{jersey:0,
                             shorts:5,
                             socks:0,
                             stripes:null,
                             band:null
                             },
                skin:0,
                similar_opponent:[0, 4, 6, 10, 12, 14, 15, 16, 24, 25, 26, 29]};
TEAM_COLORS[19] = {first_kit:{jersey:3,
                             shorts:5,
                             socks:6,
                             stripes:null,
                             band:null
                             },
                 second_kit:{jersey:0,
                             shorts:0,
                             socks:0,
                             stripes:null,
                             band:null
                             },
                skin:0,
                similar_opponent:[]};
TEAM_COLORS[20] = {first_kit:{jersey:3,
                             shorts:0,
                             socks:0,
                             stripes:0,
                             band:null
                             },
                 second_kit:{jersey:6,
                             shorts:1,
                             socks:5,
                             stripes:null,
                             band:null
                             },
                skin:0,
                similar_opponent:[]};
TEAM_COLORS[21] = {first_kit:{jersey:5,
                             shorts:1,
                             socks:0,
                             stripes:null,
                             band:null
                             },
                 second_kit:{jersey:9,
                             shorts:5,
                             socks:6,
                             stripes:null,
                             band:null
                             },
                skin:0,
                similar_opponent:[3, 28, 30]};
TEAM_COLORS[22] = {first_kit:{jersey:6,
                             shorts:0,
                             socks:5,
                             stripes:null,
                             band:null
                             },
                 second_kit:{jersey:0,
                             shorts:1,
                             socks:0,
                             stripes:null,
                             band:null
                             },
                skin:0,
                similar_opponent:[1, 17]};
TEAM_COLORS[23] = {first_kit:{jersey:0,
                             shorts:0,
                             socks:0,
                             stripes:null,
                             band:null
                             },
                 second_kit:{jersey:11,
                             shorts:10,
                             socks:10,
                             stripes:null,
                             band:null
                             },
                skin:1,
                similar_opponent:[]};
TEAM_COLORS[24] = {first_kit:{jersey:1,
                             shorts:0,
                             socks:0,
                             stripes:null,
                             band:null
                             },
                 second_kit:{jersey:0,
                             shorts:10,
                             socks:0,
                             stripes:null,
                             band:null
                             },
                skin:0,
                similar_opponent:[0, 4, 6, 10, 12, 14, 15, 16, 18, 25, 26, 29]};
TEAM_COLORS[25] = {first_kit:{jersey:1,
                             shorts:3,
                             socks:1,
                             stripes:null,
                             band:null
                             },
                 second_kit:{jersey:0,
                             shorts:0,
                             socks:0,
                             stripes:null,
                             band:null
                             },
                skin:0,
                similar_opponent:[0, 4, 6, 10, 12, 14, 15, 16, 18, 24, 26, 29]};
TEAM_COLORS[26] = {first_kit:{jersey:1,
                             shorts:2,
                             socks:1,
                             stripes:null,
                             band:null
                             },
                 second_kit:{jersey:0,
                             shorts:0,
                             socks:0,
                             stripes:null,
                             band:null
                             },
                skin:0,
                similar_opponent:[0, 4, 6, 10, 12, 14, 15, 16, 18, 24, 25, 29]};
TEAM_COLORS[27] = {first_kit:{jersey:0,
                             shorts:0,
                             socks:0,
                             stripes:null,
                             band:0
                             },
                 second_kit:{jersey:6,
                             shorts:1,
                             socks:0,
                             stripes:null,
                             band:null
                             },
                skin:0,
                similar_opponent:[]};
TEAM_COLORS[28] = {first_kit:{jersey:5,
                             shorts:1,
                             socks:5,
                             stripes:null,
                             band:null
                             },
                 second_kit:{jersey:4,
                             shorts:5,
                             socks:6,
                             stripes:null,
                             band:null
                             },
                skin:0,
                similar_opponent:[3, 21, 30]};
TEAM_COLORS[29] = {first_kit:{jersey:1,
                             shorts:0,
                             socks:1,
                             stripes:null,
                             band:null
                             },
                 second_kit:{jersey:0,
                             shorts:3,
                             socks:0,
                             stripes:null,
                             band:null
                             },
                skin:0,
                similar_opponent:[0, 4, 6, 10, 12, 14, 15, 16, 18, 24, 25, 26]};
TEAM_COLORS[30] = {first_kit:{jersey:5,
                             shorts:10,
                             socks:0,
                             stripes:null,
                             band:null
                             },
                 second_kit:{jersey:4,
                             shorts:4,
                             socks:3,
                             stripes:null,
                             band:null
                             },
                skin:0,
                similar_opponent:[3, 21, 28]};
TEAM_COLORS[31] = {first_kit:{jersey:0,
                             shorts:0,
                             socks:0,
                             stripes:null,
                             band:0
                             },
                 second_kit:{jersey:9,
                             shorts:5,
                             socks:6,
                             stripes:null,
                             band:null
                             },
                skin:0,
                similar_opponent:[]};


var EASY_TEAM = [2,6,7,12,14,16,23,24,25,31];
var MEDIUM_TEAM = [0,1,4,5,11,13,15,19,21,26,27,28,29,30];
var HARD_TEAM = [3,8,9,10,17,18,20,22];