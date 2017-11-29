var canvas = document.getElementById("renderCanvas");
canvas.width = canvas.clientWidth;
canvas.height = canvas.clientHeight;

if (BABYLON.Engine.isSupported()) {

    var score = 0;
    var speed = 0.01;
    var scale = 1;
    var alpha;
    var started = true;
    var orientationGamma = 0;
    var orientationBeta = 0;
    var initialOrientationGamma = 0;
    var initialOrientationBeta = 0;

    var engine = new BABYLON.Engine(canvas, true);
    var scene = new BABYLON.Scene(engine);
    var light = new BABYLON.DirectionalLight("light", new BABYLON.Vector3(2, -10, 5), scene);
    var camera = new BABYLON.ArcRotateCamera("camera", 3 * Math.PI / 2.0, Math.PI / 4.0, 20.0, new BABYLON.Vector3(0, 0, 0), scene);

    scene.activeCamera = camera;
    alpha = camera.alpha;

    // Ball
    var ball = BABYLON.Mesh.CreateSphere("ball", 16, 1.0, scene, false);
    var ballMaterial = new BABYLON.StandardMaterial("ballMaterial", scene);
    ballMaterial.diffuseColor = new BABYLON.Color3(1, 0, 0);
    ballMaterial.diffuseTexture = new BABYLON.Texture("amiga.jpg", scene);
    ballMaterial.diffuseTexture.uScale = 3;
    ballMaterial.diffuseTexture.vScale = 4;
    ball.material = ballMaterial;
    ball.position = new BABYLON.Vector3(0, 0.5, 0);
    ball.renderingGroupId = 1;
    ball.rotationQuaternion = BABYLON.Quaternion.RotationYawPitchRoll(0, 0, 0);
    var animationScale = new BABYLON.Animation("scale", "scaling", 30, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
    animationScale.setKeys([{ frame: 0, value: new BABYLON.Vector3(1, 1, 1) }, { frame: 20, value: new BABYLON.Vector3(2.0, 2.0, 2.0) },
                            { frame: 40, value: new BABYLON.Vector3(1, 1, 1) }]);
    ball.animations.push(animationScale);

    // Playground
    var ground = BABYLON.Mesh.CreateGround("ground", 20, 20, 1, scene, false);
    var groundMaterial = new BABYLON.StandardMaterial("groundMaterial", scene);
    groundMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
    groundMaterial.diffuseTexture = new BABYLON.Texture("wood.png", scene);
    groundMaterial.diffuseTexture.uScale = 2;
    groundMaterial.diffuseTexture.vScale = 2;
    ground.material = groundMaterial;
    ground.receiveShadows = true;
    ground.renderingGroupId = 1;
    
    // Shadows
    var shadowCaster = new BABYLON.ShadowGenerator(1024, light);
    light.position = new BABYLON.Vector3(-4, 14, -12.5);
    shadowCaster.useVarianceShadowMap = true;
    shadowCaster.getShadowMap().renderList.push(ball);

    // Starfield
    var starfield = new BABYLON.ParticleSystem("particles", 4000, scene);
    starfield.particleTexture = new BABYLON.Texture("star.png", scene);
    starfield.minAngularSpeed = -4.5;
    starfield.maxAngularSpeed = 4.5;
    starfield.minSize = 0.5;
    starfield.maxSize = 1.0;
    starfield.minLifeTime = 0.5;
    starfield.maxLifeTime = 2.0;
    starfield.minEmitPower = 0.5;
    starfield.maxEmitPower = 1.0;
    starfield.emitRate = 600;
    starfield.blendMode = BABYLON.ParticleSystem.BLENDMODE_ONEONE;
    starfield.minEmitBox = new BABYLON.Vector3(-25, 0, -25);
    starfield.maxEmitBox = new BABYLON.Vector3(25, 0, 25);
    starfield.direction1 = new BABYLON.Vector3(0, 1, 0);
    starfield.direction2 = new BABYLON.Vector3(0, 1, 0);
    starfield.color1 = new BABYLON.Color4(0, 0, 0, 1);
    starfield.color2 = new BABYLON.Color4(1, 1, 1, 1);
    starfield.gravity = new BABYLON.Vector3(0, 5, 0);
    starfield.emitter = new BABYLON.Vector3(0, -2, 0);
    starfield.start();

    // Target
    var target = new BABYLON.ParticleSystem("particles", 4000, scene);
    target.particleTexture = new BABYLON.Texture("star.png", scene);
    target.minAngularSpeed = -4.5;
    target.maxAngularSpeed = 4.5;
    target.minSize = 0.5;
    target.maxSize = 3.0;
    target.minLifeTime = 0.5;
    target.maxLifeTime = 2.0;
    target.minEmitPower = 0.5;
    target.maxEmitPower = 1.0;
    target.emitRate = 200;
    target.blendMode = BABYLON.ParticleSystem.BLENDMODE_ONEONE;
    target.minEmitBox = new BABYLON.Vector3(-1, 0, -1);
    target.maxEmitBox = new BABYLON.Vector3(1, 0, 1);
    target.direction1 = new BABYLON.Vector3(0, 1, 0);
    target.direction2 = new BABYLON.Vector3(0, 1, 0);
    target.color1 = new BABYLON.Color4(1, 1, 0, 1);
    target.color2 = new BABYLON.Color4(1, 1, 1, 1);
    target.gravity = new BABYLON.Vector3(0, 5, 0);
    target.emitter = new BABYLON.Vector3(8, 0, 8);
    target.renderingGroupId = 1;
    target.start();
    
    // Ball trail
    var ballTrail = new BABYLON.ParticleSystem("particles", 400, scene);
    ballTrail.particleTexture = new BABYLON.Texture("star.png", scene);
    ballTrail.minAngularSpeed = -4.5;
    ballTrail.maxAngularSpeed = 4.5;
    ballTrail.minSize = 0.5;
    ballTrail.maxSize = 1.0;
    ballTrail.minLifeTime = 0.5;
    ballTrail.maxLifeTime = 1.0;
    ballTrail.minEmitPower = 0.5;
    ballTrail.maxEmitPower = 1.0;
    ballTrail.emitRate = 100;
    ballTrail.blendMode = BABYLON.ParticleSystem.BLENDMODE_ONEONE;
    ballTrail.minEmitBox = new BABYLON.Vector3(0, 0, 0);
    ballTrail.maxEmitBox = new BABYLON.Vector3(0, 0, 0);
    ballTrail.direction1 = new BABYLON.Vector3(0, 1, 0);
    ballTrail.direction2 = new BABYLON.Vector3(0, 1, 0);
    ballTrail.color1 = new BABYLON.Color4(1, 0, 0, 1);
    ballTrail.color2 = new BABYLON.Color4(1, 0, 0.1, 1);
    ballTrail.gravity = new BABYLON.Vector3(0, 0.5, 0);
    ballTrail.emitter = ball;
    ballTrail.renderingGroupId = 1;
    ballTrail.start();


    engine.runRenderLoop(function () {
        scene.render();
        
        if (!started) {
            return;
        }
        checkInput();
        checkCollisions();

        move();
    });

    window.addEventListener("resize", function () {
        engine.resize();
    });

    document.getElementById("gameOver").addEventListener("click", function() {
        started = true;
        document.getElementById("gameOver").className = "hidden";
        direction = new BABYLON.Vector3(0, 0, 0);
    });
    
    // Win
    var onWin = function() {
        target.emitter = new BABYLON.Vector3(16 * Math.random() - 8, 0, 16 * Math.random() - 8);
        score++;

        scene.beginAnimation(ball, 0, 40, false, 1.0);
        speed *= 1.1;

        camera.animations = [];
        var animationBeta = new BABYLON.Animation("alpha", "alpha", 30, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
        animationBeta.setKeys([{ frame: 0, value: alpha }, { frame: 20, value: alpha + Math.PI }]);
        camera.animations.push(animationBeta);

        alpha += Math.PI;
        
        scene.beginAnimation(camera, 0, 20, false, 2.0);
        scale *= -1;
        
        displayState();
    };

    var displayState = function() {
        document.getElementById("score").innerHTML = "Score: " + score;
        document.getElementById("speed").innerHTML = "speed: " + Math.floor(speed * 1000.0) / 10.0;
    };

    // Lose
    var onLose = function () {
        score = 0;
        
        ball.position = new BABYLON.Vector3(0, 0.5, 0);
        speed = 0.01;

        displayState();
        document.getElementById("gameOver").className = "";
        started = false;

        initialOrientationGamma = 0;
        initialOrientationBeta = 0;
        orientationGamma = 0;
        orientationBeta = 0;
        direction = new BABYLON.Vector3(0, 0, 0);
    };
    
    // Collisions
    var checkCollisions = function() {
        if (BABYLON.Vector3.Distance(ball.position, target.emitter) < 1.2) {
            onWin();
            return;
        }

        var point = ball.position.clone();
        point.y -= 0.5;
        if (!ground.intersectsPoint(point)) {
            onLose();
        }
    };

    // Keys
    var keys = [];
    var keysUp = [38];
    var keysDown = [40];
    var keysLeft = [37];
    var keysRight = [39];
    var direction = new BABYLON.Vector3(0, 0, 0);

    var checkInput = function () {
        // Keyboard
        for (var index = 0; index < keys.length; index++) {
            var keyCode = keys[index];

            if (keysLeft.indexOf(keyCode) !== -1) {
                direction.addInPlace(new BABYLON.Vector3(-speed * scale, 0, 0));
            } else if (keysUp.indexOf(keyCode) !== -1) {
                direction.addInPlace(new BABYLON.Vector3(0, 0, speed * scale));
            } else if (keysRight.indexOf(keyCode) !== -1) {
                direction.addInPlace(new BABYLON.Vector3(speed * scale, 0, 0));
            } else if (keysDown.indexOf(keyCode) !== -1) {
                direction.addInPlace(new BABYLON.Vector3(0, 0, -speed * scale));
            }
        }

        // Orientation
        if (orientationGamma) {
            var z = (initialOrientationBeta - orientationBeta) * 0.05;
            var x = (initialOrientationGamma - orientationGamma) * -0.05;
            direction.addInPlace(new BABYLON.Vector3(0, 0, z * speed * scale));
            direction.addInPlace(new BABYLON.Vector3(x * speed * scale, 0, 0));
        }
    };

    var move = function() {
        ball.position.addInPlace(direction);
        var rotationToApply = BABYLON.Quaternion.RotationYawPitchRoll(0, direction.z * 1.5, -direction.x * 1.5);
        ball.rotationQuaternion = rotationToApply.multiply(ball.rotationQuaternion);

        direction.scaleInPlace(0.95);
    };

    var onKeyDown = function (evt) {
        if (keysUp.indexOf(evt.keyCode) !== -1 ||
            keysDown.indexOf(evt.keyCode) !== -1 ||
            keysLeft.indexOf(evt.keyCode) !== -1 ||
            keysRight.indexOf(evt.keyCode) !== -1) {
            var index = keys.indexOf(evt.keyCode);

            if (index === -1) {
                keys.push(evt.keyCode);
            }
            evt.preventDefault();
        }
    };

    var onKeyUp = function (evt) {
        if (keysUp.indexOf(evt.keyCode) !== -1 ||
            keysDown.indexOf(evt.keyCode) !== -1 ||
            keysLeft.indexOf(evt.keyCode) !== -1 ||
            keysRight.indexOf(evt.keyCode) !== -1) {
            var index = keys.indexOf(evt.keyCode);

            if (index >= 0) {
                keys.splice(index, 1);
            }
            evt.preventDefault();
        }
    };

    window.addEventListener("keydown", onKeyDown, false);
    window.addEventListener("keyup", onKeyUp, false);

    // Orientation
    window.addEventListener("deviceorientation", moveBall);
    function moveBall(evt) {
        if (!started) {
            return;
        }

        if (!initialOrientationGamma) {
            initialOrientationGamma = evt.gamma;
            initialOrientationBeta = evt.beta;
        }

        orientationGamma = evt.gamma;
        orientationBeta = evt.beta;
    }

    window.addEventListener("devicemotion", detectShake);
    function detectShake(evt) {
        var accl = evt.acceleration;
        if (accl.x > 1.5 || accl.y > 1.5 || accl.z > 1.5) {
            // Tilt :)
            onLose();
        }
    }
}