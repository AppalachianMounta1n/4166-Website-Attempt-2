const {DateTime} = require('luxon');
const {v4: uuidv4} = require('uuid');

const connections = [
    {
        id: uuidv4(),
        title: 'Why Ki-Adi-Mundi Was Both Directly And Indirectly Responsible For Order 66',
        topic: 'Galactic Republic Lore',
        host: 'Lily Gross',
        date: DateTime.now().toLocaleString(DateTime.DATE_MED),
        startTime: '8:00 AM',
        endTime: '9:00 AM'
    },
    {
        id: uuidv4(),
        title: 'Reasons The Jedi Council Only Utilized Obi-Wan Kenobi And Anakin Skywalker',
        topic: 'Galactic Republic Lore',
        host: 'Lily Gross',
        date: DateTime.now().toLocaleString(DateTime.DATE_MED),
        startTime: '10:00 AM',
        endTime: '11:00 AM'
    },
    {
        id: uuidv4(),
        title: 'How Did Palpatine Stay Hidden For So Long?',
        topic: 'Galactic Republic Lore',
        host: 'Lily Gross',
        date: DateTime.now().toLocaleString(DateTime.DATE_MED),
        startTime: '12:00 PM',
        endTime: '1:00 PM'
    },
    {
        id: uuidv4(),
        title: 'Reasons The Sith Empire Fell',
        topic: 'Sith Lore',
        host: 'Lily Gross',
        date: DateTime.now().toLocaleString(DateTime.DATE_MED),
        startTime: '2:00 PM',
        endTime: '3:00 PM'
    },
    {
        id: uuidv4(),
        title: 'Why The Rule of Two Was Ineffective And Doomed To Fail',
        topic: 'Sith Lore',
        host: 'Lily Gross',
        date: DateTime.now().toLocaleString(DateTime.DATE_MED),
        startTime: '4:00 PM',
        endTime: '5:00 PM'
    },
    {
        id: uuidv4(),
        title: 'How Did The Sith Return After Palpatine Was Defeated?',
        topic: 'Sith Lore',
        host: 'Lily Gross',
        date: DateTime.now().toLocaleString(DateTime.DATE_MED),
        startTime: '5:30 PM',
        endTime: '6:30 PM'
    }
];