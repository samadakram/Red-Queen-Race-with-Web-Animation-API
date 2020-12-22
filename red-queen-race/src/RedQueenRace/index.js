import React, {useEffect} from 'react';
import './style.css';
import useWebAnimations from "@wellyshen/use-web-animations";

export const RedQueenRace = () => {

    var playbackrateRQ = 1;
    var playbackrateBG = 0;

    /* Background animations */
  const sceneryFrames =   [
    { transform: 'translateX(100%)' },
    { transform: 'translateX(-100%)' }   
  ];
  
  const sceneryTimingBackground = {
    duration: 36000,
    iterations: Infinity
  };
  
  const sceneryTimingForeground = {
    duration: 12000,
    iterations: Infinity
  };
  
//   var background1 = document.getElementById('background1');
  
//   var background1Movement = background1.animate(
//   sceneryFrames, sceneryTimingBackground);
//   background1Movement.currentTime = background1Movement.effect.timing.duration / 2;

const background1Movement = useWebAnimations({
    keyframes: sceneryFrames,
    timing: sceneryTimingBackground,
});
  
//   var background2 = document.getElementById('background2');
//   var background2Movement = background2.animate(
//   sceneryFrames, sceneryTimingBackground);

const background2Movement = useWebAnimations({
    keyframes: sceneryFrames,
    timing: sceneryTimingBackground,
});
  

//   var foreground1 = document.getElementById('foreground1');
//   var foreground2 = document.getElementById('foreground2');
  
//   var foreground1Movement = foreground1.animate(
//   sceneryFrames, sceneryTimingForeground);
//   foreground1Movement.currentTime = foreground1Movement.effect.timing.duration / 2;

const foreground1Movement = useWebAnimations({
    keyframes: sceneryFrames,
    timing: sceneryTimingForeground
});
  
//   var foreground2Movement = foreground2.animate(
//   sceneryFrames, sceneryTimingForeground);

const foreground2Movement = useWebAnimations({
    keyframes: sceneryFrames,
    timing: sceneryTimingForeground
});
  
  const spriteFrames = [
    { transform: 'translateY(0)' },
    { transform: 'translateY(-100%)' }   
  ];
  
//   var redQueen_alice_sprite = document.getElementById('red-queen_and_alice_sprite');
  
//   var redQueen_alice = redQueen_alice_sprite.animate(
//   spriteFrames, {
//     easing: 'steps(7, end)',
//     direction: "reverse",
//     duration: 600,
//     playbackRate: 1,
//     iterations: Infinity
//   });

const redQueen_alice = useWebAnimations({
    keyframes: spriteFrames,
    timing: {
        easing: 'steps(7, end)',
        direction: "reverse",
        duration: 600,
        playbackRate: 1,
        iterations: Infinity
    }
});
  
//   /* Alice tires so easily! 
//     Every so many seconds, reduce their playback rate so they slow a little. 
//   */
//   var sceneries = [foreground1Movement, foreground2Movement, background1Movement, background2Movement];
  
  const adjustBackgroundPlayback = () => {
    if (playbackrateRQ < .8) {
        playbackrateBG = (playbackrateBG / 2) * -1;
    } else if (playbackrateRQ > 1.2) {
        playbackrateBG = (playbackrateBG / 2);
    } else {
      playbackrateBG = 0;
    }
    foreground1Movement.getAnimation().playbackRate = playbackrateBG;   
    foreground2Movement.getAnimation().playbackRate = playbackrateBG;   
    background1Movement.getAnimation().playbackRate = playbackrateBG;   
    background2Movement.getAnimation().playbackRate = playbackrateBG;   
  };
//   adjustBackgroundPlayback();
  
//   /* If Alice and the Red Queen are running at a speed of 1, the background doesn't move. */
//   /* But if they fall under 1, the background slides backwards */
//   setInterval( function() {
//     /* Set decay */
//     if (redQueen_alice.playbackRate > .4) {
//       redQueen_alice.playbackRate *= .9;    
//     } 
//     adjustBackgroundPlayback();
//   }, 3000);
  
  useEffect(()=>{

    const fganimation = foreground1Movement.getAnimation();
    fganimation.currentTime = fganimation.effect.getTiming().duration / 2;

    const bganimation = foreground1Movement.getAnimation();
    bganimation.currentTime = bganimation.effect.getTiming().duration / 2;

    setInterval( function() {
        //     /* Set decay */
            if (playbackrateRQ > .4) {
                playbackrateRQ *= 0.9;
              redQueen_alice.getAnimation().playbackRate = playbackrateRQ;    
            } 
            adjustBackgroundPlayback();
          }, 3000);

      document.addEventListener("click", () => {
        playbackrateRQ *= 1.1;
        redQueen_alice.getAnimation().playbackRate *= playbackrateRQ;
        adjustBackgroundPlayback();
      } );
  });
  
//   document.addEventListener("click", goFaster);
//   document.addEventListener("touchstart", goFaster);

    return (
        <div className="wrapper">
            <div className="sky"></div>
            <div className="earth">
                <div id="red-queen_and_alice">
                    <img ref={redQueen_alice.ref} id="red-queen_and_alice_sprite" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/sprite_running-alice-queen_small.png" srcSet="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/sprite_running-alice-queen.png 2x" alt="Alice and the Red Queen running to stay in place." />
                </div>

                <div className="scenery" id="foreground1" ref={foreground1Movement.ref}>
                    <img id="palm3" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/palm3_small.png" srcSet="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/palm3.png 2x" alt="" />
                </div>
                <div className="scenery" id="foreground2" ref={foreground2Movement.ref}>
                    <img id="bush" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/bush_small.png" srcSet="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/bush.png 2x" alt="" />
                    <img id="w_rook_upright" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/w_rook_upright_small.png" srcSet="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/w_rook_upright.png 2x" alt="" />
                </div>
                <div className="scenery" id="background1" ref={background1Movement.ref}>
                    <img id="r_pawn_upright" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/r_pawn_upright_small.png" srcSet="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/r_pawn_upright.png 2x" alt="" />
                    <img id="w_rook" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/w_rook_small.png" srcSet="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/w_rook.png 2x" alt="" />
                    <img id="palm1" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/palm1_small.png" srcSet="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/palm1.png 2x" alt="" />
                </div>
                <div className="scenery" id="background2" ref={background2Movement.ref}>
                    <img id="r_pawn" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/r_pawn_small.png" srcSet="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/r_pawn.png 2x" alt="" />

                    <img id="r_knight" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/r_knight_small.png" srcSet="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/r_knight.png 2x" alt="" />
                    <img id="palm2" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/palm2_small.png" srcSet="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/palm2.png 2x" alt="" />
                </div>
            </div>
        </div>
    );
}