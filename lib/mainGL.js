var kingyo = {};


kingyo.initThree = function() {
    kingyo.width = document.getElementById('canvas-frame').clientWidth;
    kingyo.height = document.getElementById('canvas-frame').clientHeight;  
    kingyo.renderer = new THREE.WebGLRenderer({antialias: true});
    kingyo.renderer.setSize(kingyo.width, kingyo.height );
    document.getElementById('canvas-frame').appendChild(kingyo.renderer.domElement);
    kingyo.renderer.setClearColorHex(0xffffff, 1.0);
    setInterval(kingyo.renderRoutine,10);
}

kingyo.initScene = function() {    
    kingyo.scene = new THREE.Scene();
}

kingyo.initCamera = function() {  
    kingyo.camera = new THREE.PerspectiveCamera( 45 , kingyo.width / kingyo.height , 1 , 10000 );
    kingyo.camera.position.x = 0;
    kingyo.camera.position.y = 0;
    kingyo.camera.position.z = 1000;
    kingyo.camera.up.z = 10;
    kingyo.camera.lookAt(0,0,0);
}


kingyo.initLight = function() {  
    kingyo.light = new THREE.DirectionalLight(0xffffff, 1.0, 0);
    kingyo.light.position.set( 100, 100, 200 );
    kingyo.scene.add(kingyo.light);
}

kingyo.initObject = function(){  
    kingyo.scene.add(kingyo.roomObject);
    kingyo.scene.add(kingyo.anyObj);
}

kingyo.anyObj = new THREE.Mesh(new THREE.CubeGeometry(100,100,100), new THREE.MeshLambertMaterial({color : 0xff0000}));
kingyo.roomObject = new THREE.Mesh(new THREE.CubeGeometry(200,400,400),new THREE.MeshLambertMaterial({color: 0x00ff00}));


kingyo.renderRoutine = function(){
    kingyo.anyObj.position.y += 1;
    kingyo.roomObject.position.y -= 1;
    kingyo.camera.position.z += 5;
    kingyo.renderer.clear();
    kingyo.renderer.render(kingyo.scene,kingyo.camera);
}


kingyo.threeStart = function() {
    kingyo.initThree();
    kingyo.initCamera();
    kingyo.initScene();    
    kingyo.initLight();
    kingyo.initObject();
    kingyo.renderer.clear();  
    kingyo.renderer.render(kingyo.scene, kingyo.camera);
}

