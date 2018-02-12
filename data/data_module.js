define([], function() {

    var eventList = [
        {
            id: 1,
            title: "Christmas Eve 2017",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            startTime: new Date("Sun Dec 24 2017 00:00:00 GMT-0400"),
            endTime: new Date("Sun Dec 24 2017 23:59:59 GMT-0400"),
            location: "Atlanta, Ga"
        },
        {
            id: 2,
            title: "Christmas Day 2017",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            startTime: new Date("Mon Dec 25 2017 00:00:00 GMT-0400"),
            endTime: new Date("Mon Dec 25 2017 23:59:59 GMT-0400"),
            location: "Atlanta, Ga"
        },
        {
            id: 3,
            title: "New Years Eve 2017",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            startTime: new Date("Sun Dec 31 2017 00:00:00 GMT-0400"),
            endTime: new Date("Sun Dec 31 2017 23:59:59 GMT-0400"),
            location: "Nashville, TN"
        },
        {
            id: 4,
            title: "New Years Day 2018",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            startTime: new Date("Mon Jan 01 2018 00:00:00 GMT-0400"),
            endTime: new Date("Mon Jan 01 2018 23:59:59 GMT-0400"),
            location: "Nashville, TN"
        },
        {
            id: 5,
            title: "Groundhog Day",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            startTime: new Date("Fri Feb 02 2018 00:00:00 GMT-0400"),
            endTime: new Date("Fri Feb 02 2018 23:59:59 GMT-0400"),
            location: "Punxsutawney, PA"
        },
        {
            id: 6,
            title: "Valentine's Day",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            startTime: new Date("Wed Feb 14 2018 00:00:00 GMT-0400"),
            endTime: new Date("Wed Feb 14 2018 23:59:59 GMT-0400"),
            location: "Chicago, IL"
        },
        {
            id: 7,
            title: "President's Day",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            startTime: new Date("Mon Feb 19 2018 00:00:00 GMT-0400"),
            endTime: new Date("Mon Feb 19 2018 23:59:59 GMT-0400"),
            location: "Washington D.C."
        },
        {
            id: 8,
            title: "St. Patrick's Day",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            startTime: new Date("Sat Mar 17 2018 00:00:00 GMT-0400"),
            endTime: new Date("Sat Mar 17 2018 23:59:59 GMT-0400"),
            location: "Dublin, Ireland"
        },
        {
            id: 9,
            title: "April Fools Day",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            startTime: new Date("Thu Apr 01 2018 00:00:00 GMT-0400"),
            endTime: new Date("Thu Apr 01 2018 23:59:59 GMT-0400"),
            location: "Palm Beach, FL"
        },
        {
            id: 10,
            title: "Earth Day",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            startTime: new Date("Thu Apr 22 2018 00:00:00 GMT-0400"),
            endTime: new Date("Thu Apr 22 2018 23:59:59 GMT-0400"),
            location: "Planet Earth"
        },
        {
            id: 11,
            title: "Cinco de Mayo",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            startTime: new Date("Thu Jan 03 1985 11:45:00 GMT-0400"),
            endTime: new Date("Thu Jan 03 1985 12:45:00 GMT-0400"),
            location: "Mexico City, Mexico"
        }
    ];

    function sortByStart(eventList) {
        eventList.sort(function(a, b) {
            keyA = a.startTime;
            keyB = b.startTime;

            if(keyA < keyB) return -1;
            if(keyA > keyB) return 1;
            return 0;
        });
    }

    var dataModule = function() {
        this.events = function() {
            eventsList = sortByStart(eventList);
            return eventList;
        }
    }

    return dataModule;
});