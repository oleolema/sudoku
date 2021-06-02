var main = {
    createArray2: (m, n, init = 0) => {
        let arr = [];
        for (let i = 0; i < m; i++) {
            arr[i] = [];
            for (let j = 0; j < n; j++) {
                arr[i][j] = init;
            }
        }
        return arr;
    },


    addClass: (ele, clazz) => {
        let cla = ele.className;
        let regexp = new RegExp('(\\s+|^)' + clazz + '(\\s+|$)', 'g');

        console.info(regexp, cla.search(regexp));
        if (cla.search(regexp) === -1) {
            ele.className += " " + clazz;
        }
    },

    delClass: (ele, clazz) => {
        let cla = ele.className;
        let regexp = new RegExp('(\\s+|^)' + clazz + '(\\s+|$)', 'g');
        ele.className = cla.replace(regexp, ' ');
    },

    os: (function () {
        var ua = navigator.userAgent,
            isWindowsPhone = /(?:Windows Phone)/.test(ua),
            isSymbian = /(?:SymbianOS)/.test(ua) || isWindowsPhone,
            isAndroid = /(?:Android)/.test(ua),
            isFireFox = /(?:Firefox)/.test(ua),
            isChrome = /(?:Chrome|CriOS)/.test(ua),
            isTablet = /(?:iPad|PlayBook)/.test(ua) || (isAndroid && !/(?:Mobile)/.test(ua)) || (isFireFox && /(?:Tablet)/.test(ua)),
            isPhone = /(?:iPhone)/.test(ua) && !isTablet,
            isPc = !isPhone && !isAndroid && !isSymbian;
        return {
            isTablet: isTablet,
            isPhone: isPhone,
            isAndroid: isAndroid,
            isPc: isPc
        };


    })(),
}

// alert(main.os.isPc)