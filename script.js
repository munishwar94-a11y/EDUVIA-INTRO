/* ==========================================
   EDUVIA — 30 SECOND CINEMATIC TIMELINE
   MEPCO SCHLENK ENGINEERING COLLEGE
========================================== */

const scenes = [
    document.querySelector(".scene-one"),
    document.querySelector(".scene-two"),
    document.querySelector(".scene-three"),
    document.querySelector(".scene-four"),
    document.querySelector(".scene-five"),
    document.querySelector(".scene-six")
];

const progress = document.getElementById("progress");
const music = document.getElementById("music");

const SCENE_TIME = 5000;
const TOTAL_TIME = 30000;

let startTime = null;
let animationFrame = null;
let currentScene = -1;
let started = false;


/* ==========================================
   SHOW SCENE
========================================== */

function showScene(index) {

    scenes.forEach(scene => {
        scene.classList.remove("active");
    });

    if (scenes[index]) {
        scenes[index].classList.add("active");
    }

    currentScene = index;
}


/* ==========================================
   START MUSIC
========================================== */

function startMusic() {

    if (!music) return;

    music.currentTime = 0;
    music.volume = 0.65;

    music.play().catch(() => {
        console.log("Click the page once to enable music.");
    });
}


/* ==========================================
   MAIN TIMELINE
========================================== */

function playTimeline(timestamp) {

    if (!startTime) {
        startTime = timestamp;
    }

    const elapsed = timestamp - startTime;


    /* --------------------------------------
       PROGRESS BAR
    -------------------------------------- */

    const percentage =
        Math.min(
            (elapsed / TOTAL_TIME) * 100,
            100
        );

    progress.style.width = percentage + "%";


    /* --------------------------------------
       CURRENT SCENE
    -------------------------------------- */

    let sceneIndex =
        Math.floor(elapsed / SCENE_TIME);

    if (sceneIndex > 5) {
        sceneIndex = 5;
    }


    /* --------------------------------------
       CHANGE SCENE
    -------------------------------------- */

    if (sceneIndex !== currentScene) {

        showScene(sceneIndex);

    }


    /* --------------------------------------
       CONTINUE
    -------------------------------------- */

    if (elapsed < TOTAL_TIME) {

        animationFrame =
            requestAnimationFrame(playTimeline);

    } else {

        finishIntro();

    }
}


/* ==========================================
   START INTRO
========================================== */

function startIntro() {

    if (started) return;

    started = true;

    cancelAnimationFrame(animationFrame);

    startTime = null;

    currentScene = -1;

    showScene(0);

    startMusic();

    animationFrame =
        requestAnimationFrame(playTimeline);
}


/* ==========================================
   FINISH
========================================== */

function finishIntro() {

    cancelAnimationFrame(animationFrame);

    progress.style.width = "100%";

    showScene(5);

}


/* ==========================================
   START WHEN PAGE LOADS
========================================== */

window.addEventListener("load", () => {

    showScene(0);

    /*
       Small delay makes the opening
       feel more cinematic.
    */

    setTimeout(() => {

        startIntro();

    }, 500);

});


/* ==========================================
   BROWSER AUDIO AUTOPLAY FIX
========================================== */

document.addEventListener("click", () => {

    if (music && music.paused) {

        music.play().catch(() => {});

    }

}, { once: true });


/* ==========================================
   KEYBOARD CONTROLS
========================================== */

document.addEventListener("keydown", event => {

    /*
       Press R to restart the intro.
    */

    if (
        event.key === "r" ||
        event.key === "R"
    ) {

        started = false;

        startTime = null;

        currentScene = -1;

        startIntro();

    }

});