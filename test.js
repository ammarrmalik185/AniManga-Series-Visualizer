const fs = require('fs');
let absPath = "E:\\Web Projects\\AniManga Series Visualizer\\api resonse season.json"
let relativePath = "/api resonse season.json"
fs.readFile(absPath, function (error, jsonString) {
    let data = JSON.parse(jsonString);
    console.log((data.anime.filter(anime => anime.type === "TV")).length);
});