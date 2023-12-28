import * as THREE from "three";

type FanStandProps = {
    fieldLength: number;
    fieldWidth: number;
};

export const FanStand = ({fieldLength, fieldWidth}: FanStandProps) => {
    const fanStandAGeometry = new THREE.BoxGeometry(100, 50, fieldLength),
        fanStandAMaterial = new THREE.MeshLambertMaterial({ color: 0xcc0000 }),
        fanStandA = new THREE.Mesh(fanStandAGeometry, fanStandAMaterial);
    
    //position fanstand at top of field
    fanStandA.position.set((-fieldWidth / 2) - 50, -8, 0);

    const fanStandBGeometry = new THREE.BoxGeometry(100, 100, fieldLength),
        fanStandBMaterial = new THREE.MeshLambertMaterial({ color: 0xee0000 }),
        fanStandB = new THREE.Mesh(fanStandBGeometry, fanStandBMaterial);

    //position behind fanstand A
    fanStandB.position.set((-fieldWidth / 2) - 150, 17, 0);

    //flags to each side of fanstand B
    const flagPoleGeometry = new THREE.CylinderGeometry(6, 6, 100),
        flagMaterial = new THREE.MeshLambertMaterial({ color: 0xaaaaaa }),
        flagPoleA = new THREE.Mesh(flagPoleGeometry, flagMaterial),
        flagPoleB = new THREE.Mesh(flagPoleGeometry, flagMaterial);
    
    flagPoleA.position.set((-fieldWidth / 2) - 150, 100, (fieldLength / 2) - 10);
    flagPoleB.position.set((-fieldWidth / 2) - 150, 100, -(fieldLength / 2) + 10);

    //Add waving flags to flagpoles
    const flagGeometry = new THREE.BoxGeometry(2, 40, 55);
    const flagMaterialA = new THREE.MeshBasicMaterial({color: 0x298fec, side: THREE.DoubleSide});
    const flagMaterialB = new THREE.MeshBasicMaterial({color: 0xd0d011, side: THREE.DoubleSide});
    const flagA = new THREE.Mesh(flagGeometry, flagMaterialA);
    const flagB = new THREE.Mesh(flagGeometry, flagMaterialB);
    flagA.position.set((-fieldWidth / 2) - 150, 120, (fieldLength / 2) - 40);
    flagB.position.set((-fieldWidth / 2) - 150, 120, -(fieldLength / 2) - 20);

    return (
        <mesh>
            <primitive object={fanStandA} />
            <primitive object={fanStandB} />
            <primitive object={flagPoleA} />
            <primitive object={flagPoleB} />
            <primitive object={flagA} />
            <primitive object={flagB} />
        </mesh>
    );

};
