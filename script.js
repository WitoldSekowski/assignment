var currentLevel = 0;
var currentItem = null;
var menuLevel = 0;
var goBackText2 = '';
var goBackText = '';
var currentHTML = '';
var node;


$(document).ready(function () {
    initMainSort();
    initListSort();
    initMasonry();
    initDelegateEvents();
})


function renderMenu(level) {

    if (currentLevel == 0) {
        $('.nav-list').empty();
        $.each(menuLeft, function (iter, item) {
            $('.nav-list').append('<li class="menu" data-nav-level="' + menuLeft[iter].level + '"><span class="text-wrapper">' + menuLeft[iter].name + '</span></li>');
        })
    }
    if (currentLevel == 1) {
        $('.nav-list').empty();
        menuIter = menuLeft[level[0]].submenu;
        $('.nav-list').append('<li class="back" data-nav-level="0"><span class="icon-back"></span><span class="text-wrapper">' + goBackText1 + '</span></li>');
        $.each(menuIter, function (iter, item) {
            $('.nav-list').append('<li class="menu-2" data-nav-level="' + menuIter[iter].level + '"><span class="text-wrapper">' + menuIter[iter].name + '</span></li>');
        })
    }
    if (currentLevel == 2) {
        $('.nav-list').empty();
        menuIter = menuLeft[level[0]].submenu[level[1]].submenu;
        $('.nav-list').append('<li class="back-2" data-nav-level="' + level[0] + '-' + level[1] + '"><span class="icon-back"></span><span class="text-wrapper">' + goBackText2 + '</span></li>');
        $.each(menuIter, function (iter, item) {
            $('.nav-list').append('<li class="menu-3"><span class="' + menuIter[iter].icon + '"></span><span class="text-wrapper">' + menuIter[iter].name + '</span></li>');
        })
    }

}

function navigateLeftMenu(level) {

    var menuLevel = level.split("-");
    console.log(menuLevel);
    renderMenu(menuLevel);

}

function initMainSort() {

    var mainSort = document.getElementById("mainSort");
    Sortable.create(mainSort, {
        group: { name: "omega", pull: 'clone' },
        handle: ".iframe-handle",
        animation: 150,
        ghostClass: "sortable-ghost",
        onStart: function (evt, originalEvent) {
            currentHTML = $(evt.item).html()
            $('.grid').masonry('destroy');
        },
        onAdd: function (evt) {
            $(evt.item).html(currentHTML.toString())
            $('#listSort').css('display', 'none');

            $('.add-chart-initial').show();
            $('.grid').masonry({
                itemSelector: '.grid-item',
                columnWidth: 1
            });
        },
        onEnd: function () {
            $('.grid').masonry({
                itemSelector: '.grid-item',
                columnWidth: 1
            });
        }
    });

}

function initListSort() {

    var listSort = document.getElementById("listSort");
    Sortable.create(listSort, {
        group: { name: "omega", pull: 'clone' },
        handle: ".list-handle",
        animation: 150,
        sort: false,
        onStart: function (evt, originalEvent) {
            currentHTML = $(evt.item).html()
            $('.grid').masonry('destroy');
            $('.add-chart-initial').hide();
        },
        onMove: function (evt) {
            $(evt.dragged).html('<div class="add-chart"><p class="top-caption">Add the chart</p><p class="bottom-caption">to your dashboard</p></div>')
        }
    });

}

function initMasonry() {

    $('.grid').masonry({
        itemSelector: '.grid-item',
        columnWidth: 1,
    });

}

function initDelegateEvents() {

    $(document).delegate('html', 'mouseup', function () {
        $('#listSort').css('display', 'none');
    })

    $(document).delegate('#myinput', 'keyup', function (e) {
        var self = this;
        $('#listSort').css('display', 'block');
        $('#listSort li').each(function (key, item) {
            if ($(item).text().toLowerCase().indexOf($(self).val()) != -1 ||
                $(item).text().indexOf($(self).val()) != -1) {
                $(item).css("display", "block");
                $(this).mousedown(function () {
                    $(this).addClass('background')
                })
                $(this).mouseup(function () {
                    $(this).removeClass('background');
                    $('#listSort').css('display', 'none');
                })
            } else {
                $(item).css("display", "none");
            }
        })
    });

    $(document).delegate('.back', 'click', function () {
        currentLevel = 0;
        navigateLeftMenu($(this).attr('data-nav-level'));
    })

    $(document).delegate('.back-2', 'click', function () {
        currentLevel = 1;
        navigateLeftMenu($(this).attr('data-nav-level'));
    })

    $(document).delegate('.menu', 'click', function () {
        currentLevel = 1;
        goBackText1 = $(this).text();
        navigateLeftMenu($(this).attr('data-nav-level'));
    })

    $(document).delegate('.menu-2', 'click', function () {
        currentLevel = 2;
        goBackText2 = $(this).text();
        navigateLeftMenu($(this).attr('data-nav-level'));
    })
}

menuLeft = [
    {
        name: "Werkgelegenheid",
        level: "0",
        submenu: [
            {
                name: "Werkgelegenheid naar branche",
                level: "0-0",
                submenu: [
                    {
                        name: "test",
                        icon: "icon-table icon"
                    },
                    {
                        name: "test",
                        icon: "icon-table icon"
                    }
                ]
            },
            {
                name: "Werkgelegenheid naar branche en kenmerken",
                level: "0-1",
                submenu: [
                    {
                        name: "Werkgelegenheid - FTE",
                        icon: "icon-table icon"
                    },
                    {
                        name: "Werkgelegenheid - Werknemers",
                        icon: "icon-table icon"
                    }
                ]
            },
            {
                name: "Gemiddelde leeftijd werknemers",
                level: "0-1",
                submenu: [
                    {
                        name: "test",
                        icon: "icon-table icon"
                    },
                    {
                        name: "test",
                        icon: "icon-table icon"
                    }
                ]
            },
            {
                name: "Deeltijdfactor",
                level: "0-1",
                submenu: [
                    {
                        name: "test",
                        icon: "icon-table icon"
                    },
                    {
                        name: "test",
                        icon: "icon-table icon"
                    }
                ]
            },
            {
                name: "Gemiddeld aantal uren",
                level: "0-1",
                submenu: [
                    {
                        name: "test",
                        icon: "icon-table icon"
                    },
                    {
                        name: "test",
                        icon: "icon-table icon"
                    }
                ]
            },
            {
                name: "Werknemers naar kwalificatie",
                level: "0-1",
                submenu: [
                    {
                        name: "test",
                        icon: "icon-table icon"
                    },
                    {
                        name: "test",
                        icon: "icon-table icon"
                    }
                ]
            },
            {
                name: "Flexible arbeid",
                level: "0-1",
                submenu: [
                    "level 2 test 1",
                    {
                        name: "test",
                        icon: "icon-table icon"
                    },
                    {
                        name: "test",
                        icon: "icon-table icon"
                    }
                ]
            }
        ]
    },
    {
        name: "Mobiliteit",
        level: "1",
        submenu: [
            {
                name: "test 1 1",
                level: "1-0",
                submenu: [
                    {
                        name: "test",
                        icon: "icon-table icon"
                    },
                    {
                        name: "test",
                        icon: "icon-table icon"
                    }
                ]
            },
            {
                name: "test 1  2",
                level: "1-1",
                submenu: [
                    {
                        name: "test",
                        icon: "icon-table icon"
                    },
                    {
                        name: "test",
                        icon: "icon-table icon"
                    }
                ]
            }
        ]
    },
    {
        name: "Vacatures",
        level: "2",
        submenu: [
            {
                name: "level 1 test 1",
                level: "2-0",
                submenu: [
                    {
                        name: "test",
                        icon: "icon-table icon"
                    },
                    {
                        name: "test",
                        icon: "icon-table icon"
                    }
                ]
            },
            {
                name: "level 1 test 1",
                level: "2-1",
                submenu: [
                    {
                        name: "test",
                        icon: "icon-table icon"
                    },
                    {
                        name: "test",
                        icon: "icon-table icon"
                    }
                ]
            }
        ]
    },
    {
        name: "Onderwijs",
        level: "3",
        submenu: [
            {
                name: "level 1 test 1",
                level: "3-0",
                submenu: [
                    {
                        name: "test",
                        icon: "icon-table icon"
                    },
                    {
                        name: "test",
                        icon: "icon-table icon"
                    }
                ]
            },
            {
                name: "level 1 test 1",
                level: "3-1",
                submenu: [
                    {
                        name: "test",
                        icon: "icon-table icon"
                    },
                    {
                        name: "test",
                        icon: "icon-table icon"
                    }
                ]
            }
        ]
    },
    {
        name: "Verzuim",
        level: "4",
        submenu: [
            {
                name: "level 1 test 1",
                level: "4-0",
                submenu: [
                    {
                        name: "test",
                        icon: "icon-table icon"
                    },
                    {
                        name: "test",
                        icon: "icon-table icon"
                    }
                ]
            },
            {
                name: "level 1 test 1",
                level: "4-1",
                submenu: [
                    {
                        name: "test",
                        icon: "icon-table icon"
                    },
                    {
                        name: "test",
                        icon: "icon-table icon"
                    }
                ]
            }
        ]
    },
    {
        name: "Omgeving",
        level: "5",
        submenu: [
            {
                name: "level 1 test 1",
                level: "5-0",
                submenu: [
                    {
                        name: "test",
                        icon: "icon-table icon"
                    },
                    {
                        name: "test",
                        icon: "icon-table icon"
                    }
                ]
            },
            {
                name: "level 1 test 1",
                level: "5-1",
                submenu: [
                    {
                        name: "test",
                        icon: "icon-table icon"
                    },
                    {
                        name: "test",
                        icon: "icon-table icon"
                    }
                ]
            }
        ]
    }
]

var availableTags = ["ActionScript", "AppleScript", "Asp", "BASIC", "C", "C++", "Clojure", "COBOL", "ColdFusion", "Erlang", "Fortran", "Groovy", "Haskell", "Java", "JavaScript", "Lisp", "Perl", "PHP", "Python", "Ruby", "Scala", "Scheme"];
