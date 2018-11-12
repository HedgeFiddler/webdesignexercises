$(document).ready(function () {
    const number_of_questions =  5;
    let currentQuestion =  1;
    const $next_button = $('#next-question');
    const $prev_button = $('#previous-question');
    const $submit_button = $('#submit-answers');

    loadQuestionByNumber(currentQuestion);
    setListeners();

    function loadNextQuestion() {
        if(currentQuestion + 1 <= number_of_questions){
            currentQuestion++;
            loadQuestionByNumber(currentQuestion);
        }
    }

    function loadPreviousQuestion() {
        if(currentQuestion-1 >= 1){
            currentQuestion--;
            loadQuestionByNumber(currentQuestion);
        }
    }

    function setListeners() {
        alterButtonVisibility()
        $next_button.click(function () {
            loadNextQuestion();
            alterButtonVisibility()
        });
        $prev_button.click(function () {
            loadPreviousQuestion();
            alterButtonVisibility()
        });
        $submit_button.click(function () {
            window.open('summary.html', '_parent');
        })

    }

    function alterButtonVisibility() {
        if(currentQuestion === 1){
            $prev_button.hide();
            $submit_button.hide();
        } else if(currentQuestion > 1 && currentQuestion < number_of_questions){
            $next_button.show();
            $prev_button.show();
            $submit_button.hide();
        } else {
            $next_button.hide();
            $submit_button.show();
        }

    }



    function loadQuestionByNumber(question_number) {
        $('#question-container').load('questions/question_' + question_number.toString() + '.html')

    }

    function loadQuestionDataIfPresent(questionNumber) {
        const data = localStorage.getItem(questionNumber.toString());
        if (data !== null) {
            $('form').fromJSON(data);
        }
    }

    function saveQuestionData(questionNumber) {
        localStorage.setItem(questionNumber.toString(), $('form').toJSON());
    }



});