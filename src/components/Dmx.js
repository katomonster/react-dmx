import React, { Component } from 'react';
import './../App.css';

import TempoUI from './TempoUI';
import PatternUI from './PatternUI';
import SwingUI from './SwingUI';
import StartStopUI from './StartStopUI';
import BassDrum from './BassDrum';
import SnareDrum from './SnareDrum';
import Clap from './Clap';
import ClosedHat from './ClosedHat';
import OpenHat from './OpenHat';

class Dmx extends Component {
    constructor() {
        super();

        const SRC_URL = '';

        this.baseArray   = [...Array(16)];
        this.subdivision = 4;
        this.minuteToMil = 60000;
        this.timer       = "";
        this.monoAudio   = new Audio();
        this.handleStartStop = this.handleStartStop.bind(this)

        this.state = {
            tempo: 120,
            audioSrc: "",
            interval: Math.round((this.minuteToMil / 120) / this.subdivision),
            count: 0,
            swing: false,
            isPlaying: false
        };

        this.sounds = {
            'kick':     {'src': SRC_URL + 'samples/03_BASS_01.wav',       'volume': 1   },
            'snare':    {'src': SRC_URL + 'samples/06_SNARE_01.wav',      'volume': 1   },
            'clap':     {'src': SRC_URL + 'samples/26_CLAP.wav',          'volume': 0.1 },
            'clHat':    {'src': SRC_URL + 'samples/09_HI-HAT_CLOSED.wav', 'volume': 0.2 },
            'opHat':    {'src': SRC_URL + 'samples/11_HI-HAT_OPEN.wav',   'volume': 0.07},
            'yeah':     {'src': SRC_URL + 'samples/awyeah.wav',           'volume': 0.4 },
            'feel':     {'src': SRC_URL + 'samples/canyoufeelit.wav',     'volume': 0.4 },
            'check':    {'src': SRC_URL + 'samples/checkthisout.wav',     'volume': 0.4 },
            'here':     {'src': SRC_URL + 'samples/herewego.wav',         'volume': 0.4 },
            'oww':      {'src': SRC_URL + 'samples/oww.wav',              'volume': 0.4 },
            'woo':      {'src': SRC_URL + 'samples/woo.wav',              'volume': 0.4 },
            'hiTom':    {'src': SRC_URL + 'samples/12_TOM_01.wav',        'volume': 0.3 },
            'midTom':   {'src': SRC_URL + 'samples/14_TOM_03.wav',        'volume': 0.3 },
            'loTom':    {'src': SRC_URL + 'samples/17_TOM_06.wav',        'volume': 0.3 },
            'cowbell':  {'src': SRC_URL + 'samples/808cowbell.wav',       'volume': 0.5 }
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
        this.startButton = document.querySelector('.start-stop button');
        this.loadPattern();
        this.handleTempoInput();
        this.bindDrumKeys();
    }

    render() {
        return (
            <section>
                <TempoUI tempo={this.state.tempo} onChange={(e) => this.handleTempo(e)}></TempoUI>
                <PatternUI onClick={(e) => this.togglePattern(e)}></PatternUI>
                <SwingUI onClick={(e) => this.handleSwing(e)} swing={this.state.swing}></SwingUI>
                <StartStopUI onClick={this.handleStartStop} isPlaying={this.state.isPlaying}></StartStopUI>
                <BassDrum baseArray={this.baseArray} onClick={(e) => this.handleButtonClick(e)}></BassDrum>
                <SnareDrum baseArray={this.baseArray} onClick={(e) => this.handleButtonClick(e)}></SnareDrum>
                <Clap baseArray={this.baseArray} onClick={(e) => this.handleButtonClick(e)}></Clap>
                <ClosedHat baseArray={this.baseArray} onClick={(e) => this.handleButtonClick(e)}></ClosedHat>
                <OpenHat baseArray={this.baseArray} onClick={(e) => this.handleButtonClick(e)}></OpenHat>
                <div className="glow hide"></div>
            </section>
        );
    }

    handleStartStop() {
        const $glow = document.querySelector('.glow');

        this.setState({isPlaying: !this.state.isPlaying});

        if (!this.state.isPlaying) {
            $glow.classList.remove('hide');
            loop(this);
        } else {
            clearTimeout(this.timer);
            this.setState({count: 0});
            document.querySelector('.glow').classList.add('hide');

            for (const $simpleButton of document.querySelectorAll('.simple-button')) {
                $simpleButton.classList.remove('on');
            }
        }

        function loop($this) {
            $this.timer = setTimeout(function() {
                if ($this.state.count === $this.subdivision * 4) $this.setState({count: 0});
                $this.playSubdiv($this.state.count);
                $this.setState({
                    count: $this.state.count + 1,
                    interval: Math.round(($this.minuteToMil / $this.state.tempo) / $this.subdivision)
                });
                loop($this);
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

        $button.blur();
    }

    handleSwing(e) {
        e.target.blur();
        this.setState({swing: !this.state.swing});
    }

    loadPattern() {
        const $rows = document.querySelectorAll('.row');

        for (let i = 0; i < $rows.length; i++) {
            const $rowButtons = $rows[i].querySelectorAll('button');

            for (let j = 0; j < $rowButtons.length; j++) {
                if (this.pattern[i].seq[j] === 1) {
                    $rowButtons[j].classList.add('active');
                }
            }
        }
    }

    togglePattern(e) {
        const $target = e.target;
        $target.classList.toggle('active');
        if ($target.classList.contains('active')) {
            this.loadPattern();
        } else {
            const $rowButtons = document.querySelectorAll('.row button');

            for (const $button of $rowButtons) {
                if ($button.classList.contains('active')) $button.classList.remove('active');
            }
        }
    }

    handleTempo(e) {
        const newTempo = e.target.value;

        e.target.blur();

        this.setState({
            tempo: newTempo,
            interval: Math.round((this.minuteToMil / newTempo) / this.subdivision)
        });
    }

    handleTempoInput() {
        document.onkeydown = (e) => {
            e = e || window.event;

            e.target.blur();

            const $input = document.querySelector('.tempo input');
            const curTempo = Number($input.value);

            let tempo;

            switch (e.keyCode) {
                case 38: // up arrow
                    tempo = curTempo + 1;
                    $input.value = tempo;
                    break;
                case 40: // down arrow
                    tempo = curTempo - 1;
                    $input.value = tempo;
                    break;
                case 37: // left arrow
                    tempo = curTempo - 1;
                    $input.value = tempo;
                    break;
                case 39:  // right arrow
                    tempo = curTempo + 1;
                    $input.value = tempo;
                    break;

                default:
                    tempo = this.state.tempo;
            }
            this.setState({ tempo: tempo });
        };
    }

    bindDrumKeys() {
        window.addEventListener("keydown", () => {
            if (document.querySelector('.tempo input') === document.activeElement) {
                return;
            }

            switch (window.event.keyCode) {
                case 49:
                    this.trigger(this.sounds.kick);
                    break;
                case 50:
                    this.trigger(this.sounds.snare);
                    break;
                case 51:
                    this.trigger(this.sounds.clap);
                    break;
                case 52:
                    this.trigger(this.sounds.cowbell);
                    break;
                case 53:
                    this.trigger(this.sounds.hiTom);
                    break;
                case 54:
                    this.trigger(this.sounds.midTom);
                    break;
                case 55:
                    this.trigger(this.sounds.loTom);
                    break;
                case 56:
                    this.triggerMono(this.sounds.yeah);
                    break;
                case 57:
                    this.triggerMono(this.sounds.oww);
                    break;
                case 48:
                    this.triggerMono(this.sounds.woo);
                    break;
                case 32:

                    this.startButton.blur();
                    this.startButton.click();
                    break;
                default:
                    //
            }
        });
    }

    triggerMono(sound, count) {
        this.monoAudio.src    = sound.src;
        this.monoAudio.volume = sound.volume;

        this.playSound(this.monoAudio);
    }

    playSound(audio) {
        const $glow = document.querySelector('.glow');

        audio.play();
        $glow.classList.remove('hide');

        setTimeout(function () {
            $glow.classList.add('hide');
        }, this.state.interval - 5);
    }

    trigger(sound, count) {
        const $this  = this;
        const audio  = new Audio();
        audio.src    = sound.src;
        audio.volume = sound.volume;

        if (this.state.swing && (this.state.count % 2 === 1)) {
            setTimeout(function () {
                $this.playSound(audio); //delayed trigger
            }, this.state.interval / (Math.random() * 3 + 2));
        } else {
            this.playSound(audio); //normal
        }
    }

    playSubdiv(count) {
        const rows = document.getElementsByClassName('row');

        for (let i = 0; i < rows.length; i++) {
            const $buttons = rows[i].getElementsByClassName('simple-button');

            for (let j = 0; j < $buttons.length; j++) {
                const $button = $buttons[j];
                $button.classList.remove('on');
                if (j === count) {
                    if ($button.className.match(/(^| )active( |$)/)) {
                        if ($button.className.match(/(^| )kick( |$)/)) this.trigger(this.sounds.kick, count);
                        else if ($button.className.match(/(^| )snare( |$)/)) this.trigger(this.sounds.snare, count);
                        else if ($button.className.match(/(^| )clhat( |$)/)) this.trigger(this.sounds.clHat, count);
                        else if ($button.className.match(/(^| )ophat( |$)/)) this.trigger(this.sounds.opHat, count);
                        else if ($button.className.match(/(^| )clap( |$)/)) this.trigger(this.sounds.clap, count);
                    }
                    $button.classList.add('on');
                }
            }
        }
    }
}

export default Dmx;
