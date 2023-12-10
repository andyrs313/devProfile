"use client";

import React from "react";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei"
import { styled } from 'styled-components';


const WIDTH = 700,
HEIGHT = 500,
VIEW_ANGLE = 45,
ASPECT = WIDTH / HEIGHT,
NEAR = 0.1,
FAR = 10000,
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
    const ballGeometry = new THREE.SphereGeometry(BALL_RADIUS, 40, 40);
    const ballMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff });
    const ball = new THREE.Mesh(ballGeometry, ballMaterial); // Create a mesh using ballGeometry and ballMaterial
    ball.position.set(0, 0, 0);
    return (
        <primitive object={ball} />
    );
};

const Field = () => {
    var fieldGeometry = new THREE.BoxGeometry(FIELD_WIDTH, 5, FIELD_LENGTH, 1, 1, 1),
        fieldMaterial = new THREE.MeshLambertMaterial({ color: 0x003300 });
        const field = new THREE.Mesh(fieldGeometry, fieldMaterial);
        field.position.set(0, -30, 0);
    return (
        <mesh>
            <primitive object={field} />
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
    camera.position.set(1000, 2500, 0);


    return (
        <Wrapper>
            <Score>Player: 0 | AI: 0 </Score>
            <Canvas camera={camera}>
                <Light />
                <OrbitControls onChange={(event) => console.log(camera)}/>
                <Paddle zPos={FIELD_LENGTH / 2}/>
                <Paddle zPos={-FIELD_LENGTH / 2}/>
                <Ball />
                <Field />
            </Canvas>
        </Wrapper>
    );
}