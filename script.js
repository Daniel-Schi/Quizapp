let questions = [ // JSON Array mit den jeweiligen stings
    {
        "question": "Wie heißt der Fisch, der Stromschläge verteilen kann?",
        "answer_1": "Weiße Hai",
        "answer_2": "Piranha",
        "answer_3": "Zitteraal",
        "answer_4": "Rochen",
        "right_answer": 3
    },
    {
        "question": "Wie lange hat Goethe an seinem Werk 'Faust' gearbeitet?",
        "answer_1": "5 Jahre",
        "answer_2": "12 Monate",
        "answer_3": "64 Jahre",
        "answer_4": "35 Jahre",
        "right_answer": 3
    },
    {
        "question": "Wie viele Planeten gehören zu unserem Sonnensystem?",
        "answer_1": "5",
        "answer_2": "12",
        "answer_3": "7",
        "answer_4": "8",
        "right_answer": 4
    },
    {
        "question": "Mit wie vielen Figuren startet ein Schachspiel?",
        "answer_1": "24",
        "answer_2": "28",
        "answer_3": "32",
        "answer_4": "34",
        "right_answer": 3
    },
    {
        "question": "Wie lang ist der Panamakanal?",
        "answer_1": "2 km",
        "answer_2": "82 km",
        "answer_3": "20 km",
        "answer_4": "112 km",
        "right_answer": 2
    },
    {
        "question": "Welchen Aggregatzustand hat der inner Erdkern?",
        "answer_1": "flüssig",
        "answer_2": "weich",
        "answer_3": "fest",
        "answer_4": "gasförmig",
        "right_answer": 3
    },
    {
        "question": "Wie heißt der freche Kobold von Meister Eder?",
        "answer_1": "Fritz",
        "answer_2": "Pinocciho",
        "answer_3": "Pumuckl",
        "answer_4": "BigFoot",
        "right_answer": 3
    },
    {
        "question": "Woraus bestehen Rosinen?",
        "answer_1": "süßem Gellee",
        "answer_2": "Himbeeren",
        "answer_3": "Mais",
        "answer_4": "Weintrauben",
        "right_answer": 4
    },
    {
        "question": "Aus wie vielen Knochen besteht ein Erwachsenenkörper?",
        "answer_1": "25",
        "answer_2": "120",
        "answer_3": "206",
        "answer_4": "254",
        "right_answer": 3
    },
    {
        "question": "Was ist eine Primzahl?",
        "answer_1": "Eine Zahl, die nur durch 1 und sich selbst teilbar ist",
        "answer_2": "Eine Zahl die wir nicht schreiben können",
        "answer_3": "Eine Blume",
        "answer_4": "Eine Zahl, die nur durch gerade Zahlen teilbar ist",
        "right_answer": 1
    },
];

let rightQuestions = 0;
let currentQuestion = 0; // Variable definieren die uns das erste Array aus dem JSON definiert(an der Stelle 0)
let AUDIO_SUCCESS = new Audio('audio/success.mp3')
let AUDIO_FAIL = new Audio('audio/lose.wav')
let AUDIO_END = new Audio('audio/win-fanfare.mp3')

function init() { // läd beim öffnen der Seite meinen kompletten body
    document.getElementById('all-questions').innerHTML = questions.length; // damit hole ich mir diee gesamte Länge des JSON Array raus
    showQuestion(); // damit wird meine function showQuestion beim laden der Seite durch init mit aufgerufen
}


function showQuestion() {
    if (gameIsOver()) {
        showEndScreen();
    } else { 
        updateToNextQuestion();
    }
    updateProgressBar();
}


function gameIsOver() {
    return currentQuestion >= questions.length;
}


function showEndScreen() {
    document.getElementById('endScreen').style = '';
    document.getElementById('questionBody').style = 'display: none';

    document.getElementById('number-of-question').innerHTML = questions.length; // alternativ würde auch currentQuestion gehen.
    document.getElementById('right-answer').innerHTML = rightQuestions; // Definition der richtigen Antworten am Ende
    document.getElementById('header-image').src = 'img/podest-win.jpg';
    AUDIO_END.play();
}


function updateProgressBar() {
    let percent = currentQuestion / questions.length; // Variable um die % auszurechnen. In dem Fall die Frage / die Länge der Anzahl an Fragen
    percent = Math.round(percent * 100); // Math.round ist zum aufrunden der Prozentzahl
    document.getElementById('progress-bar').innerHTML = `${percent} %`; // hier wird uns die Prozentzahl im HTML angezeigt
    document.getElementById('progress-bar').style = `width: ${percent}%;`; // hier wird uns der Balken im HTML angezeigt als Style
}


function updateToNextQuestion() {
    let question = questions[currentQuestion]; // let question ist ein Container/ dann gehen wir in das Array questions rein/ und holen uns das erste Array currentQuestion raus

    document.getElementById('question-number').innerHTML = currentQuestion + 1; // Erste Zahl von den Fragen wird angezeigt und fängt bei 1 an(durch + 1)
    document.getElementById('question-text').innerHTML = question['question']; // Definition der Frage aus dem Array(question) durch die id question-text
    document.getElementById('answer_1').innerHTML = question['answer_1']; //Definition der Antwort(answer_1) durch die id answer_1
    document.getElementById('answer_2').innerHTML = question['answer_2']; //Definition der Antwort(answer_2) durch die id answer_2
    document.getElementById('answer_3').innerHTML = question['answer_3']; //Definition der Antwort(answer_3) durch die id answer_3
    document.getElementById('answer_4').innerHTML = question['answer_4']; //Definition der Antwort(answer_4) durch die id answer_4
}


function answer(selection) { //
    let question = questions[currentQuestion]; // s.o. Zeile 100
    let selectedQuestionNumber = selection.slice(-1); // hier wird die letzte Zahl/Buchstabe aus selection(answer_3) definiert

    let idOnRightAnswer = `answer_${question['right_answer']}`;

    if (rightAnswerSelected(selectedQuestionNumber, question)) { //vergleich von der selectedQuestionNumber(answer_3/ die 3 in dem Fall) mit der question['right_answer'] in dem Fall 3
        document.getElementById(selection).parentNode.classList.add('bg-success');
        AUDIO_SUCCESS.play();
        rightQuestions++; // damit kann ich die Zahl um 1 erhöhen. In diesem Fall die richtigen Antworten
    } else {
        document.getElementById(selection).parentNode.classList.add('bg-danger');  // wenn das nicht übereinstimmt, dann bekommen wir diese Aussage(Antwort)
        document.getElementById(idOnRightAnswer).parentNode.classList.add('bg-success'); // bei flascher Antwort, wird gleichzeitig die richtige Antwort angezeigt
        AUDIO_FAIL.play();
    }
    document.getElementById('next-button').disabled = false; // damit kann ich den button nach beliebiger Antwort wieder benutzen
}


function rightAnswerSelected(selectedQuestionNumber, question) {
    return selectedQuestionNumber == question['right_answer'];
}


function nextQuestion() {
    currentQuestion++; // z.B. von 0 auf 1
    resetAnswerButtons(); // die ausgelagerte function wird hier wieder eingebunden
    document.getElementById('next-button').disabled = true;
    showQuestion();
}


function resetAnswerButtons() { // Auslagern der Function zum kürzeren, übersichtlicheren Code
    document.getElementById('answer_1').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_1').parentNode.classList.remove('bg-success');
    document.getElementById('answer_2').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_2').parentNode.classList.remove('bg-success');
    document.getElementById('answer_3').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_3').parentNode.classList.remove('bg-success');
    document.getElementById('answer_4').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_4').parentNode.classList.remove('bg-success');
}


function restartQuiz() {
    document.getElementById('header-image').src = 'img/quiz.jpg'; // quiz img wird wieder angezeigt
    document.getElementById('questionBody').style = ''; // questionBody wieder anzeigen
    document.getElementById('endScreen').style = 'display: none'; // endScreen wird ausgeblendet
    rightQuestions = 0; // rigthQuestions wird hinzugefügt
    currentQuestion = 0; // currentQuestion wird hinzugefügt
    init();
}