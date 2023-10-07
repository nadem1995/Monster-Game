function getRandomValue(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

const app = Vue.createApp({
    data() {
        return {
            monsterHealth: 100,
            playerHealth: 100,
            currentRound: 0,
            isDisabled: true,
            healCount: 3,
            winner: null,
            logMessages:[],
        }
    },
    watch: {
        currentRound(newValue, oldValue) {
            if (newValue % 3 == 0) {
                this.isDisabled = false
            }
        },
        monsterHealth(vlaue) {
            if (vlaue<=0 && this.playerHealth<=0) {
                this.winner = 'draw';
            } else if (vlaue<=0) {
               this.winner='you win'
            }

        },
        playerHealth(vlaue) {
            if (vlaue <=0 && this.monsterHealth <= 0) {
                this.winner = 'draw';
            } else if (vlaue <= 0) {
                this.winner = 'you losse'
            }
        },

    },
    computed: {
        monsterHealthLength() {
            if (this.monsterHealth <= 0) {
                
                return { width: '0%' };
                
            } else {
                return { width: this.monsterHealth + '%' };

            }
        },

        playerHealthLength() {
            if (this.playerHealth <= 0) {
                return {
                    width: '0%'
                }

            } else {
                return { width: this.playerHealth + '%' };
                
            }
        },

        canHeal() {
            return this.healCount
        }
    },

    methods: {
        attackMonster() {
            this.currentRound++;
            const attackValue = getRandomValue(5, 12);
            this.addLogMessage('attack', 'monster', attackValue);
            this.monsterHealth -= attackValue;
            this.attackPlayer();
        },
        attackPlayer() {
            const attackValue = getRandomValue(8, 15);
            this.addLogMessage('attack', 'player', attackValue);
            this.playerHealth -= attackValue;
        },

        specialAttack() {
            this.isDisabled = !this.isDisabled;
            const attackValue = getRandomValue(10, 25);
            this.addLogMessage('attack', 'monster', attackValue);
            this.monsterHealth -= attackValue;
            this.attackPlayer();
        },
        healPlayer() {
            if (this.healCount >= 1) {
                this.healCount--;
            }
            const healValue = getRandomValue(8, 25);
            if (healValue + this.playerHealth >= 100) {
                this.playerHealth = 100;
            this.addLogMessage('heal', 'player', healValue);

            } else {
                this.playerHealth += healValue;
            this.addLogMessage('heal', 'player', healValue);

            }
        },

        restartGame() {
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.winner = null;
            currentRound = 0;
            healCount = 3;
            this.logMessages = [];
        },
        surrender() {
            this.winner = 'you losse';
        },
        addLogMessage(who, what, vlaue) {
            this.logMessages.unshift({
                actionBy: who,
                actionType: what,
                actionValue:vlaue,
            })
        }
    },

})

app.mount('#game');