var database = require('../src/js/data.js');

describe("Tests", function() {
    it("correct answers quantity", function() {
        expect(database.getCorrect().length).toBe(database.questions.length);
    });

    it ("question text", function () {
        for (let i=0; i < database.questions.length; i++) {
            expect(database.questionText()[i]).toMatch(/Вопрос/);
        }
    });

    it ("question text", function () {
        for (let i=0; i < database.questions.length; i++) {
            expect(database.questionText()[i]).toContain('№');
        }
    });

    it ("answer check", function () {
        let userAnswers = [1, 2, 3];

        beforeEach(function() {
            userAnswers = []
        });

        afterEach(function() {
            userAnswers = []
        });

        expect(database.getCorrect()).toEqual(userAnswers);
    });
});
