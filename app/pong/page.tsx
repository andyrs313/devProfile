"use client";

import React, {useEffect, useRef, useState} from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { styled } from 'styled-components';
import { Camera } from "react-feather";
import { FanStand } from "./fanStand";

const FIELD_WIDTH = 1200,
FIELD_LENGTH = 3000,
BALL_RADIUS = 20,
PADDLE_WIDTH = 200,
PADDLE_HEIGHT = 30,
PADDLE_DEPTH = 30,
PADDLE_MAX_X = FIELD_WIDTH / 2 - PADDLE_WIDTH / 2,
PADDLE_MIN_X = -FIELD_WIDTH / 2 + PADDLE_WIDTH / 2,
BALL_SPEED = 12;


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
const StartScreen = styled.div({
    width: '100%',
    height: 'calc(100% - 176px)',
    position: 'absolute',
    top: '74px',
    left: '0',
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: '100',
    color: '#ffffff',
    fontSize: '48px',
    fontWeight: 'bold',
    cursor: 'pointer',
});
const CameraButton = styled.button({
    position: 'absolute',
    display: 'block',
    top: '94px',
    right: '20px',

    backgroundColor: '#ffffff',
    border: 'none',
    borderRadius: '5px',
    padding: '10px',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    zIndex: '100',
});


const PlayerPaddle = ({zPos, xPos}) => {
    const paddleRef = useRef<THREE.Mesh>(null);

    useFrame(() => {
        if (paddleRef.current) {
            paddleRef.current.position.x = xPos;
        }
    });

    return (
        <mesh ref={paddleRef} position={[xPos, 0, zPos]}>
            <boxGeometry args={[PADDLE_WIDTH, PADDLE_HEIGHT, PADDLE_DEPTH]} />
            <meshLambertMaterial color={0xffffff} />
        </mesh>
    );
};

const AIPaddle = ({zPos, ballXPos, xPos, setXPos}: {zPos: number, ballXPos: number, xPos: number, setXPos: Function}) => {
    const paddleRef = useRef<THREE.Mesh>(null);
    const paddleGeometry = new THREE.BoxGeometry(PADDLE_WIDTH, PADDLE_HEIGHT, PADDLE_DEPTH);
    const paddleMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff });

    const paddle = new THREE.Mesh(paddleGeometry, paddleMaterial);    
    paddle.position.set(0, 0, zPos);

    useFrame(() => {
        if (paddleRef.current) {
            if (ballXPos === 0) {
                setXPos(10);
            }

            if (ballXPos === 0 || (paddleRef.current.position.x < ballXPos + 40  && paddleRef.current.position.x < (FIELD_WIDTH / 2 - PADDLE_WIDTH / 2))) {
                setXPos(prevX => prevX + 10);
            }
            if (paddleRef.current.position.x > ballXPos - 40 && paddleRef.current.position.x > (-FIELD_WIDTH / 2 + PADDLE_WIDTH / 2)) {
                setXPos(prevX => prevX - 10);
            }
        }
    });

    return (
        <mesh ref={paddleRef} position={[xPos, 0, zPos]}>
            <boxGeometry args={[PADDLE_WIDTH, PADDLE_HEIGHT, PADDLE_DEPTH]} />
            <meshLambertMaterial color={0xffffff} />
        </mesh> 
    )
};


const Ball = ({run, ballX, setBallX, ballZ, setBallZ, playerPaddleX, aiPaddleX, setScore}) => {
    const vector = useRef({x: 0, z: Math.random() < 0.5 ? BALL_SPEED : -BALL_SPEED}); // [x, y]
    const ballRef = useRef<THREE.Mesh>();
    const ballGeometry = new THREE.SphereGeometry(BALL_RADIUS, 40, 40);
    const ballMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff });
    const ball = new THREE.Mesh(ballGeometry, ballMaterial);
    ball.position.set(ballX, 0, ballZ);

    useFrame(() => {
        if (run) {
            if (ballRef.current) {
                setBallX((x) => x + vector.current.x);
                setBallZ((z) => z + vector.current.z);

                const playerPaddleTopX = playerPaddleX + PADDLE_WIDTH / 2,
                    playerPaddleBottomX = playerPaddleX - PADDLE_WIDTH / 2,
                    aiPaddleTopX = aiPaddleX + PADDLE_WIDTH / 2,
                    aiPaddleBottomX = aiPaddleX - PADDLE_WIDTH / 2,
                    ballRefX = ballRef.current.position.x,
                    ballRefZ = ballRef.current.position.z;

                //check if ball hits wall
                if (ballRefX > FIELD_WIDTH / 2 - BALL_RADIUS) {
                    vector.current.x = -vector.current.x;
                }
                if (ballRefX < -FIELD_WIDTH / 2 + BALL_RADIUS) {
                    vector.current.x = -vector.current.x;
                }


                //check if ball hits paddle
                if (ballRefZ > FIELD_LENGTH / 2 - (BALL_RADIUS + 5) && ballRefX < playerPaddleTopX && ballRefX > playerPaddleBottomX) {
                    // change angle based on where ball hits paddle
                    // ball is 50, paddle at 0, angle should be 80
                    // ball is 0, paddle at 0, angle should be 0
                    // ball is -50, paddle at 0, angle should be -80

                    vector.current.x = (ballRefX - playerPaddleX) * 0.3;
                    vector.current.z = -vector.current.z;
                }
                if (ballRefZ < -FIELD_LENGTH / 2 + (BALL_RADIUS + 5) && ballRefX < aiPaddleTopX && ballRefX > aiPaddleBottomX) {
                    const newVectorX = (ballRefX - aiPaddleX) * 0.3;
                    vector.current.x = newVectorX;
                    vector.current.z = -vector.current.z;
                }

                //check if goal is scored
                if (ballRefZ > FIELD_LENGTH / 2 - BALL_RADIUS) {
                    setScore(prevScore => [prevScore[0], prevScore[1] + 1]);
                    vector.current.x = 0;
                    vector.current.z = BALL_SPEED;
                    setBallX(0);
                    setBallZ(0);
                }   else {
                    vector.current.z = -vector.current.z;
                }
                if (ballRef.current.position.z < -FIELD_LENGTH / 2 + BALL_RADIUS) {
                    setScore(prevScore => [prevScore[0] + 1, prevScore[1]]);
                    vector.current.x = 0;
                    vector.current.z = -BALL_SPEED;
                    setBallX(0);
                    setBallZ(0);
                } else {
                    vector.current.z = -vector.current.z;
                }
            }
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

const Light = () => {
    const light = new THREE.HemisphereLight(0xFFFFFF, 0x003300)
    light.position.set(0, 40, 0); // Set the position of the light
    return (
        <primitive object={light} />
    );
};


export default function Pong() {
    const [run, setRun] = useState(false);
    const [score, setScore] = useState([0, 0]);
    const [ballX, setBallX] = useState(0);
    const [ballZ, setBallZ] = useState(0);
    const [playerPaddleX, setPlayerPaddleX] = useState(0);
    const [aiPaddleX, setAiPaddleX] = useState(0);
    const [cameraView, setCameraView] = useState(0); // 0 = default, 1 = side, 2 = top

    const camera = new THREE.PerspectiveCamera(45, 1.75, 0.1, 10000);

    useEffect(() => {
        //on w or a keypress, move paddle up
        const handleKeyDown = (e) => {
            if (e.keyCode === 65 || e.keyCode === 87) {
                setPlayerPaddleX(prevX => prevX > PADDLE_MIN_X ? prevX - 10 : prevX);
            }
            if (e.keyCode === 68 || e.keyCode === 83) {
                setPlayerPaddleX(prevX => prevX < PADDLE_MAX_X ? prevX + 10 : prevX);
            }
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    });

    useEffect(() => {
        switch (cameraView) {
            case 0:
                camera.position.set(1000, 2800, 0);
                break;
            case 1:
                camera.position.set(0, 500, 3000);
                break;
            case 2:
                camera.position.set(90, 2300, 0);
                break;
            default:
                break;
        }
        camera.lookAt(0, 0, 0);
    });

    const changeCameraView = () => {
        setCameraView(prevView => {
            let newView = prevView + 1;
            if (newView > 2) {
                newView = 0;
            }
            return newView;
        });
    };
    

    return (
        <Wrapper>
            <CameraButton onClick={changeCameraView}><Camera/></CameraButton>
            <Score>{`Player: ${score[0]} | AI: ${score[1]}`}</Score>
            <StartScreen 
                onClick={() => setRun(true)}
                style={{display: run ? 'none' : 'flex'}}
            >
                Click to Start
            </StartScreen>
                <Canvas camera={camera} style={{width: '1200px'}}>
                    <Light />
                    <PlayerPaddle zPos={FIELD_LENGTH / 2} xPos = {playerPaddleX}/>
                    <AIPaddle zPos={(-FIELD_LENGTH / 2) + 10} ballXPos={ballX} xPos={aiPaddleX} setXPos={setAiPaddleX}/>
                    <Ball run={run} ballX={ballX} setBallX={setBallX} ballZ={ballZ} setBallZ={setBallZ} playerPaddleX={playerPaddleX} aiPaddleX={aiPaddleX} setScore={setScore}/>
                    <Field />
                    <FanStand fieldLength={FIELD_LENGTH} fieldWidth={FIELD_WIDTH} />
                </Canvas>
        </Wrapper>
    );
}