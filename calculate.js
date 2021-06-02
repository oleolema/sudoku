(function () {



    let calculate = document.querySelector('.calculate');

    let clear = document.querySelector('.clear');



    calculate.onclick = () => {
        let table = [];
        for (let i = 0; i < 9; i++) {
            table[i] = [];
            for (let j = 0; j < 9; j++) {
                let num = Number.parseInt(main.table[i][j].value);
                table[i][j] = Number.isNaN(num) ? 0 : num;
            }
        }

        let ta = new Answer(table).getAnswer();
        console.info(ta);
        if (ta.error) {
            alert("无解");
            if (ta.table.length) {
                create.createTable(ta.table);
            }
        } else {
            create.createTable(ta.table);
        }

    }

    clear.onclick = () => {
        create.clear();
    }




})();