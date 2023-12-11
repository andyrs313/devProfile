"use client";

import React, {useEffect, useRef, useState} from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei"
import { styled } from 'styled-components';


const WIDTH = 700,
HEIGHT = 500,
FIELD_WIDTH = 1200,
FIELD_LENGTH = 3000,
BALL_RADIUS = 20,
PADDLE_WIDTH = 200,
PADDLE_HEIGHT = 30,
PADDLE_DEPTH = 30


const Score = styled.h1({
    color: '#ffffff',
    fontSize: '24px',
    fontWeight: 'bold',
    margin: '0 0 20px 0',
});
const Wrapper = styled.div({
    width: '100%',
    height: 'calc(100vh - 174px)',
    display: 'flex',
    flexDirection: "column",
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4e246c',
});

const PlayerPaddle = ({zPos, upKey, downKey}) => {
    const [paddleX, setPaddleX] = useState(0);
    const paddleRef = useRef<THREE.Mesh>(null);

    useEffect(() => {
        const handleKeyDown = (event) => {
            switch(event.key) {
                case upKey:
                    setPaddleX(prevX => prevX - 4);
                    break;
                case downKey:
                    setPaddleX(prevX => prevX + 4);
                    break;
                default:
                    break;
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    useFrame(() => {
        if (paddleRef.current) {
            paddleRef.current.position.x = paddleX;
        }
    });

    return (
        <mesh ref={paddleRef} position={[paddleX, 0, zPos]}>
            <boxGeometry args={[PADDLE_WIDTH, PADDLE_HEIGHT, PADDLE_DEPTH]} />
            <meshLambertMaterial color={0xffffff} />
        </mesh>
    );
};

const Paddle = ({zPos}) => {
    const paddleGeometry = new THREE.BoxGeometry(PADDLE_WIDTH, PADDLE_HEIGHT, PADDLE_DEPTH);
    const paddleMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff });

    const paddle = new THREE.Mesh(paddleGeometry, paddleMaterial);    
    paddle.position.set(0, 0, zPos);
    return (
        <primitive object={paddle} />
    );
};


const Ball = () => {
    const vector = useRef({x: 5, z: 5}); // [x, y]
    const ballRef = useRef<THREE.Mesh>();
    const ballGeometry = new THREE.SphereGeometry(BALL_RADIUS, 40, 40);
    const ballMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff });
    const ball = new THREE.Mesh(ballGeometry, ballMaterial);
    ball.position.set(0, 0, 0);

    useFrame((state,delta) => {
        //If ball position hits the wall, change the direction
        if (ballRef.current) {
            if ((ballRef.current.position.x + 10) >= FIELD_WIDTH / 2 || (ballRef.current.position.x - 10) <= -FIELD_WIDTH / 2) {
                vector.current = {x: -vector.current.x, z: vector.current.z};
            }
            if ((ballRef.current.position.z + 10) >= FIELD_LENGTH / 2 || (ballRef.current.position.z - 10) <= -FIELD_LENGTH / 2) {
                vector.current = {x: vector.current.x, z: -vector.current.z};
            }
            ballRef.current.position.x += vector.current.x;
            ballRef.current.position.z += vector.current.z;
         }
    });

    return (
        <primitive ref={ballRef} object={ball} />
    );
};

const Field = () => {
    const fieldGeometry = new THREE.BoxGeometry(FIELD_WIDTH, 5, FIELD_LENGTH, 1, 1, 1),
        fieldMaterial = new THREE.MeshLambertMaterial({ color: 0x008200 }),
        field = new THREE.Mesh(fieldGeometry, fieldMaterial),
        lineGeometry = new THREE.BoxGeometry(FIELD_WIDTH, 5, 5, 1, 1, 1),
        lineMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff }),
        line = new THREE.Mesh(lineGeometry, lineMaterial);

        line.position.set(0, -28, 0);
        field.position.set(0, -30, 0);
    return (
        <mesh>
            <primitive object={field} />
            <primitive object={line} />
        </mesh>
    );
};

const FanStand = () => {
    const fanStandAGeometry = new THREE.BoxGeometry(100, 50, FIELD_LENGTH),
        fanStandAMaterial = new THREE.MeshLambertMaterial({ color: 0xcc0000 }),
        fanStandA = new THREE.Mesh(fanStandAGeometry, fanStandAMaterial);
    
    //position fanstand at top of field
    fanStandA.position.set((-FIELD_WIDTH / 2) - 50, 0, 0);

    const fanStandBGeometry = new THREE.BoxGeometry(100, 100, FIELD_LENGTH),
        fanStandBMaterial = new THREE.MeshLambertMaterial({ color: 0xee0000 }),
        fanStandB = new THREE.Mesh(fanStandBGeometry, fanStandBMaterial);

    //position behind fanstand A
    fanStandB.position.set((-FIELD_WIDTH / 2) - 150, 25, 0);

    //flags to each side of fanstand B
    const flagPoleGeometry = new THREE.CylinderGeometry(6, 6, 100),
        flagMaterial = new THREE.MeshLambertMaterial({ color: 0xaaaaaa }),
        flagPoleA = new THREE.Mesh(flagPoleGeometry, flagMaterial),
        flagPoleB = new THREE.Mesh(flagPoleGeometry, flagMaterial);
    
    flagPoleA.position.set((-FIELD_WIDTH / 2) - 150, 100, (FIELD_LENGTH / 2) - 10);
    flagPoleB.position.set((-FIELD_WIDTH / 2) - 150, 100, -(FIELD_LENGTH / 2) + 10);

    //Add waving flags to flagpoles
    const flagGeometry = new THREE.BoxGeometry(2, 40, 55);
    const flagMaterialA = new THREE.MeshBasicMaterial({color: 0x0000cc, side: THREE.DoubleSide});
    const flagMaterialB = new THREE.MeshBasicMaterial({color: 0xd0d011, side: THREE.DoubleSide});
    const flagA = new THREE.Mesh(flagGeometry, flagMaterialA);
    const flagB = new THREE.Mesh(flagGeometry, flagMaterialB);
    flagA.position.set((-FIELD_WIDTH / 2) - 150, 120, (FIELD_LENGTH / 2) - 40);
    flagB.position.set((-FIELD_WIDTH / 2) - 150, 120, -(FIELD_LENGTH / 2) - 20);

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

const Light = () => {
    const light = new THREE.HemisphereLight(0xFFFFFF, 0x003300)
    light.position.set(0, 40, 0); // Set the position of the light
    return (
        <primitive object={light} />
    );
};


export default function Pong() {
    const camera = new THREE.PerspectiveCamera(45, 1.75, 0.1, 10000);
    camera.position.set(1000, 2800, 0);


    return (
        <Wrapper>
            <Score>Player: 0 | AI: 0 </Score>
            <Canvas camera={camera}>
                <Light />
                <OrbitControls />
                <PlayerPaddle upKey="ArrowUp" downKey="ArrowDown" zPos={FIELD_LENGTH / 2}/>
                <Paddle zPos={-FIELD_LENGTH / 2}/>
                <Ball />
                <Field />
                <FanStand />
            </Canvas>
        </Wrapper>
    );
}