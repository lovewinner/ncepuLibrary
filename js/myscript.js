function getByClass(tagName, sClss) {
    var aResult = [];
    var aEle = document.getElementsByTagName(tagName);
    for (var i = 0; i < aEle.length; i++) {
        if (aEle[i].className == sClss) {
            aResult.push(aEle[i]);
        }
    }
    return aResult;
}

function bmw(array) {
    for (var i = 0; i < array.length; i++) {
        for (var j = 0; j < array[i].length; j++) {
            if (j % 2 == 1) {
                array[i][j].style.backgroundColor = "#ddd";
                array[i][j].style.borderTop = "1px solid #ccc";
                array[i][j].style.borderBottom = "1px solid #ccc";
            }
        };
    };
}

function addClass(obj, clssName) {
    for (var i = 0; i < obj.length; i++) {
        obj[i].onclick = function() {
            for (var i = 0; i < obj.length; i++) {
                obj[i].className = "";
            };
            this.className = clssName;
        }
    }
}

function getStyle(obj, attr) {
    if (obj.currentStyle) {
        return obj.currentStyle[attr];
    } else {
        return getComputedStyle(obj, false)[attr];
    }
}

function startMove(obj, attr, iTarget) {
    clearInterval(obj.timer);
    obj.timer = setInterval(function() {
        var iCur = 0;
        if (attr == 'opacity') {
            iCur = parseInt(parseFloat(getStyle(obj, attr)) * 100);
        } else {
            iCur = parseInt(getStyle(obj, attr));
        }
        var iSpeed = (iTarget - iCur) / 10;
        iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
        if (iCur == iTarget) {
            clearInterval(obj.timer);
        } else {
            if (attr == 'opacity') {
                obj.style.filter = 'alpha(opacity:' + (iCur + iSpeed) + ')';
                obj.style.opacity = (iCur + iSpeed) / 100;
                if (obj.style.opacity > 0.9) {
                    obj.style.opacity = 1;
                }
            } else {
                obj.style[attr] = iCur + iSpeed + 'px';
            }
        }
    }, 30)
}


function picChange() {
    var oUlPic = getByClass("ul", "pic-tab")[0];
    var aPicLi = oUlPic.getElementsByTagName("li");
    var iNow = 1;
    setInterval(function() {
        for (var i = 0; i < aPicLi.length; i++) {
            startMove(aPicLi[i], "opacity", 0);
        };
        startMove(aPicLi[iNow], "opacity", 100);
        if (iNow == aPicLi.length - 1) {
            iNow = 0;
        } else {
            iNow++;
        }
    }, 4000);

}

window.onload = function() {
    var aDiv = getByClass("div", "database");
    var aUl = aDiv[0].getElementsByTagName("ul");
    var aLi = [];
    var aUlFirstClass = getByClass("ul", "first-class");
    var aH2 = aUlFirstClass[0].getElementsByTagName("h2");
    var aUlScndClss = getByClass("ul", "second-class");
    var aUlScndClssLi = [];

    //斑马纹效果
    for (var i = 0; i < aUl.length; i++) {
        aLi.push(aUl[i].getElementsByTagName("li"));
    };

    bmw(aLi);

    //first-class h2单击事件
    for (var i = 0; i < aH2.length; i++) {
        aH2[i].onclick = function() {
            for (var i = 0; i < aH2.length; i++) {
                aH2[i].className = "";
            };
            for (var i = 0; i < aUlScndClssLi.length; i++) {
                for (var j = 0; j < aUlScndClssLi[i].length; j++) {
                    aUlScndClssLi[i][j].style.fontWeight = "normal";
                    aUlScndClssLi[i][j].getElementsByTagName("a")[0].style.color = "#555";
                };
            };
            this.className = "first-class-active";
        }
    }

    //second-class li单击事件
    for (var i = 0; i < aUlScndClss.length; i++) {
        aUlScndClssLi.push(aUlScndClss[i].getElementsByTagName("li"));
    };
    for (var i = 0; i < aUlScndClssLi.length; i++) {
        for (var j = 0; j < aUlScndClssLi[i].length; j++) {
            aUlScndClssLi[i][j].onclick = function() {
                //去除所有添加的样式
                for (var i = 0; i < aH2.length; i++) {
                    aH2[i].className = "";
                };
                for (var i = 0; i < aUlScndClssLi.length; i++) {
                    for (var j = 0; j < aUlScndClssLi[i].length; j++) {
                        aUlScndClssLi[i][j].style.fontWeight = "normal";
                        aUlScndClssLi[i][j].getElementsByTagName("a")[0].style.color = "#555";
                    };
                };
                //对单击的该元素增加样式
                this.style.fontWeight = "bold";
                this.getElementsByTagName("a")[0].style.color = "#9d1e2f";
                if (this.parentNode.previousElementSibling) {
                    this.parentNode.previousElementSibling.className = "first-class-active";
                } else {
                    this.parentNode.previousSibling.className = "first-class-active";
                }
            }
        };
    };
    picChange();
}