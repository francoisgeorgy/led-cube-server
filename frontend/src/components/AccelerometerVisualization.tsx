import React from 'react';
import {Canvas, useFrame} from '@react-three/fiber';
import {BoxGeometry, Mesh, MeshStandardMaterial, Quaternion, Vector3} from 'three';

/*
interface RotatingCubeProps extends MeshProps {
  rotationSpeed: { x: number; y: number; z: number };
}

const RotatingCube: React.FC<RotatingCubeProps> = ({ position, rotationSpeed }) => {
  const ref = useRef<Mesh>(null);

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.x += rotationSpeed.x;
      ref.current.rotation.y += rotationSpeed.y;
      ref.current.rotation.z += rotationSpeed.z;
    }
  });

  return (
    <mesh ref={ref} position={position}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={'orange'} />
    </mesh>
  );
};
*/

interface CubeProps {
    direction: Vector3;
}

/*
class BoxBufferGeometry {
    constructor(number: number, number2: number, number3: number) {
        
    }

}
*/

const OrientedCube: React.FC<CubeProps> = ({direction}) => {
    const meshRef = React.useRef<Mesh>(null);

    useFrame(() => {
        if (meshRef.current) {
            const up = new Vector3(0, 0, 1);
            const quaternion = new Quaternion().setFromUnitVectors(up, direction.clone().normalize());
            meshRef.current.quaternion.copy(quaternion);
        }
    });

    // Create an array of materials for different colors on each face
    const materials = [
        new MeshStandardMaterial({color: 'red'}),
        new MeshStandardMaterial({color: 'green'}),
        new MeshStandardMaterial({color: 'blue'}),
        new MeshStandardMaterial({color: 'yellow'}),
        new MeshStandardMaterial({color: 'purple'}),
        new MeshStandardMaterial({color: 'cyan'}),
    ];

    return (
        <mesh ref={meshRef}>
            <boxGeometry args={[1, 1, 1]}>
                {materials.map((material, index) => (
                    <primitive key={index} attachArray="material" object={material}/>
                ))}
            </boxGeometry>
            <lineSegments>
                <wireframeGeometry attach="geometry" args={[new BoxGeometry(1, 1, 1)]}/>
                <lineBasicMaterial color="black"/>
            </lineSegments>
        </mesh>
    );
};

interface AccelerometerVisualizationProps {
    vec: { x: number; y: number; z: number }
}

const AccelerometerVisualization: React.FC<AccelerometerVisualizationProps> = ({vec}) => {

    // const [rotationSpeed, setRotationSpeed] = useState<{ x: number; y: number; z: number }>({ x: 0.01, y: 0.01, z: 0.01 });

    // Here, you would update rotationSpeed based on your accelerometer data

    return (
        <div style={{height: '400px', width: '100%'}}>
            <Canvas>
                <ambientLight/>
                <pointLight position={[10, 10, 10]}/>
                <OrientedCube direction={new Vector3(vec.x, vec.y, vec.z)}/>
                {/* World Coordinate System View */}
                {/*<RotatingCube position={[2, 0, 0]} rotationSpeed={vec} />*/}
                {/* Accelerometer's Local Coordinate System View */}
                {/*<RotatingCube position={[-2, 0, 0]} rotationSpeed={vec} />*/}
            </Canvas>
        </div>
    );
};

export default AccelerometerVisualization;
