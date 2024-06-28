import React, {useState} from "react";

export default function Contact() {

    return (
        <div>
            {`Hello! My name is Allen Anderson. I am a resident of Hudsonville, Michigan. 
            I am a software developer with ${new Date().getFullYear() - 2014} years experience and I am currently looking for a job. I am proficient in JavaScript, TypeScript, React, and Node.js. 
            I am also familiar with Python, Java, and C#. I am a quick learner and I am always looking to improve my skills. 
            I am a hard worker and I am always willing to go the extra mile to get the job done. I am a team player and I work well with others. 
            I am also a good communicator and I am able to explain complex concepts in a way that is easy to understand. 
            I am a problem solver and I am able to think outside the box to come up with creative solutions to difficult problems. 
            I am also a self-starter and I am able to work independently with minimal supervision. 
            I am a responsible and reliable person and I always strive to do my best in everything that I do. 
            I am passionate about technology and I am always looking for new and exciting opportunities to learn and grow as a developer.`}
            <a href="/Resume-Allen-Anderson.pdf">Click here to download my resume</a>
        </div>
    );
};