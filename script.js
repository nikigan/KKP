let form = document.getElementsByName("form");
let url = "http://193.218.136.174:8080/cabinet/rest/";
$('form').submit(function (e) {
    e.preventDefault();
    $.ajax({
        type: "POST",
        url: url + "auth/login",
        data: JSON.stringify({
            username: $('#username').val(),
            password: $('#password').val(),
            appToken: "tjHnsdpF7Q"
        }),
        contentType: "application/json"
    }).done(function (data) {
        data = JSON.parse(data);
        console.log(data);
        if (data.status === 'success'){
            window.localStorage.setItem('userToken', data.usertoken);
            document.location.href = 'mainPage.html';
        }
        else {
            alert('Ошибка входа!')
        }
    })

});