var footer = (function () {
    "use strict";
    var scriptVersion = "1.0.0";
    var util = {
        version: "1.0.0",
        isAPEX: function () {
            if (typeof(apex) !== 'undefined') {
                return true;
            } else {
                return false;
            }
        },
        debug: {
            info: function (str) {
                if (util.isAPEX()) {
                    apex.debug.info(str);
                }
            },
            error: function (str) {
                if (util.isAPEX()) {
                    apex.debug.error(str);
                } else {
                    console.error(str);
                }
            }
        },
        jsonSaveExtend: function (srcConfig, targetConfig) {
            var finalConfig = {};
            /* try to parse config json when string or just set */
            if (typeof targetConfig === 'string') {
                try {
                    targetConfig = JSON.parse(targetConfig);
                } catch (e) {
                    console.error("Error while try to parse targetConfig. Please check your Config JSON. Standard Config will be used.");
                    console.error(e);
                    console.error(targetConfig);
                }
            } else {
                finalConfig = targetConfig;
            }
            /* try to merge with standard if any attribute is missing */
            try {
                finalConfig = $.extend(true, srcConfig, targetConfig);
            } catch (e) {
                console.error('Error while try to merge 2 JSONs into standard JSON if any attribute is missing. Please check your Config JSON. Standard Config will be used.');
                console.error(e);
                finalConfig = srcConfig;
                console.error(finalConfig);
            }
            return finalConfig;
        }
    };

    /***********************************************************************
     **
     ** Used to draw a container
     **
     ***********************************************************************/
    function drawContainer(parent) {
        var div = $("<div></div>");
        div.addClass("social");
        parent.append(div);
        return (div);
    }

    /***********************************************************************
     **
     ** Used to draw a row
     **
     ***********************************************************************/
    function drawRow(parent) {
        var div = $("<div></div>");
        div.addClass("apex-row");
        parent.append(div);
        return (div);
    }

    /************************************************************************
     **
     ** Used to render the html into region
     **
     ***********************************************************************/
    function renderHTML(pParentID, pData, pEscapeHTML, pConfigJSON) {

        var parent = $(pParentID);
        parent.parent().css("overflow", "inherit");
        var l_container = drawContainer(parent);
        var zindex = 10;
        var backgroundColor = pConfigJSON.backgroundColor;

        var list = $("<ul></ul>");
        $.each(pData, function (idx, data) {
            // cardNum = cardNum + pConfigJSON.cardWidth;
            if (backgroundColor == "") {
                var l_list_li = $('<li></li>');
            } else {
                var l_list_li = $('<li style="background:' + backgroundColor + ' !important;"></li>');
				
            }
            var l_link = $('<a target="_blank"> ' + data.LINK_TEXT + '</a>');
            l_link.attr("href", data.LINK_URL);
            var l_icon = $('<i class="fa ' + data.ICON + '"></i>')
                l_link.prepend(l_icon);
            l_list_li.append(l_link);
            $(l_list_li).click(function () {
                //get the url from href attribute and launch the url
                window.open($(this).find("a").attr("href"), '_blank');
                return false;
            });
            list.append(l_list_li);
        });
        l_container.append(list);
        $('body').append(l_container);
    }
    /************************************************************************
     **
     ** Used to check data and to call rendering
     **
     ***********************************************************************/
    function prepareData(pParentID, pData, pNoDataFound, pEscapeHTML, pConfigJSON) {
        /* empty container for new stuff */
        $(pParentID).empty();

        if (pData.row && pData.row.length > 0) {

            renderHTML(pParentID, pData.row, pEscapeHTML, pConfigJSON);
        } else {

            $(pParentID).css("min-height", "");
        }
    }

    return {
        render: function (regionID, ajaxID, noDataFoundMessage, items2Submit, escapeRequired, udConfigJSON) {
            var parentID = "#" + regionID + "-p";
            var stdConfigJSON = {
                "cardWidth": 4,
                "refresh": 0
            };

            var configJSON = {};
            configJSON = util.jsonSaveExtend(stdConfigJSON, udConfigJSON);
            /************************************************************************
             **
             ** Used to get data from APEX
             **
             ***********************************************************************/
            function getData() {

                $(parentID).css("min-height", "120px");

                var submitItems = items2Submit;
                try {
                    apex.server.plugin(
                        ajaxID, {
                        pageItems: submitItems
                    }, {
                        success: function (pData) {
                            prepareData(parentID, pData, noDataFoundMessage, escapeRequired, configJSON)
                        },
                        error: function (d) {
                            console.error(d.responseText);
                        },
                        dataType: "json"
                    });
                } catch (e) {
                    console.error("Error while try to get Data from APEX");
                    console.error(e);
                }

            }

            // load data
            getData();

            /************************************************************************
             **
             ** Used to bind APEx Refresh event (DA's)
             **
             ***********************************************************************/
            try {
                apex.jQuery("#" + regionID).bind("apexrefresh", function () {
                    getData();
                });
            } catch (e) {
                console.error("Error while try to bind APEX refresh event");
                console.error(e);
            }

            /************************************************************************
             **
             ** Used to refresh by a timer
             **
             ***********************************************************************/
            if (configJSON.refresh && configJSON.refresh > 0) {
                setInterval(function () {
                    getData();
                }, configJSON.refresh * 1000);
            }
        }
    }

})();
