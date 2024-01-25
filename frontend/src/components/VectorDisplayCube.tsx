import {useEffect, useRef} from "react";
import * as THREE from 'three';

interface VectorDisplayProps {
    message: string; // Assuming message is a JSON string
}

const VectorDisplayCube: React.FC<VectorDisplayProps> = ({ message }) => {
    const mountRef = useRef<HTMLDivElement>(null);
    const lineRef = useRef<THREE.Line>(null);

    THREE.Object3D.DEFAULT_UP = new THREE.Vector3(0,0,1);

    useEffect(() => {
        // Ensure the mountRef.current is not null
        if (!mountRef.current) return;

        // Scene, Camera, and Renderer
        const scene = new THREE.Scene();
        // const camera = new THREE.PerspectiveCamera(75, mountRef.current.clientWidth / mountRef.current.clientHeight, 0.1, 1000);

        // Orthographic Camera for Isometric View
        const aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
        const d = 1.5; // Size for the camera view
        const camera = new THREE.OrthographicCamera(-d * aspect, d * aspect, d, -d, 1, 1000);
        // Camera Position for Isometric View
        // camera.position.set(10, 10, 10);
        camera.position.set(3, 3, 3);
        camera.lookAt(scene.position);

        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
        mountRef.current.appendChild(renderer.domElement);

        // Axes Helper
        const axesHelper = new THREE.AxesHelper(1); // axes length = 1
        axesHelper.setColors(0xff0000, 0x00ff00, 0x0000ff);
        scene.add(axesHelper);

        // Initial Vector (will be updated)
        const material = new THREE.LineBasicMaterial({ color: 0xFFFF00 });
        const points = [new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 0)];
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        const line = new THREE.Line(geometry, material);
        // @ts-ignore
        lineRef.current = line;
        scene.add(line);

        // Normalized Vector
        // const vector = new THREE.Vector3(1, 2, 3).normalize(); // Example vector, normalize it
        // const arrow = new THREE.ArrowHelper(vector, new THREE.Vector3(0, 0, 0), 1, 0xff0000);
        // scene.add(arrow);

        const geometry2 = new THREE.BoxGeometry( 0.5, 0.5, 0.5 );
        const material2 = new THREE.MeshBasicMaterial( { color: 0x556677 } );
        const mesh = new THREE.Mesh( geometry2, material2 );

        mesh.rotation.x = Math.PI / 3;
        mesh.rotation.y = Math.PI / 5;
        // mesh.rotation.set(new THREE.Vector3( 0, 0, Math.PI / 2));
        // scene.add( mesh );

        const geometry3 = new THREE.EdgesGeometry( mesh.geometry );
        const material3 = new THREE.LineBasicMaterial( { color: 0xffffff } );
        const wireframe = new THREE.LineSegments( geometry3, material3 );
        wireframe.rotation.x = Math.PI / 3;
        wireframe.rotation.y = Math.PI / 5;
        scene.add( wireframe );



        // Camera Position
/*
        camera.position.z = 5;
*/

        // Animation Loop
        const animate = () => {
            requestAnimationFrame(animate);
            renderer.render(scene, camera);
        };

        animate();

        return () => {
            if (mountRef.current) {
                mountRef.current.removeChild(renderer.domElement);
            }
        };
    }, []);

    useEffect(() => {
        if (message && lineRef.current) {
            const vectorData = JSON.parse(message); // Assuming message is JSON string
            console.log("vectorData", vectorData);
            const newPoints = [
                new THREE.Vector3(0, 0, 0),
                new THREE.Vector3(vectorData.x, vectorData.y, vectorData.z).normalize()
            ];
            lineRef.current.geometry.setFromPoints(newPoints);
        }
    }, [message]);

    return <div ref={mountRef} style={{ width: '100%', height: '400px' }} />;
};

export default VectorDisplayCube;

/*
Notes:

ThreeJS orientation : https://stackoverflow.com/questions/44630265/how-can-i-set-z-up-coordinate-system-in-three-js

THREE.Object3D.DefaultUp = new THREE.Vector3(0,0,1);

TODO: use a mesh box : https://threejs.org/docs/#api/en/objects/Mesh

mesh rotation : https://stackoverflow.com/questions/29907536/how-can-i-rotate-a-mesh-by-90-degrees-in-threejs

mesgh edges : https://stackoverflow.com/questions/36472653/drawing-edges-of-a-mesh-in-three-js

https://discourse.threejs.org/t/how-to-render-geometry-edges/5745/7

https://codepen.io/prisoner849/pen/KKqmyEV?editors=0010

https://jsfiddle.net/prisoner849/96npfk1r/



 */