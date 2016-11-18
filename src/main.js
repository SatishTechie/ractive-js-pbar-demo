init = function() {
    var __gvar = {
        ldErrMsg: "Invalid Data",
        errMsg: "Please select valid ProgressBar from dropdown."
    };
    var app = {};

    function loadPBData() {
        try {
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.onreadystatechange = function() {
                if (xmlhttp.readyState == XMLHttpRequest.DONE) {
                    if (xmlhttp.status == 200) {
                        __gvar.sdata = JSON.parse(xmlhttp.responseText);
                        create(__gvar.sdata);
                    } else if (xmlhttp.status == 400) {
                        alert(__gvar.ldErrMsg);
                    }
                }
            };

            xmlhttp.open("GET", "http://pb-api.herokuapp.com/bars", true);
            xmlhttp.send();
        } catch (e) {
            alert(__gvar.ldErrMsg);
        }
    }

    // if data is valid create component
    function create(data) {
        // __gvar.sdata = { bars: [2, 2, 22, 2], buttons: [23, -32, -32, 4], limit: 220 };
        if (cleanData() && data.bars.length > 0 && data.buttons.length > 0) {
            initApp();

        } else {
            var errDiv = document.getElementById("pbarErrNode");
            errDiv.innerHTML = __gvar.ldErrMsg;
        }

    }

    function cleanData() {
        return __gvar.sdata.hasOwnProperty('bars') ? __gvar.sdata.hasOwnProperty('buttons') ? __gvar.sdata.hasOwnProperty('limit') ? true : false : false : false;
    }

    function initApp() {
        //create ractive instance 
        app = new Ractive({
            el: '#container',
            template: '#pbtemplate',
            _bars: [],
            data: {

                bars: function() {
                    _bars = [];
                    for (var i = 0; i < __gvar.sdata.bars.length; i++) {
                        _bars[_bars.length] = {
                            id: "progressbar_" + i,
                            value: __gvar.sdata.bars[i],
                            currentStatus: __gvar.sdata.bars[i]
                        };
                    }

                    return _bars;

                },

                createControls: function() {
                    createButtons();
                    createSelect();
                },

                buttons: function() {
                    return __gvar.sdata.buttons;
                },

                options: function() {

                    return _bars;
                },


                createSelect: function() {
                    var selectpbNode = document.getElementById('selectpbNode');
                    var selectpb = createPBElement('select', "pbSelect", "");
                    for (var k = 0; k < document.getElementById("barc").children.length; k++) {
                        var _pbarele = document.getElementById("barc").children[k];
                        myOption = createOptionElement("option", _pbarele.id, _pbarele.id);
                        selectpb.appendChild(myOption);
                    }
                    selectpbNode.appendChild(selectpb);

                }


            }
        });

       //on button click animate progressbar
        app.on('action', function(event, value) {
            var selBar = document.getElementById("pbSelect");
            var selPb = document.getElementById(selBar.value);
            var _wd = selPb.children[1].style.width;
            var prg = parseInt(selPb.getAttribute("currentStatus")) + parseInt(value);
            selPb.setAttribute("currentStatus", prg);
            var pr = prg;
            if (pr < 0) {
                selPb.children[1].style.width = "0%";
                selPb.children[0].innerHTML = "0%";
                selPb.setAttribute("currentStatus", 0);
                pr = 0;
            } else {
                if (pr > 100) {
                    selPb.children[1].style["background-color"] = "red";
                } else {
                    selPb.children[1].style["background-color"] = "green";
                }

                selPb.children[1].style.width = pr + "%"
                selPb.children[0].innerHTML = pr + "%";
            }
        });

    }

    //initialize the service call
    loadPBData();
};
