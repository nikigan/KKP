let userToken = window.localStorage.getItem('userToken');
let studObj = {
    birthday: undefined,
    email: undefined,
    groupname: undefined,
    name: undefined,
    surname: undefined,
    patronymic: undefined,
    recordbook: undefined
};

getData();

function getData() {
    $.ajax({
        type: "POST",
        url: url + "student/get",
        data: JSON.stringify({
            text: '',
            userToken: userToken
        }),
        contentType: "application/json",
        converters: {
            "* json": function (text) {
                return $.parseJSON(text);
            }
        },
        dataType: 'json'
    })
        .done(function (data) {
            fillFields(data.student);
            return data.student;
        });
}

function fillFields(studObj) {
    $('#name').append($('<span class="justify-content-center">').append(`${studObj.surname} ${studObj.name} ${studObj.patronymic}`));
    $('#group').text(`${studObj.groupname}`);
    $('#birthday').text(`${studObj.birthday}`);
    $('#email').text(`${studObj.email}`);
    $('#recordBook').text(`${studObj.recordbook}`);
}

function groupMates() {
    $.ajax({
        type: "POST",
        url: url + "student/classmates",
        data: JSON.stringify({
            text: '',
            userToken: userToken
        }),
        contentType: "application/json",
        converters: {
            "* json": function (text) {
                return $.parseJSON(text);
            }
        },
        dataType: 'json'
    })
        .done(function (data) {
            console.log(data);
        });
}

function getSemesters() {
    $.ajax({
        type: "POST",
        url: url + "student/semesters",
        data: JSON.stringify({
            text: '',
            userToken: userToken
        }),
        contentType: "application/json",
        converters: {
            "* json": function (text) {
                return $.parseJSON(text);
            }
        },
        dataType: 'json'
    })
        .done(function (data) {
            return data;
        });
}





