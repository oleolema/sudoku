(function () {
    window.create = {};
    let tableHtml = document.querySelector('.table');
    let table = main.createArray2(9, 9);
    ta = main.createArray2(9, 9);
    let tableNum = main.createArray2(9, 9);
    let hint;
    create.createTable = (ta) => {
        this.ta = ta;
        let rows = "";
        for (let i = 0; i < ta.length; i++) {
            let columns = "";
            for (let j = 0; j < ta[i].length; j++) {
                if (typeof ta[i][j] === "object") {
                    columns += `<input class="col ${ta[i][j].clazz}" type="tel" max="9" min="1" value=${ta[i][j].val === 0 ? "":ta[i][j].val} >`;
                    tableNum[i][j] = ta[i][j].val === '' ? 0 : ta[i][j].val;
                } else {
                    columns += `<input class="col" type="tel" max="9" min="1" value=${ta[i][j] === 0 ? "":ta[i][j]} >`;
                    tableNum[i][j] = ta[i][j] === '' ? 0 : ta[i][j];
                }
            }
            rows += `<div class="row"  >${columns}</div>`;
        }
        tableHtml.innerHTML = rows;
        for (let i = 0; i < 9; i++) {
            table[i] = [];
            let columns = tableHtml.children[i];
            for (let j = 0; j < 9; j++) {
                table[i][j] = columns.children[j];
                table[i][j].oninput = function (event) {
                    handleKeyPress(i, j, event);
                }
                table[i][j].onkeydown = (e) => {
                    switch (e.key) {
                        case "Backspace":
                            if (table[i][j].value.length >= 1) {
                                table[i][j].value = "";
                            }
                            tableNum[i][j] = 0;
                            // getHint(i, j - 1, tableNum[i][j - 1], true);
                            handleNextInput(i, j - 1);
                            break;
                        case "ArrowRight":
                            handleNextInput(i, j + 1);
                            break;
                        case "ArrowLeft":
                            handleNextInput(i, j - 1);
                            break;
                        case "ArrowUp":
                            handleNextInput(i - 1, j);
                            break;
                        case "ArrowDown":
                            handleNextInput(i + 1, j);
                            break;
                        case " ":
                            handleNextInput(i, j + 1);
                            break;
                    }

                }
            }
        }
        main.table = table;

        hint = new Hint(tableNum);
    }

    create.clear = () => {
        create.createTable(main.createArray2(9, 9, ''));

    }

    create.createTable(main.createArray2(9, 9, ''));
    table[0][0].focus();

    function handleKeyPress(i, j, e) {
        // console.info(tableNum);
        console.info(e);
        let val = Number.parseInt(e.data);

        if (val != 0 && !Number.isNaN(val)) {
            tableNum[i][j] = val;
            setTimeout(() => {
                // getHint(i, j, val);
                table[i][j].value = val;
                handleNextInput(i, j + 1, e);
            }, 1);
            return;
        } else {
            tableNum[i][j] = 0;
            setTimeout(() => {
                // getHint(i, j, 0, true);
                table[i][j].value = '';
            }, 1);
            return;
        }
    }

    function handleNextInput(i, j, e) {
        if (j === -1) {
            return handleNextInput(i - 1, 8, table[i][j]);
        }
        if (j === 9) {
            return handleNextInput(i + 1, 0, table[i][j]);
        }
        if (i === 9 || i === -1) {
            return;
        }
        table[i][j].focus();
    }


    function getHint(i, j, val, isDel) {

        let hintObj = hint.add(i, j, val, isDel);
        console.info(hintObj);
        let {
            clazz,
            list
        } = hintObj;

        for (let l in list) {
            let {
                x,
                y
            } = list[l];
            table[y][x].value = val;
            main.delClass(table[y][x], 'errorBox');
            main.delClass(table[y][x], 'okBox');
            main.addClass(table[y][x], clazz);
        }
    }


})();