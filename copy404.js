import * as fs from 'fs';


fs.copyFileSync("dist/index.html", "dist/404.html");
fs.copyFileSync("CNAME", "dist/CNAME");