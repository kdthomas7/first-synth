
let play, stop;
let synth;
let pitch = "C3"; //pitch of synth
let pSel; //pitch selector
let enAtk_sl, enDcy_sl, enSus_sl, enRel_sl; //ADSR slider vars
let enAtk = .1, enDcy = .1, enSus = .1, enRel = .1; //ADSR vars

function setup(){

  createCanvas(800,800);

  //on and off buttons
  on = createButton('On');
  on.position(20,20);
  on.mousePressed(synthOn);

  off = createButton('Off');
  off.position(60,20);
  off.mousePressed(synthOff);

  //select button
  pSel = createSelect();
  pSel.position(20,50);
  pitchSelSetUp();

  //envelope sliders
  envelopeSetUp();



  //create synth
  synth = new Tone.Synth().toMaster();
  //synth.oscillator.type = "pwm";
  Tone.Transport.scheduleRepeat((time) => {
	// use the callback time to schedule events
	//synth.oscillator.start(time).stop(time + 0.1);
  synth.triggerAttackRelease(pitch,enSus,time);
  //synthOn(time);
}, "4n");

  noLoop();
}//end setup

function draw(){
  background(255,255,255);
  text("Attack: " + enAtk.toString(), 20,90);
  text("Decay: " + enDcy.toString(), 20,140);
  text("Sustain: " + enSus.toString(), 20,190);
  text("Release: " + enRel.toString(), 20,240);
}//end draw

function envelopeSetUp(){
  enAtk_sl = createSlider(0,10,.1,.5);
  enAtk_sl.position(20,100);
  enAtk_sl.changed(()=>{
    enAtk = enAtk_sl.value();
    redraw();
    synth.envelope.attack = enAtk;
    synthUpdate();
  });

  enDcy_sl = createSlider(.1,10,.1,.5);
  enDcy_sl.position(20,150);
  enDcy_sl.changed(()=>{
    enDcy = enDcy_sl.value();
    redraw();
    synth.envelope.decay = enDcy;
    synthUpdate();
  });

  enSus_sl = createSlider(0,1,.1,.1);
  enSus_sl.position(20,200);
  enSus_sl.changed(()=>{
    enSus = enSus_sl.value();
    redraw();
    synth.envelope.sustain = enSus;
    synthUpdate();
  });

  enRel_sl = createSlider(.1,10,.1,.5);
  enRel_sl.position(20,250);
  enRel_sl.changed(()=>{
    enRel = enRel_sl.value();
    redraw();
    synth.envelope.sustain = enRel;
    synthUpdate();
  });

}

function pitchSelSetUp(){
  var letters = ['A','B','C','D','E','F','G'];

  octaves = ['1','2','3']; //character representation of each octave

  for(let i = 0; i<octaves.length; i++ ){//for each of the 3 octaves
    letters.forEach((letter, index) => { //for each letter/note
      if(letter === 'C' || letter === 'D' || letter === 'F' || letter === 'G' || letter === 'A'){
        note = letter + octaves[i];
        note_sharp = letter + '#' + octaves[i];
        pSel.option(note);
        pSel.option(note_sharp);
      }
      else{
        note = letter + octaves[i];
        pSel.option(note);
      }
    }); //end foreach letter
  }//end for each octave

  pSel.selected('C3');
  pSel.changed(()=>{
    pitch = pSel.value();
    synthUpdate();
  });
}

function synthOff(){
  synth.triggerRelease();
  Tone.Transport.stop();
}

function synthOn(time){
    //synth.triggerAttack(pitch, time);
    // transport must be started before it starts invoking events
    Tone.Transport.start(time);
}

function synthOn(){
    //synth.triggerAttack(pitch);
    Tone.Transport.start();
}

function synthUpdate(time){
  synth.triggerAttack(pitch, time);
}

function synthUpdate(){
  synth.triggerAttack(pitch);
}
