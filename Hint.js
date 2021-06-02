class Hint {


    //记录数独每行各个数字是否出现
    usedRow = main.createArray2(10, 10);
    //记录数独每列各个数字是否出现
    usedColumn = main.createArray2(10, 10);
    //记录数独每个方阵各个数字是否出现
    usedMatrix = main.createArray2(10, 10);

    table = main.createArray2(9, 9);
    tableClazz = main.createArray2(9, 9, '');

    constructor(table) {
        //数独9*9棋盘
        this.table = table;
        this.init();
    }


    add = (i, j, val, isDel) => {

        let mIndex = this.getMatrixIndex(i, j);
        if (!isDel) {
            this.usedRow[i][val]++;
            this.usedColumn[j][val]++;
            this.usedMatrix[mIndex][val]++;
        } else {
            this.usedRow[i][val]--;
            this.usedColumn[j][val]--;
            this.usedMatrix[mIndex][val]--;
        }
        if (val !== 0 && (this.usedRow[i][val] >= 2 || this.usedColumn[j][val] >= 2 || this.usedMatrix[mIndex][val] >= 2)) {
            return {
                clazz: 'errorBox',
                list: this.findTable(i, j, val),
            }
        } else {
            return {
                clazz: 'okBox',
                list: this.findTable(i, j, val),
            }
        }
    }

    findTable = (y, x, val) => {
        let set = [];
        let k = this.getMatrixIndex(y, x);
        let ky = Number.parseInt(k / 3) * 3;
        let kx = k % 3 * 3;
        console.info(ky, kx);
        for (let i = 0; i < 9; i++) {
            if (this.table[y][i] === val) {
                set.push({
                    y,
                    x: i,
                });
            };
            if (this.table[i][x] === val) {
                set.push({
                    y: i,
                    x,
                });
            }
        }
        for (let i = ky; i < ky + 3; i++) {
            for (let j = kx; j < kx + 3; j++) {
                if (this.table[i][j] === val) {
                    set.push({
                        y: i,
                        x: j,
                    });
                }
            }
        }
        return set;
    }

    init = () => {
        let error = false;
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                let val = this.table[i][j];
                let mIndex = this.getMatrixIndex(i, j);
                this.usedRow[i][val]++;
                this.usedColumn[j][val]++;
                this.usedMatrix[mIndex][val]++;
                if (val !== 0 && (this.usedRow[i][val] >= 2 || this.usedColumn[j][val] >= 2 || this.usedMatrix[mIndex][val] >= 2)) {
                    error = true;
                    this.tableClazz[i][j] = {
                        clazz: 'errorBox',
                        val: this.table[i][j],
                    };
                } else {
                    this.tableClazz[i][j] = {
                        clazz: 'okBox',
                        val: this.table[i][j],
                    };
                }
            }
        }
        return this.tableClazz;
    }


    //获取下标i，j在哪个方阵
    getMatrixIndex = (i, j) => {
        return Number.parseInt(i / 3) * 3 + Number.parseInt(j / 3);
    }



}