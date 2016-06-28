let database = {
    header: 'Тест по программированию',
    questions: [{
            title: 'Вопрос №1',
            radioname: 'one',
            id: ['1','2','3'],
            answers:['Вариант ответа №1','Вариант ответа №2','Вариант ответа №3'],
            correct: 1
        },
        {
            title: 'Вопрос №2',
            radioname: 'two',
            id: ['1','2','3'],
            answers:['Вариант ответа №1','Вариант ответа №2','Вариант ответа №3'],
            correct: 2
        },
        {
            title: 'Вопрос №3',
            radioname: 'three',
            id: ['1','2','3'],
            answers:['Вариант ответа №1','Вариант ответа №2','Вариант ответа №3'],
            correct: 3
        }],
    submit: 'Проверить мои результаты',
    getCorrect: function() {
        let correct = [];
        for (var i=0; i<this.questions.length; i++) {
            correct[i] = this.questions[i].correct;
        }
        return correct;
    },
    questionText: function () {
        let questionText = [];
        for (var i=0; i<this.questions.length; i++) {
            questionText[i] = this.questions[i].title;
        }
        return questionText;
    }
};

try {
    module.exports = database;
} catch (e) {}
