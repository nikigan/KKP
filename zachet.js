function getMarks() {
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
            $.ajax({
                type: "POST",
                url: url + "student/rating",
                data: JSON.stringify({
                    semester: data.studentSemesters[indexSem].idLGS,
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
                    fillMarks(data.ratings);
                });
        });
}

function fillMarks(marks){
    for (let i = 0; i < marks.length; i++) {
        let obj = marks[i];
        if (obj.isExam){
            $('#exam').append($('<tr>' +
                '<td>' + obj.subjectName +
                '</td>' +
                '<td>' + obj.examrating +
                '</td>' +
                '<td>' + obj.examTutor +
                '</td>' +
                '</tr>'))
        } else if (obj.isPass){
            $('#zachet').append($('<tr>' +
                '<td>' + obj.subjectName +
                '</td>' +
                '<td>' + ((obj.passrating == 1 || obj.passrating == 5) ? "Зачтено" : "Не зачтено") +
                '</td>' +
                '<td>' + obj.passTutor +
                '</td>' +
                '</tr>'))
        }
    }
}
let indexSem = $('#semseter :selected').val() - 1;

$('#semseter').change(function () {
    indexSem = $('#semseter :selected').val() - 1;
    $('#zachet').html(' <tr>\n' +
        '            <th class="name" colspan="5">\n' +
        '                <h2 class="text-center">Зачеты</h2>\n' +
        '            </th>\n' +
        '        </tr>\n' +
        '        <tr>\n' +
        '            <th class="name text-center">Наименование дисциплины</th>\n' +
        '            <th class="name text-center">Оценка</th>\n' +
        '            <th class="name text-center">Преподаватель</th>\n' +
        '        </tr>');
    $('#exam').html('<tr>\n' +
        '            <th class="name" colspan="5">\n' +
        '                <h2 class="text-center">Экзамены</h2>\n' +
        '            </th>\n' +
        '        </tr>\n' +
        '        <tr>\n' +
        '            <th class="name text-center">Наименование дисциплины</th>\n' +
        '            <th class="name text-center">Оценка</th>\n' +
        '            <th class="name text-center">Преподаватель</th>\n' +
        '        </tr>');
    getMarks();
});
getMarks();