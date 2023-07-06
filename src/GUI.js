import DE from '@dreamirl/dreamengine';

class GUI extends DE.GameObject {
  constructor({ zindex = 10, ...otherParams }) {
    super({
      zindex: zindex,
      ...otherParams,
    });
    this.restartButton = new DE.GameObject({
      x: -750,
      y: 450,
      visible: false,
      zindex: 50,
      interactive: true,
      hitArea: new DE.PIXI.Rectangle(-225, -50, 450, 100),
      cursor: 'pointer',
      renderers: [
        new DE.RectRenderer(300, 80, '0xffffff', {
          lineStyle: [4, '0x000000', 1],
          fill: true,
          x: -150,
          y: -40,
        }),
        new DE.TextRenderer('restart', {
          textStyle: {
            fill: 'black',
            fontSize: 35,
            fontFamily: 'Snippet, Monaco, monospace',
            strokeThickness: 1,
            align: 'center',
          },
        }),
      ],
      pointerup: () => {
        this.onRestart();
      },
    });
    this.ScoreLabel = new DE.TextRenderer('score: 0', {
      x: 750,
      y: 450,
      textStyle: {
        fill: 'white',
        fontSize: 50,
        fontFamily: 'Snippet, Monaco, monospace',
        strokeThickness: 1,
        align: 'right',
      },
    });
    this.GameOverLabel = new DE.TextRenderer('GameOver', {
      x: 0,
      y: 0,
      visible: false,
      textStyle: {
        fill: 'white',
        fontSize: 100,
        fontFamily: 'Snippet, Monaco, monospace',
        strokeThickness: 4,
        align: 'right',
      },
    });
    this.HightScoreLabel = new DE.TextRenderer('Hight Score : ', {
      x: 0,
      y: 150,
      visible: false,
      textStyle: {
        fill: 'white',
        fontSize: 60,
        fontFamily: 'Snippet, Monaco, monospace',
        strokeThickness: 4,
        align: 'right',
      },
    });
    this.add(this.restartButton);
    this.addRenderer(this.GameOverLabel);
    this.addRenderer(this.HightScoreLabel);
    this.addRenderer(this.ScoreLabel);
    this.setScore(0);
  }

  setScore(value) {
    this.ScoreLabel.text = 'Score: ' + Math.round(value).toString() + 'pts';
  }

  setGameOver(value) {
    this.GameOverLabel.visible = value;
    this.restartButton.visible = value;
    this.HightScoreLabel.visible = value;
  }

  setHightScore(value) {
    this.HightScoreLabel.text =
      'Hight Score: ' + Math.round(value).toString() + 'pts';
  }

  onRestart() {}
}

export default GUI;
