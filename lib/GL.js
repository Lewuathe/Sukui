var kingyo = {};


kingyo.initThree = function() {
    kingyo.width = document.getElementById('canvas-frame').clientWidth;
    kingyo.height = document.getElementById('canvas-frame').clientHeight;  
    kingyo.renderer = new THREE.WebGLRenderer({antialias: true});
    kingyo.renderer.setSize(kingyo.width, kingyo.height );
    document.getElementById('canvas-frame').appendChild(kingyo.renderer.domElement);
    kingyo.renderer.setClearColorHex(0xffffff, 1.0);
}

kingyo.initCamera = function() {  
    kingyo.camera = new THREE.PerspectiveCamera( 45 , kingyo.width / kingyo.height , 1 , 10000 );
    kingyo.camera.position.x = 100;
    kingyo.camera.position.y = 20;
    kingyo.camera.position.z = 50;
    kingyo.camera.up.x = 0;
    kingyo.camera.up.y = 0;
    kingyo.camera.up.z = 1;
    kingyo.camera.lookAt( {x:0, y:0, z:0 } );
}
kingyo.initScene = function() {    
    kingyo.scene = new THREE.Scene();
}

kingyo.initLight = function() {  
    kingyo.light = new THREE.DirectionalLight(0xee0000, 1.0, 0);
    kingyo.light.position.set( 100, 100, 200 );
    kingyo.scene.add(kingyo.light);
}

kingyo.initObject = function(){   
    kingyo.cube = new THREE.Mesh(
        new THREE.CubeGeometry(50,50,50),                //形状の設定
        new THREE.MeshLambertMaterial({color: 0xff0000}) //材質の設定
    );
    kingyo.scene.add(kingyo.cube);
    kingyo.cube.position.set(0,0,0);
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

$(function(){
    kingyo.threeStart();
});