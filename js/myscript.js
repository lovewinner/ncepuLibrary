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

function addClass(obj, clssName) {
    for (var i = 0; i < obj.length; i++) {
        obj[i].onclick = function() {
            for (var i = 0; i < obj.length; i++) {
                obj[i].className = obj[i].className.replace(clssName, '');
            };
            this.className += " " + clssName;
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

//斑马纹效果
function zebra() {
    var aDiv = getByClass("div", "database");
    var aUl = aDiv[0].getElementsByTagName("ul");
    var aLi = [];
    for (var i = 0; i < aUl.length; i++) {
        aLi.push(aUl[i].getElementsByTagName("li"));
    };
    for (var i = 0; i < aLi.length; i++) {
        for (var j = 0; j < aLi[i].length; j++) {
            if (j % 2 == 1) {
                aLi[i][j].style.backgroundColor = "#ddd";
                aLi[i][j].style.borderTop = "1px solid #ccc";
                aLi[i][j].style.borderBottom = "1px solid #ccc";
            }
        };
    };
}

//first-class h2单击事件
function firstClassClick() {
    var aUlFirstClass = getByClass("ul", "first-class");
    var aH2 = aUlFirstClass[0].getElementsByTagName("h2");
    var aUlScndClss = getByClass("ul", "second-class");
    var aUlScndClssLi = [];
    for (var i = 0; i < aH2.length; i++) {
        aH2[i].onclick = function() {
            for (var i = 0; i < aH2.length; i++) {
                aH2[i].className = "";
            };
            for (var i = 0; i < aUlScndClss.length; i++) {
                aUlScndClssLi.push(aUlScndClss[i].getElementsByTagName("li"));
            };
            for (var i = 0; i < aUlScndClssLi.length; i++) {
                for (var j = 0; j < aUlScndClssLi[i].length; j++) {
                    aUlScndClssLi[i][j].className = ""
                };
            };
            this.className = "first-class-active";
        }
    }
}

//second-class li单击事件
function secondClassClick() {
    var aUlFirstClass = getByClass("ul", "first-class");
    var aH2 = aUlFirstClass[0].getElementsByTagName("h2");
    var aUlScndClss = getByClass("ul", "second-class");
    var aUlScndClssLi = [];
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
                        aUlScndClssLi[i][j].className = ""
                    };
                };
                //对单击的该元素增加样式
                this.className = "second-class-active";
                if (this.parentNode.previousElementSibling) {
                    this.parentNode.previousElementSibling.className = "first-class-active";
                } else {
                    this.parentNode.previousSibling.className = "first-class-active";
                }
            }
        };
    };
}

//contentShadow
function contentShadow() {
    var oDivContentBody = getByClass("div", "content-body")[0];
    var oImgContentShadow = getByClass("img", "content-shadow")[0];
    oImgContentShadow.style.height = oDivContentBody.offsetHeight + "px";
}

//首页
function searchTab() {
    var oUl = getByClass("ul", "search-tab")[0];
    var aLi = oUl.getElementsByTagName("li");
    var aDiv = getByClass("div", "search-content");
    for (var i = 0; i < aLi.length; i++) {
        aLi[i].index = i;
        aLi[i].style.zIndex = -i + 4;
        aLi[i].onmouseover = function() {
            for (var j = 0; j < aLi.length; j++) {
                aLi[j].className = "";
                aLi[j].style.zIndex = -j + 4;
                aLi[j].style.background = "url(img/search-tab.png)"
                aLi[j].getElementsByTagName("a")[0].style.color = "#898a89";
                aDiv[j].style.display = "none";
            };
            this.style.background = "url(img/search-tab-active" + (this.index + 1) + ".png)"
            this.style.zIndex = 5;
            this.getElementsByTagName("a")[0].style.color = "#fff";
            aDiv[this.index].style.display = "block";
            if (this.index != 0) {
                aDiv[this.index].style.zIndex = 5;
            };
        }
    };
}

function searchContentDrop() {
    var aUl = getByClass("ul", "search-content-drop");
    var aUlCollectionsLi = aUl[0].getElementsByTagName("li");
    var aP1Explanation = getByClass("div", "explanation")[1].getElementsByTagName("p")[0];
    var iLiHeight = getStyle(aUl[0], "height");
    var oButtonHidden = document.getElementById("strSearchType");
    var oForm2=document.getElementById("integrate");

    for (var i = 0; i < aUl.length; i++) {
        aUl[i].index = i;
        aUl[i].onmouseover = function() {
            var aLi = this.getElementsByTagName("li");
            var SumHeight = aLi.length * parseInt(iLiHeight) + "px";
            this.style.height = SumHeight;
            for (var j = 0; j < aLi.length; j++) {
                aLi[j].onmouseover = function() {
                    this.style.background = "#ccc";
                    this.style.color = "#fff";
                };
                aLi[j].onmouseout = function() {
                    this.style.background = "";
                    this.style.color = "#828282";
                };
                aLi[j].onclick = function() {
                    this.style.background = "";
                    this.style.color = "#828282";
                    this.parentNode.insertBefore(this, this.parentNode.children[0]);
                    this.parentNode.style.height = iLiHeight;
                    if (this.parentNode.index == 0) { //改变馆藏目录传递的参数
                        oButtonHidden.value = this.id;
                    } else if (this.parentNode.index == 1) { //改变整合检索传递的参数
                        switch (this.id) {
                            case "blyun":
                                oForm2.action="http://www.blyun.com/gosearch.jsp";
                                getByClass("input", "searchContent")[1].placeholder = "百链原文索取检索词…";
                                aP1Explanation.innerHTML = "说明：提供一站式外文搜索，该平台拥有包括Springer Link等上百个外文数据库，可自动进行文献传递。";
                                break;
                            case "bjtech":
                                getByClass("input", "searchContent")[1].placeholder = "高科联盟检索词…";
                                aP1Explanation.innerHTML = "说明：高科联盟是北京11所高校图书馆建立的各类文献资源的目录导航共享共知文献传递服务系统，可自动进行文献传递。";
                                break;
                            case "ccc":
                                oForm2.action="http://ccc.calis.edu.cn/result.php";
                                getByClass("input", "searchContent")[1].placeholder = "外文期刊网检索词…";
                                aP1Explanation.innerHTML = "说明：外文期刊网是中国高校文献保障系统（CALIS）提供的全面揭示国内高校纸本期刊和电子期刊的综合服务平台，可提供文献传递。";
                                break;
                        }
                    }
                }
            };
        }
        aUl[i].onmouseout = function() {
            this.style.height = iLiHeight;
        }
    };
}
