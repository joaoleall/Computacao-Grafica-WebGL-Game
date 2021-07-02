var camera, cameraOrtografica, mesh, renderer, mixerAnimacao,meshfloor;
var crateTexture, crateNormalMap, crateBumpMap;
var grass, grassTexture;
var keyboard = {};
var car = {height:3.5, speed: 0.1};
var scene = new THREE.Scene();
var coin, coinTexture;
var cam = 0;
var cam1 = 0;
var pScore = 0;
var textureLoader = new THREE.TextureLoader(loadingManager);
var listener = new THREE.AudioListener();
var efeito = new THREE.Audio(listener);

var audioListen = new THREE.AudioLoader();
audioListen.load( 'music/coin.wav', function( buffer ) {
efeito.setBuffer( buffer );
efeito.setLoop( false );
efeito.setVolume( 0.5 );
});

var loadingScreen = {
	scene: new THREE.Scene(),
	camera: new THREE.PerspectiveCamera(90, 1280/720, 0.1, 100),
	box: new THREE.Mesh(
		new THREE.BoxGeometry(0.5,0.5,0.5),
		new THREE.MeshBasicMaterial({ color:0x4444ff })
	)
};
var loadingManager = null;
var RESOURCES_LOADED = false;
var models = {
    roadStart:
    {
        obj:"Models/roadStart.obj",
        mtl:"Models/roadStart.mtl",
        mesh: null
    },
    roadStraight:
    {
        obj:"Models/roadStraight.obj",
        mtl:"Models/roadStraight.mtl",
        mesh: null
    },
    pitEntry:
    {
        obj:"Models/roadPitEntry.obj",
        mtl:"Models/roadPitEntry.mtl",
        mesh: null
    },
    roadCorner:
    {
        obj:"Models/roadCornerSmall.obj",
        mtl:"Models/roadCornerSmall.mtl",
        mesh: null
    },
    pitStraight:
    {
        obj:"Models/roadPitStraight.obj",
        mtl:"Models/roadPitStraight.mtl",
        mesh: null
    },
    roadSplitS:
    {
        obj:"Models/roadSplitSmall.obj",
        mtl:"Models/roadSplitSmall.mtl",
        mesh: null
    },
    roadSplitL:
    {
        obj:"Models/roadSplitLarge.obj",
        mtl:"Models/roadSplitLarge.mtl",
        mesh: null
    },
    carGaragem:
    {
        obj:"Models/raceFuture.obj",
        mtl:"Models/raceFuture.mtl",
        mesh: null
    }


};

var meshes = {};

var objetoImportado;

var clock = new THREE.Clock();

var importer = new THREE.FBXLoader();


importer.load("Objetos/Macarena Dance.fbx", function (object) {

  mixerAnimacao = new THREE.AnimationMixer(object);

  var action = mixerAnimacao.clipAction(object.animations[0]);
  action.play();

  object.traverse(function (child) {
    if (child.isMesh) {
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });

  scene.add(object);

  object.scale.x = 0.01;
  object.scale.z = 0.01;
  object.scale.y = 0.01;
  object.rotateY(3*Math.PI/2);

  object.position.set(6.5,0.2,-2);

  objetoImportado = object;

});

//-------------------------------Objetos Complexos-----------------------------------------------------

function createWater(){

    var textureLoader = new THREE.TextureLoader();
    watertexture = textureLoader.load("Texturas/water.jpg");

	water = new THREE.Mesh(
		new THREE.PlaneGeometry(50,50,10,10),
        	new THREE.MeshPhongMaterial({map:watertexture})
	);

	water.castShadow = true;
	water.receiveShadow = true;
	water.rotateX(-Math.PI/2);
    	water.position.y = 0.2;
	return water;
}

function createCar(){
    var carro = new THREE.Group();
    var textureLoader = new THREE.TextureLoader();
    cartexture = textureLoader.load("Texturas/carTexture.jpg");
    cartextureSpoiler = textureLoader.load("Texturas/blacktexture.jpg");
     //rodas carro
    var roda = new THREE.Mesh( //mesh é um objeto na casena, tem geometria (vertices, normals) e material (cor textura e brilho), tambem tem posicao e rotacao
        new THREE.TorusGeometry( 8, 4, 16, 100 ),
        new THREE.MeshBasicMaterial( { color: 0x000000 } ),
        );
    roda.receiveShadow = true;
    roda.castShadow = true;
    roda.position.y += 3;
    roda.position.z = 2;
    roda.position.x = -2;
    roda.scale.set(0.125,0.125,0.125);
    carro.add(roda);
 
     roda2 = new THREE.Mesh( //mesh é um objeto na casena, tem geometria (vertices, normals) e material (cor textura e brilho), tambem tem posicao e rotacao
     new THREE.TorusGeometry( 8, 4, 16, 100 ),
     new THREE.MeshBasicMaterial( { color: 0x000000 } ),
     );
     roda2.receiveShadow = true;
     roda2.castShadow = true;
     roda2.position.y += 3;
     roda2.position.z = -2;
     roda2.position.x = -2;
     roda2.scale.set(0.125,0.125,0.125);
     carro.add(roda2);
 
     roda3 = new THREE.Mesh( //mesh é um objeto na casena, tem geometria (vertices, normals) e material (cor textura e brilho), tambem tem posicao e rotacao
     new THREE.TorusGeometry( 8, 4, 16, 100 ),
     new THREE.MeshBasicMaterial( { color: 0x000000 } ),
     );
     roda3.receiveShadow = true;
     roda3.castShadow = true;
     roda3.position.y += 3;
     roda3.position.z = 2;
     roda3.position.x = 3;
     roda3.scale.set(0.125,0.125,0.125);
     carro.add(roda3);
 
     roda4 = new THREE.Mesh( //mesh é um objeto na casena, tem geometria (vertices, normals) e material (cor textura e brilho), tambem tem posicao e rotacao
     new THREE.TorusGeometry( 8, 4, 16, 100 ),
     new THREE.MeshBasicMaterial( { color: 0x000000 } ),
     );
     roda4.receiveShadow = true;
     roda4.castShadow = true;
     roda4.position.y += 3;
     roda4.position.z = -2;
     roda4.position.x = 3;
     roda4.scale.set(0.125,0.125,0.125);
     carro.add(roda4);
 
     //jantes 
     //atrás direita
     jante1 = new THREE.Mesh(
         new THREE.CircleGeometry(5,32),
         new THREE.MeshBasicMaterial({color: 0xff0000}),
     );
     jante1.receiveShadow = true;
     jante1.castShadow = true;
     jante1.position.y += 3;
     jante1.position.z = 2.2;
     jante1.position.x = -2;
     jante1.scale.set(0.175,0.175,0.175);
     carro.add(jante1);
 
     //atrás esquerda
     jante2 = new THREE.Mesh(
         new THREE.CircleGeometry(5,32),
         new THREE.MeshBasicMaterial({color: 0xff0000}),
     );
     jante2.receiveShadow = true;
     jante2.castShadow = true;
     jante2.position.y += 3;
     jante2.position.z = -2.2;
     jante2.position.x = -2;
     jante2.rotation.x =  Math.PI;
     jante2.scale.set(0.175,0.175,0.175);
     carro.add(jante2);
     
     //frente direita
     jante3 = new THREE.Mesh(
         new THREE.CircleGeometry(5,32),
         new THREE.MeshBasicMaterial({color: 0xff0000}),
     );
     jante3.receiveShadow = true;
     jante3.castShadow = true;
     jante3.position.y += 3;
     jante3.position.z = 2.2;
     jante3.position.x = 3;
     jante3.scale.set(0.175,0.175,0.175);
     carro.add(jante3);
     //frente esquerda

     jante4 = new THREE.Mesh(
         new THREE.CircleGeometry(5,32),
         new THREE.MeshBasicMaterial({color: 0xff0000}),
     );
     jante4.receiveShadow = true;
     jante4.castShadow = true;
     jante4.position.y += 3;
     jante4.position.z = -2.2;
     jante4.position.x = 3;
     jante4.rotation.x =  Math.PI;
     jante4.scale.set(0.175,0.175,0.175);
     carro.add(jante4);
     
     //spoiler
     spoilercano = new THREE.Mesh(
         new THREE.BoxGeometry(1.2,0.2,0.2),
         new THREE.MeshBasicMaterial({map:cartextureSpoiler}),
     );
     spoilercano.receiveShadow = true;
     spoilercano.castShadow = true;
     spoilercano.position.y = 7;
     spoilercano.position.x = -3;
     spoilercano.position.z = -1.8;
     spoilercano.rotation.z = Math.PI / 2;
     carro.add(spoilercano);
 
     spoilercano2 = new THREE.Mesh(
         new THREE.BoxGeometry(1.2,0.2,0.2),
         new THREE.MeshBasicMaterial({map:cartextureSpoiler}),
     );
     spoilercano2.receiveShadow = true;
     spoilercano2.castShadow = true;
     spoilercano2.position.y = 7;
     spoilercano2.position.x = -3;
     spoilercano2.position.z = 1.8;
     spoilercano2.rotation.z = Math.PI / 2;
     carro.add(spoilercano2);
 
     spoilercanocima = new THREE.Mesh(
         new THREE.BoxGeometry(5,0.5,2),
         new THREE.MeshBasicMaterial({map:cartextureSpoiler}),
     );
     spoilercanocima.receiveShadow = true;
     spoilercanocima.castShadow = true;
     spoilercanocima.position.y = 7.5;
     spoilercanocima.position.x = -3.5;
     spoilercanocima.position.z = 0;
     spoilercanocima.rotation.y = Math.PI / 2;
     carro.add(spoilercanocima);
 
     //corpo carro
     var geom = new THREE.Geometry();
     var corpocarro_Main = new THREE.Mesh(new THREE.CubeGeometry(8,3.5,4),
                                         new THREE.MeshLambertMaterial({map:cartexture}));
     corpocarro_Main.updateMatrix();
     geom.merge(corpocarro_Main.geometry, corpocarro_Main.matrix);
     corpocarro_Main.castShadow = true;
     corpocarro_Main.receiveShadow = true;
 
     //corpo carro frente
     var corpocarro_frente = new THREE.Mesh(new THREE.CubeGeometry(4,2,4),
                                         new THREE.MeshLambertMaterial({map:cartexture}));
     corpocarro_frente.position.x = 4;
     corpocarro_frente.position.y = -0.5;
     corpocarro_frente.castShadow = true;
     corpocarro_frente.receiveShadow = true;
     corpocarro_frente.updateMatrix();
     carro.add(corpocarro_frente);
    
     corpocarro_Main.position.y = 5;
     
     carro.add(corpocarro_Main);
     corpocarro_frente.position.y = 4.3;
     carro.add(corpocarro_frente);
 
     //coracaoatras
     const x = 0, y = 0;
 
     const heartShape = new THREE.Shape();
 
     heartShape.moveTo( x + 5, y + 5 );
     heartShape.bezierCurveTo( x + 5, y + 5, x + 4, y, x, y );
     heartShape.bezierCurveTo( x - 6, y, x - 6, y + 7,x - 6, y + 7 );
     heartShape.bezierCurveTo( x - 6, y + 11, x - 3, y + 15.4, x + 5, y + 19 );
     heartShape.bezierCurveTo( x + 12, y + 15.4, x + 16, y + 11, x + 16, y + 7 );
     heartShape.bezierCurveTo( x + 16, y + 7, x + 16, y, x + 10, y );
     heartShape.bezierCurveTo( x + 7, y, x + 5, y + 5, x + 5, y + 5 );
 
     const geometryheart = new THREE.ShapeGeometry( heartShape );
     const materialheart = new THREE.MeshBasicMaterial( { color: 0x8B0000 } );
     const meshheart = new THREE.Mesh( geometryheart, materialheart ) ;
     meshheart.scale.set(0.125,0.125,0.125);
     meshheart.rotation.z = Math.PI ;
     meshheart.rotation.y = 3* Math.PI/2 ;
     meshheart.position.y = 6.5;
     meshheart.position.z = 0.65;
     meshheart.position.x = -4.05;
 
     carro.add( meshheart );
    
    //vidros
    vidrofrente = new THREE.Mesh(
         new THREE.BoxGeometry(4,0.1,1.5),
         new THREE.MeshPhongMaterial({color:0x000000})
    );
    vidrofrente.receiveShadow = true;
    vidrofrente.position.y = 6;
    vidrofrente.position.x = 4;
    vidrofrente.position.z = 0;
    vidrofrente.rotation.x = Math.PI/2;
    vidrofrente.rotation.z = Math.PI/2;
    carro.add(vidrofrente);
    carro.castShadow = true;
    carro.receiveShadow = true;
    return carro;
}

function createSemaforo(){
    var semaforo = new THREE.Group();

    var poste = new THREE.Mesh(
        new THREE.CylinderGeometry(0.5,0.5,10),
        new THREE.MeshPhongMaterial({color: 0xffffff})
    )
    var bolaVermelha = new THREE.Mesh(
        new THREE.SphereGeometry(0.4,10,10),
        new THREE.MeshPhongMaterial({color: 0x8B0000})
    )

    var bolaAmarela = new THREE.Mesh(
        new THREE.SphereGeometry(0.4,10,10),
        new THREE.MeshPhongMaterial({color: 0xFFFF00})
    )

    var bolaVerde = new THREE.Mesh(
        new THREE.SphereGeometry(0.4,10,10),
        new THREE.MeshPhongMaterial({color: 0x00FF00})
    )
    bolaVermelha.position.set(0,4.5,-0.3);
    bolaVerde.position.set(0,3.0,-0.3);
    bolaAmarela.position.set(0,3.75,-0.3);
    semaforo.add(poste);
    semaforo.add(bolaVerde);
    semaforo.add(bolaVermelha);
    semaforo.add(bolaAmarela);
    return semaforo;

}
function createCoin(){
     coinTexture = textureLoader.load("Texturas/ouro.jpg");
     var coin = new THREE.Mesh(
        new THREE.SphereGeometry(5,8,6),
        new THREE.MeshPhongMaterial({map:coinTexture})
    );
    coin.scale.set(0.1,0.1,0.1);
    return coin;
}

function createGarage(){
    var garagem = new THREE.Group();

    var teto = new THREE.Mesh(
        new THREE.BoxGeometry(2,20,10),
        new THREE.MeshPhongMaterial({color: 0xA3AEA6})
    )
    teto.rotation.z += Math.PI/2;//y pi/2 fica no alto
    
    var colunaesq = new THREE.Mesh(
        new THREE.BoxGeometry(2,10,20),
        new THREE.MeshPhongMaterial({color: 0xA3AEA6})
    )
    colunaesq.rotation.y += Math.PI/2;

    var colunadir = new THREE.Mesh(
        new THREE.BoxGeometry(2,10,20),
        new THREE.MeshPhongMaterial({color: 0xA3AEA6})
    )
    colunadir.rotation.y += Math.PI/2;

    var costas = new THREE.Mesh(
        new THREE.BoxGeometry(2,8,6.5),
        new THREE.MeshPhongMaterial({color: 0xA3AEA6})
    )
    
    costas.castShadow = true;
    costas.receiveShadow = true;
    colunadir.castShadow = true;
    colunadir.receiveShadow = true;
    colunaesq.castShadow = true;
    colunaesq.receiveShadow = true;
    teto.castShadow = true;
    teto.receiveShadow = true;

    costas.position.set(29,0.2,0);
    teto.position.set(20,5,0.0);
    colunaesq.position.set(20,0.1,-4.0);
    colunadir.position.set(20,0.1,4.0);
    garagem.add(colunaesq);
    garagem.add(colunadir);
    garagem.add(costas);
    garagem.add(teto);
    garagem.castShadow = true;
    garagem.receiveShadow = true;
    return garagem;
}

function createTree(){
    var arvore = new THREE.Group();
    troncoTexture = textureLoader.load("Texturas/tree.jpg");
    var tronco = new THREE.Mesh(
        new THREE.CylinderGeometry(0.5,1.0,10),
        new THREE.MeshPhongMaterial({map:troncoTexture})
    );
    folhasTexture = textureLoader.load("Texturas/folhas.jpg");
    var folhas = new THREE.Mesh(
        new THREE.ConeGeometry(3,5.5,0),
        new THREE.MeshBasicMaterial({map:folhasTexture})
    )
    folhas.position.set(0,5,0);

    folhas.castShadow = true;
    folhas.receiveShadow = true;
    tronco.castShadow = true;
    tronco.receiveShadow = true;

    arvore.add(tronco);
    arvore.add(folhas);
    return arvore;
}

grassTexture = textureLoader.load("Texturas/grass.png");
grass = new THREE.Mesh(
    new THREE.PlaneGeometry(5,5,10,10),
    new THREE.MeshPhongMaterial({map:grassTexture})
);
//---------------------------------Fim dos Objetos Complexos------------------------------------------

function start(){
    novaGaragem = createGarage();
    scene.add(novaGaragem);
    novaGaragem1 = createGarage();
    novaGaragem1.position.set(0,0.2,-15);
    scene.add(novaGaragem1);
    novaGaragem2 = createGarage();
    novaGaragem2.position.set(0,0.2,15);
    scene.add(novaGaragem2);
    novaGaragem3 = createGarage();
    novaGaragem3.position.set(0,0.2,30);
    scene.add(novaGaragem3);
    novaGaragem4 = createGarage();
    novaGaragem4.position.set(0,0.2,30);
    scene.add(novaGaragem4);
    novoCoin = createCoin();
    novoCoin.position.set(-5,1.0,-45);
    scene.add(novoCoin);
    novoCoin1 = createCoin();
    novoCoin1.position.set(-5,1.0,45);
    scene.add(novoCoin1);
    novoCoin2 = createCoin();
    novoCoin2.position.set(-5,1.0,90);
    scene.add(novoCoin2);
    novoCoin3 = createCoin();
    novoCoin3.position.set(105,1.0,-45);
    scene.add(novoCoin3);
    novoCoin4 = createCoin();
    novoCoin4.position.set(105,1.0,45);
    scene.add(novoCoin4);
    novoCoin5 = createCoin();
    novoCoin5.position.set(105,1.0,90);
    scene.add(novoCoin5);
    novoCoin6 = createCoin();
    novoCoin6.position.set(105,1.0,-105);
    scene.add(novoCoin6);
    novoCoin7 = createCoin();
    novoCoin7.position.set(75,1.0,-105);
    scene.add(novoCoin7);
    novoCoin8 = createCoin();
    novoCoin8.position.set(35,1.0,-105);
    scene.add(novoCoin8);
    novoCoin9 = createCoin();
    novoCoin9.position.set(35,1.0,100);
    scene.add(novoCoin9);
    novoCoin10 = createCoin();
    novoCoin10.position.set(75,1.0,100);
    scene.add(novoCoin10);
    novoCoin11 = createCoin();
    novoCoin11.position.set(105,1.0,100);
    scene.add(novoCoin11);
    novoCarro = createCar();
    novoCarro.position.set(-5,-0.7,-10);
    novoCarro.rotation.y += 3*Math.PI/2;
    novoCarro.scale.set(0.5,0.5,0.5);
    
    novoSemaforo = createSemaforo();
    novoSemaforo.position.set(-9.7,0.2,17.5)
    scene.add(novoSemaforo);

    for(i=-110;i<=100 ;i+=10){
        novaArvore = createTree();
        novaArvore.position.set(-15,0.2,i);
        scene.add(novaArvore);
    }

    for(i=-110;i<=100 ;i+=10){
        novaArvore = createTree();
        novaArvore.position.set(115,0.2,i);
        scene.add(novaArvore);
    }
    for(i=-15;i<=115 ;i+=10){
        novaArvore = createTree();
        novaArvore.position.set(i,0.2,-115);
        scene.add(novaArvore);
    }
    for(i=-15;i<=115 ;i+=10){
        novaArvore = createTree();
        novaArvore.position.set(i,0.2,110);
        scene.add(novaArvore);
    }

    const axesHelper = new THREE.AxesHelper( 20 );
    scene.add( axesHelper );
    camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
    cameraOrtografica = new THREE.OrthographicCamera(-100,100,100,-100,0.1,1000);
    cameraOrtografica.position.set(0,10,0);
    cameraOrtografica.rotation.set(-Math.PI/2, 0, 0);
    //camera.add(listener);

    scene.add(novoCarro);
    
    loadingScreen.box.position.set(0,0,5);
	loadingScreen.camera.lookAt(loadingScreen.box.position);
	loadingScreen.scene.add(loadingScreen.box);
	
	// Create a loading manager to set RESOURCES_LOADED when appropriate.
	// Pass loadingManager to all resource loaders.
	loadingManager = new THREE.LoadingManager();
	
	loadingManager.onProgress = function(item, loaded, total){
		console.log(item, loaded, total);
	};
	
	loadingManager.onLoad = function(){
		console.log("loaded all resources");
		RESOURCES_LOADED = true;
        onResourcesLoaded();
	};

//skybox
    var materialArray = [];
    var texture_ft = new THREE.TextureLoader().load( 'skybox/meadow_ft.jpg');
    var texture_bk = new THREE.TextureLoader().load( 'skybox/meadow_bk.jpg');
    var texture_up = new THREE.TextureLoader().load( 'skybox/meadow_up.jpg');
    var texture_dn = new THREE.TextureLoader().load( 'skybox/meadow_dn.jpg');
    var texture_rt = new THREE.TextureLoader().load( 'skybox/meadow_rt.jpg');
    var texture_lf = new THREE.TextureLoader().load( 'skybox/meadow_lf.jpg');
    
    materialArray.push(new THREE.MeshBasicMaterial( { map: texture_ft }));
    materialArray.push(new THREE.MeshBasicMaterial( { map: texture_bk }));
    materialArray.push(new THREE.MeshBasicMaterial( { map: texture_up }));
    materialArray.push(new THREE.MeshBasicMaterial( { map: texture_dn }));
    materialArray.push(new THREE.MeshBasicMaterial( { map: texture_rt }));
    materialArray.push(new THREE.MeshBasicMaterial( { map: texture_lf }));
    
    for (let i = 0; i < 6; i++)
      materialArray[i].side = THREE.BackSide;
    
    let skyboxGeo = new THREE.BoxGeometry( 250, 250, 400);
    let skybox = new THREE.Mesh( skyboxGeo, materialArray );
    scene.add( skybox );
    
    meshfloor = new THREE.Mesh(
        new THREE.PlaneGeometry(250,250,10,10),
        new THREE.MeshPhongMaterial({color:0xffffff, wireframe:false})//se pusermos false, o chao "desaparece", basicamente estamos a olhar para a parte de tras do chao
        //mudar de basic para phong, pois os materiais basicos nao reagem a luz
    );
    meshfloor.rotateX(-Math.PI/2);
    meshfloor.receiveShadow = true;
    scene.add(meshfloor);

    //lights
    ambient = new THREE.AmbientLight(0xffffff,0.2)
    scene.add(ambient);

    directional = new THREE.DirectionalLight(0xffffff, 0.5);
    scene.add(directional);

    point = new THREE.PointLight(0xffffff, 0.8, 18);
    point.position.set(-3,6,-3);
    point.castShadow = true;
    point.shadow.camera.near = 0.1;
    point.shadow.camera.far = 18;
    scene.add(point);

    var textureLoader = new THREE.TextureLoader();


    for( var _key in models){
        (function(key){
            var mtlLoader = new THREE.MTLLoader(loadingManager);
            mtlLoader.load(models[key].mtl, function(materials){
                materials.preload();
                var objLoader = new THREE.OBJLoader(loadingManager);
                objLoader.setMaterials(materials);
                objLoader.load(models[key].obj, function(mesh){

                    mesh.traverse(function(node){
                        if( node instanceof THREE.Mesh){
                            node.castShadow = true;
                            node.receiveShadow = true;
                        }
                    });
                    models[key].mesh = mesh;
                });
            });
        })(_key);
    }

    //camera e definicoes
    camera.position.set(-5, car.height, -18 );
    camera.rotation.y += Math.PI; 
    //camera.lookAt(new THREE.Vector3(0,car.height,0));// nao faz diferença acho
    //camera.add(novoCarro);
    renderer = new THREE.WebGLRenderer();

    renderer.setSize(window.innerWidth -15, window.innerHeight-15);//1280,720
    renderer.shadowMap.enabled = true;//para permitir shadows
    renderer.shadowMap.type = THREE.BasicShadowMap;
    document.body.appendChild(renderer.domElement);
    controls = new THREE.PointerLockControls(novoCarro,renderer.domElement);
    controlsCamera = new THREE.PointerLockControls(camera,renderer.domElement);
    change();
    
}

function onResourcesLoaded(){

    //for da relva do lado de fora da meta
    for(var i=-100;i<100;i+=5){
        meshes["grass"] = grass.clone();
        meshes["grass"].position.set(-15.0,0.1,i);
        meshes["grass"].scale.set(2,10,10);
        meshes["grass"].rotation.x = 3*Math.PI/2;
        scene.add(meshes["grass"]);
    }
    //for da relva do lado de fora da reta da segunda curva
    for(var i=-100;i<100;i+=5){
        meshes["grass"] = grass.clone();
        meshes["grass"].position.set(115.0,0.1,i);
        meshes["grass"].scale.set(2,10,10);
        meshes["grass"].rotation.x = 3*Math.PI/2;
        scene.add(meshes["grass"]);
    }
    //for da parte de fora da ultima curva
    for(var i=-15;i<115;i+=5){
        meshes["grass"] = grass.clone();
        meshes["grass"].position.set(i,0.1,-115);
        meshes["grass"].scale.set(2,4,10);
        meshes["grass"].rotation.x = 3*Math.PI/2;
        scene.add(meshes["grass"]);
    }
    //for da parte de fora da primeira curva
    for(var i=-15;i<115;i+=5){
        meshes["grass"] = grass.clone();
        meshes["grass"].position.set(i,0.1,110);
        meshes["grass"].scale.set(2,4,10);
        meshes["grass"].rotation.x = 3*Math.PI/2;
        scene.add(meshes["grass"]);
    }
    //for da reta da meta
    for(var i=-30;i <= 85; i+= 5){
        meshes["roadS"] = models.roadStraight.mesh.clone();
        meshes["roadS"].position.set(0.0,0.1,i);
        meshes["roadS"].scale.set(10,10,5);
        scene.add(meshes["roadS"]);
    }
    //for da reta da meta antes da entrada do pit
    for(var i=-100;i <=-45; i+= 5){
        meshes["roadS"] = models.roadStraight.mesh.clone();
        meshes["roadS"].position.set(0.0,0.1,i);
        meshes["roadS"].scale.set(10,10,5);
        scene.add(meshes["roadS"]);
    }

    //for do pit
    for(var i=-30;i <= 75; i+= 5){
        meshes["pitS"] = models.pitStraight.mesh.clone();
        meshes["pitS"].position.set(10.0,0.1,i);
        meshes["pitS"].scale.set(10,10,5);
        scene.add(meshes["pitS"]);
    }
    //for da reta depois da primeira curva
    for(var i=25;i<=100; i+=5){
       meshes["roadS"] = models.roadStraight.mesh.clone();
       meshes["roadS"].position.set(i,0.1,100);
       meshes["roadS"].scale.set(10,10,5);
       meshes["roadS"].rotation.y += 3*Math.PI/2;
       scene.add(meshes["roadS"]);
    }
    for(var i=5;i<=100; i+=5){
        meshes["roadS"] = models.roadStraight.mesh.clone();
        meshes["roadS"].position.set(i,0.1,-100);
        meshes["roadS"].scale.set(10,10,5);
        meshes["roadS"].rotation.y += 3*Math.PI/2;
        scene.add(meshes["roadS"]);
     }
    for(var i=25;i<=100; i+=5){
        meshes["roadS"] = models.roadStraight.mesh.clone();
        meshes["roadS"].position.set(i,0.1,100);
        meshes["roadS"].scale.set(10,10,5);
        meshes["roadS"].rotation.y += 3*Math.PI/2;
        scene.add(meshes["roadS"]);
     }
    //110.0,0.1,90 
    for(var i=-100;i<=85;i+=5){
        meshes["roadS"] = models.roadStraight.mesh.clone();
        meshes["roadS"].position.set(110.0,0.1,i);
        meshes["roadS"].scale.set(10,10,5);
        scene.add(meshes["roadS"]);
    }
    for(i=-100; i<=-50; i+=50){
        agua = createWater();
        agua.position.set(i,0.2,100);
        scene.add(agua);
    }
    for(i=-100; i<=-50; i+=50){
        agua = createWater();
        agua.position.set(i,0.2,50);
        scene.add(agua);
    }
    for(i=-100; i<=-50; i+=50){
        agua = createWater();
        agua.position.set(i,0.2,0);
        scene.add(agua);
    }
    for(i=-100; i<=-50; i+=50){
        agua = createWater();
        agua.position.set(i,0.2,-50);
        scene.add(agua);
    }
    for(i=-100; i<=-50; i+=50){
        agua = createWater();
        agua.position.set(i,0.2,-100);
        scene.add(agua);
    }

    meshes["rStart1"] = models.roadStart.mesh.clone();
    meshes["raceFuture1"] = models.carGaragem.mesh.clone();
    meshes["raceFuture2"] = models.carGaragem.mesh.clone();
    meshes["raceFuture3"] = models.carGaragem.mesh.clone();
    meshes["rStraight8"] = models.roadStraight.mesh.clone();
    meshes["pitEntry"] = models.pitEntry.mesh.clone();
    meshes["rCorner1"] = models.roadCorner.mesh.clone();
    meshes["rCorner2"] = models.roadCorner.mesh.clone();
    meshes["rCorner3"] = models.roadCorner.mesh.clone();
    meshes["rCorner4"] = models.roadCorner.mesh.clone();
    meshes["rCorner5"] = models.roadCorner.mesh.clone();
    meshes["rCorner6"] = models.roadCorner.mesh.clone();
    meshes["pitLeave"] = models.roadSplitL.mesh.clone();
    meshes["pitEntry1"] = models.roadSplitS.mesh.clone();
    meshes["rStart1"].position.set(1.3,0.1,0);

    meshes["rStraight8"].position.set(10.0,0.1,75);
    meshes["pitEntry"].position.set(10.0,0.1,-50);
    meshes["pitEntry1"].position.set(-10.0,0.1,-30);
    meshes["pitLeave"].position.set(20.0,0.1,100);
    meshes["rCorner1"].position.set(-10.0,0.1,-100);
    meshes["rCorner2"].position.set(0.0,0.1,100);
    meshes["rCorner3"].position.set(10.0,0.1,65);
    meshes["rCorner4"].position.set(0.0,0.1,-40);
    meshes["rCorner5"].position.set(100.0,0.1,-110);
    meshes["rCorner6"].position.set(110.0,0.1,90);
    meshes["raceFuture1"].position.set(15.0,0.1,15);
    meshes["raceFuture2"].position.set(15.0,0.1,30);
    meshes["raceFuture3"].position.set(15.0,0.1,0);
    
    meshes["rCorner4"].rotation.y += Math.PI/2;
    meshes["rCorner1"].rotation.y += Math.PI;
    meshes["rCorner2"].rotation.y += 3*Math.PI/2;
    meshes["rCorner3"].rotation.y += 3*Math.PI/2;
    meshes["rCorner5"].rotation.y += Math.PI/2;
    meshes["pitLeave"].rotation.y += 3*Math.PI/2;
    meshes["rStraight8"].rotation.y += 3*Math.PI/2;
    meshes["pitEntry1"].rotation.y += Math.PI;
    meshes["raceFuture3"].rotation.y += 3*Math.PI/2;
    meshes["raceFuture2"].rotation.y += 3*Math.PI/2;
    meshes["raceFuture1"].rotation.y += 3*Math.PI/2;

    meshes["rStart1"].scale.set(10,10,10);
    meshes["rStraight8"].scale.set(10,10,10);
    meshes["pitEntry"].scale.set(10,10,10);
    meshes["pitEntry1"].scale.set(10,10,10);
    meshes["pitLeave"].scale.set(10,10,10);
    meshes["rCorner1"].scale.set(10,10,10);
    meshes["rCorner2"].scale.set(10,10,10);
    meshes["rCorner3"].scale.set(10,10,10);
    meshes["rCorner4"].scale.set(10,10,10);
    meshes["rCorner5"].scale.set(10,10,10);
    meshes["rCorner6"].scale.set(10,10,10);
    meshes["raceFuture1"].scale.set(4,4,4);
    meshes["raceFuture2"].scale.set(4,4,4);
    meshes["raceFuture3"].scale.set(4,4,4);

    scene.add(meshes["grass1"]);
    scene.add(meshes["rStart1"]);
    scene.add(meshes["pitEntry1"]);
    scene.add(meshes["rCorner1"]); //curva entrada para a meta
    scene.add(meshes["rCorner2"]); //curva do fim da meta
    scene.add(meshes["rCorner4"]); //curva entrada do pit
    scene.add(meshes["rCorner5"]);
    scene.add(meshes["rCorner6"]);
    scene.add(meshes["pitLeave"]);
    scene.add(meshes["raceFuture1"]);
    scene.add(meshes["raceFuture2"]);
    scene.add(meshes["raceFuture3"]);

}

function coletarMoedas(){
    var carPosition = novoCarro.position;
    var coinPosition = novoCoin.position;
    var coin1Position = novoCoin1.position;
    var coin2Position = novoCoin2.position;
    var coin3Position = novoCoin3.position;
    var coin4Position = novoCoin4.position;
    var coin5Position = novoCoin5.position;
    var coin6Position = novoCoin6.position;
    var coin7Position = novoCoin7.position;
    var coin8Position = novoCoin8.position;
    var coin9Position = novoCoin9.position;
    var coin10Position = novoCoin10.position;
    var coin11Position = novoCoin11.position;

    var distance = carPosition.distanceTo(coinPosition);
    var distance1 = carPosition.distanceTo(coin1Position);
    var distance2 = carPosition.distanceTo(coin2Position);
    var distance3 = carPosition.distanceTo(coin3Position);
    var distance4 = carPosition.distanceTo(coin4Position);
    var distance5 = carPosition.distanceTo(coin5Position);
    var distance6 = carPosition.distanceTo(coin6Position);
    var distance7 = carPosition.distanceTo(coin7Position);
    var distance8 = carPosition.distanceTo(coin8Position);
    var distance9 = carPosition.distanceTo(coin9Position);
    var distance10 = carPosition.distanceTo(coin10Position);
    var distance11 = carPosition.distanceTo(coin11Position);
    if(distance <2){
        scene.remove(novoCoin);
        efeito.play();
    }
    if(distance1 <2){
        scene.remove(novoCoin1);
        efeito.play();
    }
    if(distance2 <2){
        scene.remove(novoCoin2);
        efeito.play();
    }
    if(distance3 <2){
        scene.remove(novoCoin3);
        efeito.play();
    }
    if(distance4 <2){
        scene.remove(novoCoin4);
        efeito.play();
    }
    if(distance5 <2){
        scene.remove(novoCoin5);
        efeito.play();
    }
    if(distance6 <2){
        scene.remove(novoCoin6);
        efeito.play();
    }
    if(distance7 <2){
        scene.remove(novoCoin7);
        efeito.play();
    }
    if(distance8 <2){
        scene.remove(novoCoin8);
        efeito.play();
    }
    if(distance9 <2){
        scene.remove(novoCoin9);
        efeito.play();
    }
    if(distance10 <2){
        scene.remove(novoCoin10);
        efeito.play();
    }
    if(distance11 <2){
        scene.remove(novoCoin11);
        efeito.play();
    }

}

function change(){
    if( RESOURCES_LOADED == false ){
		requestAnimationFrame(change);
		
		loadingScreen.box.position.x -= 0.05;
		if( loadingScreen.box.position.x < -10 ) loadingScreen.box.position.x = 10;
		loadingScreen.box.position.y = Math.sin(loadingScreen.box.position.x);
		
		renderer.render(loadingScreen.scene, loadingScreen.camera);
		return;
	}
    coletarMoedas()

    requestAnimationFrame(change);

    novoCoin.rotation.y += 0.02;
    novoCoin1.rotation.y += 0.02;
    novoCoin2.rotation.y += 0.02;
    novoCoin3.rotation.y += 0.02;
    novoCoin4.rotation.y += 0.02;
    novoCoin5.rotation.y += 0.02;
    novoCoin6.rotation.y += 0.02;
    novoCoin7.rotation.y += 0.02;
    novoCoin8.rotation.y += 0.02;
    novoCoin9.rotation.y += 0.02;
    novoCoin10.rotation.y += 0.02;
    novoCoin11.rotation.y += 0.02;

    if (mixerAnimacao) {
        mixerAnimacao.update(clock.getDelta());
      }

  if(keyboard[37]){//left
    camera.position.x += 0.2;
    controls.moveForward(0.4);
    
  }

 if(keyboard[38]){//up
      controls.moveRight(0.4);
      camera.position.z += 0.2;
  }

  if(keyboard[39]){//right
      controls.moveForward(-0.4);
      camera.position.x -= 0.2;
  }

  if(keyboard[40]){//down
      camera.position.z -= 0.2;
      controls.moveRight(-0.4);
  }

    if(keyboard[87]){ // tecla W
        controlsCamera.moveForward(car.speed);
    }
    if(keyboard[83]){ // tecla S
        controlsCamera.moveForward(-car.speed);
    }
    if(keyboard[65]){ // tecla A
        controlsCamera.moveRight(-car.speed);
    }
    if(keyboard[68]){ // tecla D
        controlsCamera.moveRight(car.speed);
    }
    if(keyboard[32]){ // tecla Espaço
        camera.position.y += 0.05;
    }
    if(keyboard[67]){ // tecla C
        camera.position.y -= 0.05;
    } 
    if(keyboard[49]){ //tecla 1
        if(ambient.visible == true){
            ambient.visible = false;
        }
    }
    if(keyboard[50]){ //tecla 2
        if(ambient.visible == false){
            ambient.visible = true;
        }
    }
    if(keyboard[51]){ //tecla 3
        if(directional.visible == true){
            directional.visible = false;
        }
    }
    if(keyboard[52]){ //tecla 4
        if(directional.visible == false){
            directional.visible = true;
        }
    }
    if(keyboard[53]){ //tecla 5
        if(point.visible == true){
            point.visible = false;
        }
    }
    if(keyboard[54]){ //tecla 6
        if(point.visible == false){
            point.visible = true;
        }
    }
    if(cam == 0){
        renderer.render(scene,camera);
    }else{
        renderer.render(scene, cameraOrtografica);
    } 
}
function keyDown(event){
    keyboard[event.keyCode] = true;
    if(keyboard[77]){ // tecla M
        if(cam == 0){
            cam++;
        }else{
            cam--;
        }
    }
}
function keyUp(event){
    keyboard[event.keyCode] = false;
}

function mouseDown(){
    controls.lock();
}

window.addEventListener('keydown', keyDown);
window.addEventListener('keyup', keyUp);
window.addEventListener('mousedown', mouseDown);

window.onload = start;
