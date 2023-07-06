import DE from '@dreamirl/dreamengine';

class GameLogic extends DE.GameObject {
    constructor({...otherParams}) {
        super({
            automatisms: [['checkInputs', 'checkInputs']],
            checkInputs: () => {
                if (this.isActive) {
                    this.incrementScore(1)
                }
            },
            ...otherParams
        });
        this.refreshHightScore()
        this.reset()
    }

    refreshHightScore = () => {
        this.setHightScore(DE.Save.get('score') || 0)
    }

    setHightScore = (value) => {
        this.hightScore = value
        this.onHightScoreChanged(value)
    }

    reset = () => {
        this.score = 0
        this.chestPickup = 0
        this.isActive = true
    }

    incrementScore = (value) => {
        this.score += value
        this.onScoreChanged(this.score)
        this.checkHightScore()
        this.checkAchievements()
    }

    checkHightScore = () => {
        if ((this.hightScore) < this.score) {
            DE.Save.save('score',  this.score);
            this.setHightScore(this.score)
        }
    }

    checkAchievements = () => {
        DE.trigger( "games-datas", "point_total", 1 );
        DE.trigger( "games-datas", "point_total_beginer", 1 );
        if (this.score >= 10000) {
            DE.trigger( "games-datas", "point", 10000 );
            if (this.chestPickup === 0){
                DE.trigger( "games-datas", "point_no_chest", 10000 );
            }
        }
    }

    onScoreChanged = (value) => {}
    onHightScoreChanged = (value) => {}

}
  
export default GameLogic;
  