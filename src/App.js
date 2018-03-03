import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor() {
    super();

    this.baseArray = [...Array(16)];
    this.subdivision = 4;
    this.minuteToMil = 60000;
    this.timer;

    this.state = {
      tempo: 120,
      audioSrc: "",
      interval: Math.round((this.minuteToMil / 120) / this.subdivision),
      count: 0
    };

    this.sounds = {
        'kick':     {'src': 'http://katomonster.com/dmx/assets/samples/03_BASS_01.wav',       'volume': 1   },
        'snare':    {'src': 'http://katomonster.com/dmx/assets/samples/06_SNARE_01.wav',      'volume': 1   },
        'clap':     {'src': 'http://katomonster.com/dmx/assets/samples/26_CLAP.wav',          'volume': 0.1 },
        'clHat':    {'src': 'http://katomonster.com/dmx/assets/samples/09_HI-HAT_CLOSED.wav', 'volume': 0.2 },
        'opHat':    {'src': 'http://katomonster.com/dmx/assets/samples/11_HI-HAT_OPEN.wav',   'volume': 0.07},
        'yeah':     {'src': 'http://katomonster.com/dmx/assets/samples/awyeah.wav',           'volume': 0.4 },
        'feel':     {'src': 'http://katomonster.com/dmx/assets/samples/canyoufeelit.wav',     'volume': 0.4 },
        'check':    {'src': 'http://katomonster.com/dmx/assets/samples/checkthisout.wav',     'volume': 0.4 },
        'here':     {'src': 'http://katomonster.com/dmx/assets/samples/herewego.wav',         'volume': 0.4 },
        'oww':      {'src': 'http://katomonster.com/dmx/assets/samples/oww.wav',              'volume': 0.4 },
        'woo':      {'src': 'http://katomonster.com/dmx/assets/samples/woo.wav',              'volume': 0.4 },
        'hiTom':    {'src': 'http://katomonster.com/dmx/assets/samples/12_TOM_01.wav',        'volume': 0.3 },
        'midTom':   {'src': 'http://katomonster.com/dmx/assets/samples/14_TOM_03.wav',        'volume': 0.3 },
        'loTom':    {'src': 'http://katomonster.com/dmx/assets/samples/17_TOM_06.wav',        'volume': 0.3 },
        'cowbell':  {'src': 'http://katomonster.com/dmx/assets/samples/808cowbell.wav',       'volume': 0.5 }
    };

    this.pattern = [
        {'name': 'kick',    'seq': [1,0,1,0,0,0,0,0,1,0,0,0,0,0,1,0]},
        {'name': 'snare',   'seq': [0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0]},
        {'name': 'clap',    'seq': [0,0,0,0,1,1,0,0,1,0,0,1,0,0,1,0]},
        {'name': 'clHat',   'seq': [1,0,1,0,1,0,1,0,0,1,0,1,1,0,1,0]},
        {'name': 'opHat',   'seq': [0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1]}
    ];

    
  }

  componentDidMount() {
    const init = this.initMe();
    this.trigger = init.trigger;
    this.playSubdiv = init.playSubdiv;
    this.handleTempo = init.handleTempo;
  }

  render() {
    return (
      <section>
        <article className="tempo">
            <input onChange={(e) => this.handleTempo(e)} value = {this.state.tempo} />
            <label>TEMPO</label>
        </article>
        <article className="toggle-pattern top-btn">
            <button className="active">PATTERN</button>
            <span>PATTERN</span>
        </article>
        <article className="swing top-btn">
            <button>SWING</button>
            <span>SWING</span>
        </article>
        <article className="start-stop top-btn">
            <button onClick={(e) => this.handleStartStop(e)}>START/STOP</button>
            <span>START/STOP</span>
        </article>
        <article className='row one'>
            <span>BASS</span>
            {this.baseArray.map((elem, i) => <button className="kick simple-button" key={i} onClick={(e) => this.handleButtonClick(e)}>Kick</button> )}
        </article>
        <article className='row two'>
            <span>SNARE</span>
            {this.baseArray.map((elem, i) => <button className="snare simple-button" key={i}  onClick={(e) => this.handleButtonClick(e)}>Snare</button> )}
        </article>
        <article className='row three'>
            <span>CLAP</span>
            {this.baseArray.map((elem, i) => <button className="clap simple-button" key={i}  onClick={(e) => this.handleButtonClick(e)}>Clap</button> )}
        </article>
        <article className='row four'>
            <span>HI-HAT A</span>
            {this.baseArray.map((elem, i) => <button className="clhat  simple-button" key={i}  onClick={(e) => this.handleButtonClick(e)}>Closed Hat</button> )}
        </article>
        <article className='row five'>
            <span>HI-HAT B</span>
            {this.baseArray.map((elem, i) => <button className="ophat simple-button" key={i} onClick={(e) => this.handleButtonClick(e)}>Opened Hat</button> )}
        </article>
        <div className="glow hide"></div>
      </section>
    );
  }

handleStartStop(e) {
    const $glow = document.querySelector('.glow');
    const $this = this;

    let interval  = Math.round((this.minuteToMil / this.state.tempo) / this.subdivision);

    let init = new Date().getTime();
    e.target.classList.toggle('active');
    this.handleTempo(init);
    if (e.target.classList.contains('active')) {
        $glow.classList.remove('hide');
        loop();
    } else {
        clearTimeout(this.timer);
        this.setState({count: 0});
        document.querySelector('.glow').classList.add('hide');

        for (const $simpleButton of document.querySelectorAll('.simple-button')) {
            $simpleButton.classList.remove('on');
        }
    }

    function loop() {
        console.log('loop');
        $this.timer = setTimeout(function() {
            const init2 = new Date().getTime();
            if ($this.state.count === $this.subdivision * 4) $this.setState({count: 0});
            $this.playSubdiv($this.state.count);
            $this.handleTempo(init2);
            $this.setState({count: $this.state.count + 1});
            loop();
        }, $this.state.interval);
    }
}

handleButtonClick(e) {
    const $button = e.currentTarget;
    $button.classList.toggle('active');

    if ($button.className.match(/(^| )kick( |$)/)) this.trigger(this.sounds.kick);
    else if ($button.className.match(/(^| )snare( |$)/)) this.trigger(this.sounds.snare);
    else if ($button.className.match(/(^| )clhat( |$)/)) this.trigger(this.sounds.clHat);
    else if ($button.className.match(/(^| )ophat( |$)/)) this.trigger(this.sounds.opHat);
    else if ($button.className.match(/(^| )clap( |$)/)) this.trigger(this.sounds.clap);
}


  initMe() {
    const minuteToMil = 60000;
    const subdivision = 4;
    const monoAudio   = new Audio();
    const $this       = this;

    const $startButton = document.querySelector('.start-stop button');

    //let timer;


    let swing         = false;
    let tempo         = 60;
    let interval      = Math.round((minuteToMil / tempo) / subdivision);

    function initAudioPlayer() {
        //handleStartStop();
        handleVolInput();
        bindDrumKeys();
        togglePattern();
        handleSwing();
    }

    function handleSwing() {
        document.querySelector('.swing button').addEventListener('click', (e) => {
            e.target.classList.toggle('active');
            swing = !swing;
        });
    }

    function loadPattern() {
        const $rows = document.querySelectorAll('.row');

        for (let i = 0; i < $rows.length; i++) {
            const $rowButtons = $rows[i].querySelectorAll('button');

            for (let j = 0; j < $rowButtons.length; j++) {
                if ($this.pattern[i].seq[j] === 1) {
                    $rowButtons[j].classList.add('active');
                }
            }
        }
    }

    function togglePattern() {
        loadPattern();

        document.querySelector('.toggle-pattern button').addEventListener('click', (e) => {
            const $target = e.target;
            $target.classList.toggle('active');
            if ($target.classList.contains('active')) {
                loadPattern();
            } else {
                const $rowButtons = document.querySelectorAll('.row button');

                for (const $button of $rowButtons) {
                    if ($button.classList.contains('active')) $button.classList.remove('active');
                }
            }
        });
    }

    function handleStartStop() {
        const $glow = document.querySelector('.glow');
        let count = 0;
        let timer;

        $startButton.addEventListener('click', function(e) {
            let init = new Date().getTime();
            $startButton.classList.toggle('active');
            handleTempo(init);
            if ($startButton.classList.contains('active')) {
                $glow.classList.remove('hide');
                loop();
            } else {
                clearTimeout(timer);
                count = 0;
                document.querySelector('.glow').classList.add('hide');

                for (const $simpleButton of document.querySelectorAll('.simple-button')) {
                    $simpleButton.classList.remove('on');
                }
            }

            function loop() {
                timer = setTimeout(function() {
                    const init2 = new Date().getTime();
                    if (count === subdivision * 4) count = 0;
                    playSubdiv(count);
                    handleTempo(init2);
                    count++;
                    loop();
                }, interval);
            }
        });
    }

    function handleTempo(init) {
        const diff = new Date().getTime() - init;

        // tempo = document.querySelector('.tempo input').value;
        // interval = Math.round((minuteToMil / tempo) / subdivision - diff);
        const newTempo = document.querySelector('.tempo input').value;

        this.setState({
            tempo: newTempo,
            interval: Math.round((this.minuteToMil / newTempo) / this.subdivision)
        });
    }

    function handleVolInput() {
        document.onkeydown = function (e) {
            e = e || window.event;

            const $input = document.querySelector('.tempo input');
            const volume = Number($input.value);

            switch (e.keyCode) {
                case 38: // up arrow
                    tempo = volume + 1;
                    $input.value = tempo;
                    break;
                case 40: // down arrow
                    tempo = volume - 1;
                    $input.value = tempo;
                    break;
                case 37: // left arrow
                    tempo = volume - 1;
                    $input.value = tempo;
                    break;
                case 39:  // right arrow
                    tempo = volume + 1;
                    $input.value = tempo;
                    break;

                default:
                    tempo = 100;
            }
        };
    }

    function bindDrumKeys() {
        window.addEventListener("keydown", () => {
            if (document.querySelector('.tempo input') === document.activeElement) {
                return;
            }

            switch (window.event.keyCode) {
                case 49:
                    trigger($this.sounds.kick);
                    break;
                case 50:
                    trigger($this.sounds.snare);
                    break;
                case 51:
                    trigger($this.sounds.clap);
                    break;
                case 52:
                    trigger($this.sounds.cowbell);
                    break;
                case 53:
                    trigger($this.sounds.hiTom);
                    break;
                case 54:
                    trigger($this.sounds.midTom);
                    break;
                case 55:
                    trigger($this.sounds.loTom);
                    break;
                case 56:
                    triggerMono($this.sounds.yeah);
                    break;
                case 57:
                    triggerMono($this.sounds.oww);
                    break;
                case 48:
                    triggerMono($this.sounds.woo);
                    break;
                case 32:
                    $startButton.click();
                    break;
                default:
                    return false;
            }
        });
    }

    function triggerMono(sound, count) {
        monoAudio.src       = sound.src;
        monoAudio.volume    = sound.volume;

        playSound(monoAudio);
    }

    function trigger(sound, count) {
        const audio       = new Audio();
        audio.src       = sound.src;
        audio.volume    = sound.volume;

        if (swing && (count % 2 === 1)) {
            setTimeout(function () {
                playSound(audio); //delayed trigger
            }, $this.state.interval/(Math.random() * 3 + 2));
        } else {
            playSound(audio); //normal
        }
    }

    function playSound(audio) {
        const $glow = document.querySelector('.glow');

        audio.play();
        $glow.classList.remove('hide');

        setTimeout(function () {
            $glow.classList.add('hide');
        }, $this.stateinterval - 5);
    }

    function playSubdiv(count) {
        const rows = document.getElementsByClassName('row');

        for (let i = 0; i < rows.length; i++) {
            const $buttons = rows[i].getElementsByClassName('simple-button');

            for (let j = 0; j < $buttons.length; j++) {
                const $button = $buttons[j];
                $button.classList.remove('on');
                if (j === count) {
                    if ($button.className.match(/(^| )active( |$)/)) {
                        if ($button.className.match(/(^| )kick( |$)/)) trigger($this.sounds.kick, count);
                        else if ($button.className.match(/(^| )snare( |$)/)) trigger($this.sounds.snare, count);
                        else if ($button.className.match(/(^| )clhat( |$)/)) trigger($this.sounds.clHat, count);
                        else if ($button.className.match(/(^| )ophat( |$)/)) trigger($this.sounds.opHat, count);
                        else if ($button.className.match(/(^| )clap( |$)/)) trigger($this.sounds.clap, count);
                    }
                    $button.classList.add('on');
                }
            }
        }
    }
    initAudioPlayer();
    return { trigger, playSubdiv, handleTempo };
  }
}


export default App;
