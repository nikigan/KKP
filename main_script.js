let userToken = window.localStorage.getItem('userToken');
let studObj;
$.ajax({
    type: "POST",
    url: url+"student/get",
    data: JSON.stringify({
        text: '',
        userToken: userToken
    }),
        contentType: "application/json"
})
    .done(function (data) {
        studObj = JSON.parse(data).student;
        $('#name').append($('<span class="justify-content-center">').append(`${studObj.surname} ${studObj.name} ${studObj.patronymic}`));
        $('#group').text(`${studObj.groupname}`);
        $('#birthday').text(`${studObj.birthday}`);
        $('#email').text(`${studObj.email}`);
        $('#recordBook').text(`${studObj.recordbook}`);
    });



