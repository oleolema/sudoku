class Answer {


    //记录数独每行各个数字是否出现
    usedRow = main.createArray2(10, 10);
    //记录数独每列各个数字是否出现
    usedColumn = main.createArray2(10, 10);
    //记录数独每个方阵各个数字是否出现
    usedMatrix = main.createArray2(10, 10);


    constructor(table) {
        //数独9*9棋盘
        this.table = table;
    }



    getAnswer = () => {
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                let val = this.table[i][j];
                let mIndex = this.getMatrixIndex(i, j);
                this.usedRow[i][val]++;
                this.usedColumn[j][val]++;
                this.usedMatrix[mIndex][val]++;
                if (val !== 0 && (this.usedRow[i][val] >= 2 || this.usedColumn[j][val] >= 2 || this.usedMatrix[mIndex][val] >= 2)) {
                    return {
                        error: true,
                        table: [],
                    };;
                }
            }
        }
        if (this.f(0, 0) == 1) {
            return {
                error: false,
                table: this.table,
            };
        } else {
            return {
                error: true,
                table: [],
            }
        }
    }

    //深度搜索
    f = (y, x) => {
        if (x == 9) {
            return this.f(y + 1, 0);
        }
        if (y == 9) {
            return 1;
        }
        if (this.table[y][x] != 0) {
            return this.f(y, x + 1);
        }
        let mIndex = this.getMatrixIndex(y, x);
        for (let i = 1; i < 10; i++) {
            //检查i是否使用过
            if (this.usedRow[y][i] == 0 && this.usedColumn[x][i] == 0 && this.usedMatrix[mIndex][i] == 0) {
                this.table[y][x] = i;
                this.usedRow[y][i] = 1;
                this.usedColumn[x][i] = 1;
                this.usedMatrix[mIndex][i] = 1;
                if (this.f(y, x + 1) == 1) {
                    return 1;
                }
                this.usedRow[y][i] = 0;
                this.usedColumn[x][i] = 0;
                this.usedMatrix[mIndex][i] = 0;
                this.table[y][x] = 0;
            }
        }
        return 0;
    }

    //获取下标i，j在哪个方阵
    getMatrixIndex = (i, j) => {
        return Number.parseInt(i / 3) * 3 + Number.parseInt(j / 3);
    }



}