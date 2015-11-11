var container, stats,
camera, scene, projector, renderer, wrapper_loader;
var mesh, animation;
var lon = 90, lat = 0;
var phi = 0, theta = 0;

var touchX, touchY;
init();
animate();

function init() {

	container = document.createElement( 'div' );
	document.body.appendChild( container );

	var info = document.createElement( 'div' );
	info.style.position = 'absolute';
	info.style.top = '10px';
	info.style.width = '100%';
	info.style.textAlign = 'center';
	info.innerHTML = '<span>Zillious</spana>';
	container.appendChild( info );

				//

				camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 1, 10000 );
				camera.position.set( 0, 0, 550 );
				camera.target = new THREE.Vector3( 0, 0, 0 );

				scene = new THREE.Scene();

				var loader = new THREE.ObjectLoader();
				loader.load( "copy-of-iphone-5s.json", function ( obj ) {
					scene.add( obj );
					wrapper_loader = document.getElementById('wrapper_loader');
					wrapper_loader.style.display = 'none';
				});

				//
				/*var axisHelper = new THREE.AxisHelper(800);
				scene.add(axisHelper);*/
				renderer = new THREE.WebGLRenderer({antialias : true});
				renderer.setClearColor( 0xf0f0f0 );
				renderer.setSize( window.innerWidth, window.innerHeight );

				container.appendChild(renderer.domElement);

				//
				controls = new THREE.OrbitControls( camera, renderer.domElement );
				controls.center.set( 0, 100, 0);

				controls.addEventListener( 'change', render );
				window.addEventListener( 'resize', onWindowResize, false );
			}

			function onWindowResize() {

				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();

				renderer.setSize( window.innerWidth, window.innerHeight );

			}

			function animate() {
				requestAnimationFrame( animate );
				controls.update();
				render();
			}

			function render() {

				renderer.render( scene, camera );

			}