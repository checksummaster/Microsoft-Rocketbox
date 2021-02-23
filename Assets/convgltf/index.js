const convert = require('fbx2gltf');
const fs = require('fs');
const tga2png = require('tga2png');

var options = [
    '--verbose',
    //'--binary',
    //'--embed'
]



async function make(type,input) 
{
    var texturefolder = `../Avatars/${type}/${input}/Textures`;
    var filefolder = `../Avatars/${type}/${input}/Export`;

    var texture = fs.readdirSync(texturefolder);
    var deletelist = [];
    for (var i of texture) {
        console.log('converting',`${texturefolder}/${i}`)
        await tga2png(`${texturefolder}/${i}`,`${filefolder}/${i.replace('.tga','')}.png`)
        deletelist.push(`${filefolder}/${i.replace('.tga','')}.png`)
    }
    await convert(`${filefolder}/${input}.fbx`, `../Avatars/gltf/${input}.gltf`,options)
    for (var i of deletelist) {
        fs.unlinkSync(i);
    }
    
}

async function doall()
{
    if (!fs.existsSync('../Avatars/gltf')) fs.mkdirSync('../Avatars/gltf')
    var type = fs.readdirSync(`../Avatars`)

    for (t of type) {
        var model = fs.readdirSync(`../Avatars/${t}`)
        for (m of model) {
            await make(t,m)
        }
    }
}

doall();
