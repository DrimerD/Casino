class Casino {
    constructor(numberSlotMachine,moneyCasinoMachine) {
        this.numberSlotMachine = numberSlotMachine;
        this.moneyCasinoMachine = moneyCasinoMachine;
        this.arrSlotMachine = [];

        const happy = this.findHappy(numberSlotMachine);
        for (let i = 1; i <= numberSlotMachine; i++) {
            this.arrSlotMachine[i] = new SlotMachine(moneyCasinoMachine/numberSlotMachine);
            this.arrSlotMachine[i].number = i;

            if (i === happy) {
                this.arrSlotMachine[i].happySlot = true;
            }
        }

        this.arrSlotMachine[0] = new SlotMachine(moneyCasinoMachine - (numberSlotMachine-1)*Math.floor(moneyCasinoMachine/numberSlotMachine));
        this.arrSlotMachine[0].number = 0;
    }

    findHappy(number) {
        const numberSlot = Math.floor((Math.random()*number));
        return numberSlot;
    }

    getMoneyCasino() {
        let sum = 0;
        for (let i = 0; i < this.arrSlotMachine.length; i++) {
            sum += this.arrSlotMachine[i].cash;
        }

        return sum;
    }

    setMoneyCasino(cash) {
        if (this.moneyCasino < cash) {
            return alert('You can\'t take so much money');
        }

        var needToTake = cash;
        var takenMoney = 0;

        this.sortSlotMachine();
        for (let i = 0; i < this.arrSlotMachine.length; i++) {
            if (needToTake > this.arrSlotMachine[i].moneyCasinoMachine) {
                takenMoney += this.arrSlotMachine[i].moneyCasinoMachine;
                needToTake += this.arrSlotMachine[i].moneyCasinoMachine;
                this.arrSlotMachine[i].moneyCasinoMachine = 0;
            } else {
                takenMoney += needToTake;
                this.arrSlotMachine[i].moneyCasinoMachine = this.arrSlotMachine[i].moneyCasinoMachine - needToTake;
                needToTake = 0;
                break;
            }
        }

        return takenMoney;
    }

    getSlotMachine(number) {
        for (let i = 0; i < this.arrSlotMachine.length; i++) {
            if (this.arrSlotMachine[i].number === number) {
                return this.arrSlotMachine[i];
            }
        }
    }

    get atNumberSlotMachine() {
        return this.numberSlotMachine;
    }

    setnewSlotMachine() {
        this.sortSlotMachine();
        this.arrSlotMachine[0].moneyCasinoMachine = this.arrSlotMachine[0].moneyCasinoMachine - Math.floor(this.arrSlotMachine[0].moneyCasinoMachine/2);
        this.arrSlotMachine[this.arrSlotMachine.length] = new SlotMachine(Math.floor(this.arrSlotMachine[0].moneyCasinoMachine/2));
        this.arrSlotMachine[this.arrSlotMachine.length - 1].number = this.arrSlotMachine.length - 1;
        this.numberSlotMachine = this.numberSlotMachine + 1;
    }

    removeSlotMachine(number) {
        if (!this.arrSlotMachine.length) {
            console.log('Number of SlotMachine is 0. You cannot remove a SlotMachine anymore');
        }
        let num;

        this.sortSlotMachine();
        for (let i = 0; i < this.arrSlotMachine.length; i++) {
            if (this.arrSlotMachine[i].number === number) {
                num = i;
                break;
            }
        }

        if (num === undefined) {
            return console.log('SlotMachine with number' + number + 'doesnt exist ');
        }

        let money = this.arrSlotMachine[num].cash;
        for (let i = 0; i < this.arrSlotMachine.length; i++) {
            this.arrSlotMachine[i].moneyCasinoMachine += Math.floor(money/(this.arrSlotMachine.length-1));
        }

        let remains = money - (this.arrSlotMachine.length - 1) * Math.floor(money/(this.arrSlotMachine.length - 1));
        this.arrSlotMachine.splice(num,1);
        this.arrSlotMachine[this.arrSlotMachine.length-1].moneyCasinoMachine += remains;
    }

    sortSlotMachine() {
        this.arrSlotMachine.sort(function(a,b) {
            return b.number - a.number;
        });
    }
}

class SlotMachine {
    constructor(moneyMachine) {
        this.moneyMachine = moneyMachine;
        this.happySlot = false;
    }

    get cash () {
        return this.moneyMachine;
    }

    setcash (money) {
        this.moneyMachine += money;
    }

    putMoneySlotMachine (money) {
        if(this.moneyMachine - money < 0) {
            console.log('No money dude', 'Dude is your maximum - ' + this.moneyMachine);
        } else {
            this.moneyMachine -= money;
        }
    }

    game(cashMoney) {
        let win;

        if (!this.moneyMachine) {
            return console.log('You cant play on this SlotMachine. Balance is 0.');
        } else {
            this.setcash(cashMoney);
            const generateNumber = Math.floor(Math.random()*900 + 100);
            console.log('Number is - ' + generateNumber);
            const generateNumberArr = generateNumber.toString().split('');

            if (this.happySlot || generateNumber === 777) {
                win = this.setcash();
                this.moneyMachine = 0;
                return console.log('Win : ' + win);
            }

            if (generateNumberArr[0] === generateNumberArr[1] && generateNumberArr[1] === generateNumberArr[2]) {
                win = cashMoney * 5;
                this.cash(win);
                this.moneyMachine = 0;

                return console.log('Win : ' + win);
            }

            if (generateNumberArr[0] === generateNumberArr[1] ||
                generateNumberArr[0] === generateNumberArr[2] ||
                generateNumberArr[1] === generateNumberArr[2]) {
                win = cashMoney * 2;
                this.setcash(win);
                this.moneyMachine = 0;

                return console.log('Win : ' + win);
            }

            return console.log('You looser');
        }
    }
}

const casino = new Casino(5, 100);
console.log('Casino has ${casino.getMoneyCasino()}$');
console.log('Casino has ${casino.getNumberSlotMachine()} SlotMachines');
console.log('Adding new SlotMachine...');
casino.setnewSlotMachine();
console.log('Now Casino has ${casino.getNumberSlotMachine()} SlotMachines');
console.log('Removal SlotMachine at number 2... All money is shared beetween other SlotMachines');
casino.removeSlotMachine(2);
console.log('Take 350$ from casino');
casino.setMoneyCasino(350);
console.log('Now Casino has ${casino.getMoneyCasino()}');
console.log('Amount of money in SlotMachine at number 4: ', casino.getSlotMachine(4).cash);
console.log('Take 130$ from SlotMachine at Number 4');
casino.getSlotMachine(4).putMoneySlotMachine(130);
console.log('Now SlotMachine at number 4 has: ', casino.getSlotMachine(4).cash);
console.log('Take 100$ to SlotMachine at Number 3');
casino.getSlotMachine(3).setcash(100);
console.log('Now SlotMachine at Number 1 has: ', casino.getSlotMachine(3).cash);
console.log('Play a game in SlotMachine at number 1');
casino.getSlotMachine(1).game(20);
console.log('And we have an Error, because SlotMachine at number 1 has no money');
console.log('Play a game in SlotMachine at number 3');
console.log(casino.getSlotMachine(3).game(20));
console.log('Now Casino has ${casino.getMoneyCasino()}');
console.log(casino.getSlotMachine(3).game(20));
console.log('Now Casino has ' + casino.getMoneyCasino());
