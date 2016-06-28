$(function() {
    localStorage.setItem('test', JSON.stringify(database));
    let $data = JSON.parse(localStorage.getItem('test'));
    console.log($data);

    let wrapper = $('<div class="wrapper">');
    wrapper.append($(`<h1>${$data.header}</h1>`));
    wrapper.append($('<form>'));
    for (let i = 0; i < $data.questions.length; i++) {
        let question = $('<div class="question">');
        question.append($(`<p>${$data.questions[i].title}</p>`));
        for (let j = 0; j < $data.questions[i].answers.length; j++) {
            let answer = $('<div class="answer">');
            answer.append(`<input type="radio" name="${$data.questions[i].radioname}" id="${$data.questions[i].id[j]}">`);
            answer.append(`<label for="${$data.questions[i].id[j]}">${$data.questions[i].answers[j]}</label>`);
            question.append(answer);
        }
        wrapper.append(question);
    }

    wrapper.append($(`<button>${$data.submit}</button>`));

    $('body').append(wrapper);

    function showModal(e) {
        e.preventDefault();

        let $modal = $('<div class="modal"></div>');
        let $result = 0;
        let $answer = $('input:checked');
        let $correct = [];

        for (let i = 0; i < $data.questions.length; i++) {
                $correct[i] = $data.questions[i].correct;
            if ($($answer[i]).attr('id') == $correct[i]) {
                $result += 1;
                $modal.append('<p class="correct">Ответ на ' + (i+1) + ' вопрос <b>правильный</b></p>');
            } else {
                $modal.append('<p class="incorrect">Ответ на ' + (i+1) + ' вопрос <b>неправильный</b></p>');
            }
        }

        console.log($correct);

        $modal.append('<h4 class="result">Всего правильных ответов: ' + $result + '</h4><hr>');

        if ($result == $data.questions.length) {
            $modal.append('<h4>Поздравляем! Вы успешно прошли тест</h4>');
        } else {
            $modal.append('<h4>Tест не пройден</h4>');
        }

        $modal.append('<button>Закрыть и начать заново</button>');
        $('body').append($modal);

        $('button').one('click', function (e) {
            e.preventDefault();
            $modal.detach();
            $('input').attr('checked', false);
        })
    }

    $('button').on('click', showModal);
});
