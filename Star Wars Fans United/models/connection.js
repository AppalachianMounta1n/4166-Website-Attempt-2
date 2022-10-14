const {DateTime} = require('luxon');
const {v4: uuidv4} = require('uuid');

const connections = [
    {
        id: uuidv4(),
        title: 'Why Ki-Adi-Mundi Was Both Directly And Indirectly Responsible For Order 66',
        topic: 'Galactic Republic Lore',
        details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        host: 'Lily Gross',
        date: DateTime.now().toLocaleString(DateTime.DATE_MED),
        startTime: '8:00 AM',
        endTime: '9:00 AM',
        image: '../public/images/StarWars.png'
    },
    {
        id: uuidv4(),
        title: 'Reasons The Jedi Council Only Utilized Obi-Wan Kenobi And Anakin Skywalker',
        topic: 'Galactic Republic Lore',
        details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        host: 'Lily Gross',
        date: DateTime.now().toLocaleString(DateTime.DATE_MED),
        startTime: '10:00 AM',
        endTime: '11:00 AM',
        image: '../public/images/StarWars.png'
    },
    {
        id: uuidv4(),
        title: 'How Did Palpatine Stay Hidden For So Long?',
        topic: 'Galactic Republic Lore',
        details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        host: 'Lily Gross',
        date: DateTime.now().toLocaleString(DateTime.DATE_MED),
        startTime: '12:00 PM',
        endTime: '1:00 PM',
        image: '../public/images/StarWars.png'
    },
    {
        id: uuidv4(),
        title: 'Reasons The Sith Empire Fell',
        topic: 'Sith Lore',
        details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        host: 'Lily Gross',
        date: DateTime.now().toLocaleString(DateTime.DATE_MED),
        startTime: '2:00 PM',
        endTime: '3:00 PM',
        image: '../public/images/StarWars.png'
    },
    {
        id: uuidv4(),
        title: 'Why The Rule of Two Was Ineffective And Doomed To Fail',
        topic: 'Sith Lore',
        details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        host: 'Lily Gross',
        date: DateTime.now().toLocaleString(DateTime.DATE_MED),
        startTime: '4:00 PM',
        endTime: '5:00 PM',
        image: '../public/images/StarWars.png'
    },
    {
        id: uuidv4(),
        title: 'How Did The Sith Return After Palpatine Was Defeated?',
        topic: 'Sith Lore',
        details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        host: 'Lily Gross',
        date: DateTime.now().toLocaleString(DateTime.DATE_MED),
        startTime: '5:30 PM',
        endTime: '6:30 PM',
        image: '../public/images/StarWars.png'
    }
];

exports.find = function() {
    return connections;
};

exports.findByID = function(id) {
    return connections.find(connection => connection.id === id);
};

exports.saveConnection = function(connection) {
    connection.id = uuidv4();
    connection.date = DateTime.now().toLocaleString(DateTime.DATE_MED);

    connections.push(connection);
};

exports.updateByID = function(id, newConnection) {
    let connection = connections.find(connection => connection.id === id);

    if (connection) {
        connection.title = newConnection.title;
        connection.topic = newConnection.topic;
        connection.host = newConnection.host;
        connection.startTime = newConnection.startTime;
        connection.endTime = newConnection.endTime;
    }
    else {
        return false;
    }
};

exports.delete = function(id) {
    let index = connections.findIndex(connection => connection.id === id);

    if(index != -1) {
        connections.splice(index, 1);
        return true;
    }
    else {
        return false;
    }
};