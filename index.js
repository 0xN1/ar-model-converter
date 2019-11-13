inquirer = require('inquirer');
shell = require('shelljs');

var mainQuestions = [
    {
        type: 'input',
        name: 'folder',
        message: 'Folder containing the model : '
    },
    {
        type: 'input',
        name: 'objName',
        message: 'Name of the obj file without the .obj extension'
    },
    {
        type: 'list',
        name: 'type',
        message: 'Which one you want to convert to?',
        choices: ['usdz','gltf'],
        default: 0,
    },
    {
        type: 'list',
        name: 'mode',
        message: 'Method for conversion?',
        choices: ['auto','manual'],
    },
    {
        type: 'confirm',
        name: 'autoCheck',
        message: 'Have you prepared all the necessary texture file for auto conversion?',
        when: function(answers){
            return answers.mode == 'auto';
        }
    },
    {
        type: 'confirm',
        name: 'usdzCheck',
        default: true,
        message: 'Have you prepared all the necessary texture file for usdz conversion? Diffuse, Roughness, Metallic, Normal, Emissive',
        when: function(answers){
            if (answers.mode == 'manual'){
                return answers.type == 'usdz';
            }
        }
    },
    {
        type: 'confirm',
        name: 'gltfCheck',
        default: true,
        message: 'Have you prepared all the necessary texture file for gltf conversion? Diffuse, ORM, Normal, Emissive',
        when: function(answers){
            if (answers.mode == 'manual'){
                return answers.type == 'gltf';
            }
            
        }
    },
  ];

  var usdzQuestion = [
    {
        type: 'input',
        name: 'diffuseTex',
        message: 'Diffuse texture : '
    },
    {
        type: 'input',
        name: 'metallicTex',
        message: 'Metallic texture : '
    },
    {
        type: 'input',
        name: 'roughnessTex',
        message: 'Roughness texture : '
    },
    {
        type: 'input',
        name: 'normalTex',
        message: 'Normal texture : '
    },
    {
        type: 'input',
        name: 'emissiveTex',
        message: 'Emissive texture : '
    },
  ];

  var gltfQuestion = [
    {
        type: 'input',
        name: 'diffuseTex',
        message: 'Diffuse texture : '
    },
    {
        type: 'input',
        name: 'ormTex',
        message: 'ORM texture : '
    },
    {
        type: 'input',
        name: 'normalTex',
        message: 'Normal texture : '
    },
    {
        type: 'input',
        name: 'emissiveTex',
        message: 'Emissive texture : '
    },
  ];


  function start(){
    inquirer.prompt(mainQuestions).then(answers => {

        folder = answers.folder.trim();
        loc = answers.folder.trim() + '/' + answers.objName;
        obj = loc + '.obj';
        usdz = loc + '.usdz';
        gltf = loc + '.gltf';
        modelLoc = {obj,usdz,gltf};

        usdzTexture = {
            diffuse: './Diffuse.png',
            metallic: './Metallic.png',
            roughness: './Roughness.png',
            normal: './Normal.png',
            emissive: './Emissive.png',
        };

        gltfTexture = {
            diffuse: './Diffuse.png',
            orm: './ORM.png',
            normal: './Normal.png',
            emissive: './Emissive.png',
        };

        if (answers.mode == 'auto'){
            // Auto conversion here.
            if(answers.autoCheck){
                if (answers.type == 'usdz'){
                    console.log('Do auto usdz conversion stuff here.');

                    return shell.exec('/usr/bin/xcrun usdz_converter ' 
                    + modelLoc.obj + ' ' + modelLoc.usdz 
                    + ' -color_map ' + usdzTexture.diffuse.trim()
                    + ' -roughness_map ' + usdzTexture.roughness.trim()
                    + ' -metallic_map ' + usdzTexture.metallic.trim()
                    + ' -normal_map ' + usdzTexture.normal.trim()
                    + ' -emissive_map ' + usdzTexture.emissive.trim()
                    );

                }
                if (answers.type == 'gltf'){
                    console.log('Do auto gltf conversion stuff here.');
                    
                    return shell.exec('/usr/local/bin/obj2gltf ' 
                    + '-i' + modelLoc.obj + ' -o ' + modelLoc.gltf 
                    + ' --baseColorTexture ' + folder + '/' + gltfTexture.diffuse.trim()
                    + ' --metallicRoughnessOcclusionTexture ' + folder + '/' +  gltfTexture.orm.trim()
                    + ' --normalTexture ' + folder + '/' +  gltfTexture.normal.trim()
                    + ' --emissiveTexture ' + folder + '/' +  gltfTexture.emissive.trim()
                    );
                }
            }
            else {
                console.log('\n\n\n          You are not ready..young man\n\n\n');
            }
        }

        if (answers.mode == 'manual'){
            // Manual conversion here.

            if (!answers.usdzCheck && !answers.gltfCheck){
                console.log('\n\n\n          You are not ready..young man\n\n\n');
            }

            if (answers.usdzCheck){
                console.log('usdz can convert');
            }

            if (answers.gltfCheck){
                console.log('gltf can convert');
            }

            if ((answers.type == 'usdz') && answers.usdzCheck){
                inquirer.prompt(usdzQuestion).then(answers => {
                    console.log('Do usdz conversion');
                    console.log(JSON.stringify(answers, null, '  '));

                    usdzTexture.diffuse = answers.diffuseTex;
                    usdzTexture.roughness = answers.roughnessTex;
                    usdzTexture.metallic = answers.metallicTex;
                    usdzTexture.normal = answers.normalTex;
                    usdzTexture.emissive = answers.emissiveTex;

                    return shell.exec('/usr/bin/xcrun usdz_converter ' 
                    + modelLoc.obj + ' ' + modelLoc.usdz 
                    + ' -color_map ' + usdzTexture.diffuse.trim()
                    + ' -roughness_map ' + usdzTexture.roughness.trim()
                    + ' -metallic_map ' + usdzTexture.metallic.trim()
                    + ' -normal_map ' + usdzTexture.normal.trim()
                    + ' -emissive_map ' + usdzTexture.emissive.trim()
                    );

                });
            }

            if ((answers.type == 'gltf') && answers.gltfCheck){
                inquirer.prompt(gltfQuestion).then(answers => {
                    console.log('Do gltf conversion');
                    console.log(JSON.stringify(answers, null, '  '));

                    gltfTexture.diffuse = answers.diffuseTex;
                    gltfTexture.orm = answers.ormTex;
                    gltfTexture.normal = answers.normalTex;
                    gltfTexture.emissive = answers.emissiveTex;

                    return shell.exec('/usr/local/bin/obj2gltf ' 
                    + '-i' + modelLoc.obj + ' -o ' + modelLoc.gltf 
                    + ' --baseColorTexture ' + gltfTexture.diffuse.trim()
                    + ' --metallicRoughnessOcclusionTexture ' + gltfTexture.orm.trim()
                    + ' --normalTexture ' + gltfTexture.normal.trim()
                    + ' --emissiveTexture ' +  gltfTexture.emissive.trim()
                    );

                });
            }
            
        }
        
        // console.log(JSON.stringify(answers, null, '  '));
        
        // console.log(JSON.stringify(modelLoc, null, '  '));
    });
  }

  start();