document.addEventListener("DOMContentLoaded", function () {
  var lovelyCards = document.querySelector(".lovely-cards");
  lovelyCards.classList.remove("invisible");

  const audioPlayer = document.getElementById("audioPlayer");

  // Set the default volume to 50%
  audioPlayer.volume = 0.5;

  // Add an event listener to handle the play/pause toggle
  document.getElementById("page5").addEventListener("click", function () {
    if (audioPlayer.paused) {
      audioPlayer.play();
    } else {
      audioPlayer.pause();
    }
  });

  // Add an event listener to handle the audio ended event
  audioPlayer.addEventListener("ended", function () {
    // Restart the audio when it ends
    audioPlayer.currentTime = 0;
    audioPlayer.play();
  });
});

function loco() {
  gsap.registerPlugin(ScrollTrigger);

  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true,
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector("#main").style.transform
      ? "transform"
      : "fixed",
  });

  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();
}
loco();

var h1Element = document.querySelector("#page2>h1");
var lines = h1Element.innerHTML.split("<br>");

var clutter = "";

lines.forEach(function (line, index) {
  var characters = line.split("");
  characters.forEach(function (dets) {
    clutter += `<span>${dets}</span>`;
  });

  // Add a line break if it's not the last line
  if (index < lines.length - 1) {
    clutter += "<br> <br>";
  }
});

h1Element.innerHTML = clutter;

gsap.to("#page2>h1>span", {
  scrollTrigger: {
    trigger: `#page2`,
    start: `20% 80%`,
    end: `bottom bottom`,
    scroller: `#main`,
    scrub: 2,
  },
  stagger: 2,
  color: `#000`,
});

gsap.from(".dear", {
  scrollTrigger: {
    trigger: `#page2`,
    start: `top 80%`,
    end: `20% bottom`,
    scroller: `#main`,
  },
  duration: 1,
  opacity: 0,
  y: 150,
});

const tl = gsap.timeline();
tl.from(".title", {
  duration: 1,
  delay: 0.5,
  opacity: 0,
  y: 50,
});

tl.from(".container", {
  duration: 1,
  delay: 0.5,
  opacity: 0,
  y: 50,
});

// Check if the device is a desktop
function isDesktop() {
  return window.innerWidth >= 1024; // Adjust the threshold as needed
}

let tl1 = gsap.timeline({
  scrollTrigger: {
    trigger: "#page3",
    start: "50% 50%",
    end: "100% 50%",
    pin: isDesktop(),
    scroller: "#main",
    scrub: 0.5,
    // markers: true,
  },
});

tl1.to("#img1", {
  top: "-120%",
});

tl1.to("#img4", {
  top: "-110%",
});

tl1.to("#img2", {
  top: "5%",
});

tl1.to("#img5", {
  top: "10%",
});

let tl2 = gsap.timeline({
  scrollTrigger: {
    trigger: "#page4",
    start: "-50% 50%",
    end: "100% 50%",
    scroller: "#main",
    scrub: true,
  },
});

tl2.to("#img3", {
  top: "50%",
});

tl2.to("#img6", {
  top: "55%",
  duration: 5,
});

let tl3 = gsap.timeline({
  scrollTrigger: {
    trigger: ".letter",
    start: "10% center",
    end: "150% bottom",
    scrub: true,
    scroller: "#main",

    // markers: true,
  },
});

tl3
  .to("#letterTwo", {
    rotateX: "0deg",
  })
  .to("#letterThree", {
    rotateX: "0deg",
  })
  .to(
    ".paper",
    {
      scale: "0.8",
    },
    "sa"
  )
  .to(".rose", {
    scale: "1",
    rotation: 20,
    duration: 1,
  });

function handleInput(currentField) {
  const currentInput = document.getElementById(`pin${currentField}`);
  const nextField = currentField < 4 ? currentField + 1 : null;

  currentInput.addEventListener("input", function (event) {
    if (nextField && currentInput.value.length === 1) {
      document.getElementById(`pin${nextField}`).focus();
    }
  });

  currentInput.addEventListener("keydown", function (event) {
    if (event.key === "Backspace" || event.key === "Delete") {
      if (currentInput.value.length === 0 && currentField > 1) {
        document.getElementById(`pin${currentField - 1}`).focus();
      }
    } else if (nextField && currentInput.value.length === 1) {
      document.getElementById(`pin${nextField}`).focus();
    }
  });
}

function checkPassword() {
  const enteredPassword = Array.from({ length: 4 }, (_, i) =>
    document.getElementById(`pin${i + 1}`).value.toLowerCase()
  ).join("");

  const correctPassword = "nong";

  if (enteredPassword === correctPassword) {
    document.getElementById("pinContainer").style.display = "none";
    document.getElementById("submitButton").style.display = "none";
    document.getElementById("secretLetter").style.display = "block";

    // Add a class to #page4 after successful login
    document.getElementById("page4").classList.add("logged-in");

    // Hide the element with class "paper-title sc"
    document.querySelector(".paper-title.sc").style.display = "none";

    // Show the element with class "paper-con sc"
    document.querySelector(".paper-con.sc").style.display = "block";

    // Refresh ScrollTrigger and update Locomotive Scroll
    ScrollTrigger.refresh();
    locoScroll.update();
  } else {
    alert("You are not Wu Fang. What are you trying to do?");
  }
}

// Lovely-card popup

const lovely = document.querySelector(".lovely");
const close = document.querySelector(".close");
const cardsContainer = document.querySelector(".lovely-cards");
const title = document.querySelector(".title");

const tl4 = gsap.timeline({
  paused: true,
  reversed: true,
  onStart: function () {
    cardsContainer.style.pointerEvents = "all";
    gsap.to(title, { duration: 1, filter: "blur(10px)" });
  },
  onReverseComplete: function () {
    cardsContainer.style.pointerEvents = "none";
    gsap.to(title, { duration: 1, filter: "blur(0px)" });
  },
});

tl4
  .from(".lovely-cards .card", {
    duration: 1.5,
    y: 1000,
    scale: 0,
    stagger: { amount: 0.3 },
    ease: "power4.inOut",
  })
  .from(
    ".close",
    {
      duration: 0.5,
      scale: 0,
      delay: 1,
    },
    "<"
  );

lovely.addEventListener("click", function () {
  if (tl4.reversed()) {
    tl4.play();
  } else {
    tl4.reverse();
  }
});

close.addEventListener("click", function () {
  tl4.reverse();
});

document.body.addEventListener("click", function (event) {
  if (!lovely.contains(event.target) && !tl4.reversed()) {
    tl4.reverse();
  }
});
