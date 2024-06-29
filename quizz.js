const correctAnswers = ['Moineau domestique', 'Merle noir', 'Mésange charbonnière', 'Pouillot véloce', 'Troglodyte mignon', 'Rougegorge familier', 'Pinson des arbres', 'Mésange bleue', 'Choucas des tours', 'Grimpereau des jardins'];

function validateAnswer() {
  const questions = document.querySelectorAll('.form-quizz');
  let correctCount = 0;
  const results = [];
  let allAnswered = true;

  questions.forEach(function (question, index) {
    const userAnswer = question.querySelector('input[name="reponse"]:checked');

    if (userAnswer) {
      const isCorrect = userAnswer.value === correctAnswers[index];
      if (isCorrect) {
        correctCount++;
      }

      results.push({
        questionNumber: index + 1,
        userAnswer: userAnswer.value,
        correctAnswer: correctAnswers[index],
        isCorrect: isCorrect
      });
    } else {
      allAnswered = false;
    }
  });

alert('Vous avez répondu correctement à ' + correctCount + ' question(s) sur ' + correctAnswers.length + '  ! 🤓');
  storeResults(results);
  window.location.href = 'resultat.html';
  displayResults(results);
}

// Tenter plus tard de mettre le cas où il y oubli de réponse pour alerter l'utilisateur
  
  function storeResults(results) {
    try {
      localStorage.setItem('quizResults', JSON.stringify(results));
    } catch (error) {
      console.error('Erreur lors du stockage des résultats:', error);
    }
  }

function displayResults(results) {
  const table = document.getElementById('corrections');
  const tableBody = table.querySelector('tbody');
  tableBody.innerHTML = ''; // Tableau vide de base

  results.forEach(function (result) {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${result.questionNumber}</td>
      <td style="color: ${result.isCorrect ? 'green' : 'red'}">${result.userAnswer}</td>
      <td>${result.correctAnswer}</td>
    `;
    tableBody.appendChild(row);
  });
}

document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('envoyer-reponses').addEventListener('click', validateAnswer);
});