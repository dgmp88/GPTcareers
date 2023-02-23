const DEBUG = false;

const TEXT_ENTRY = "#text-entry";
const TITLE = "#title";
const BODY = "#body";
const LOADING = "#loading";

function typeText(text, elemId) {
  const elem = document.querySelector(elemId);
  var idx = 0;
  const next = () => {
    elem.innerHTML = text.slice(0, idx);
    idx += 1;
    if (idx <= text.length) {
      window.setTimeout(next, DEBUG ? 0 : 60);
    } else {
      nextStep();
    }
  };
  next();
}
const QUESTIONS = {
  "What do you enjoy learning about?": {
    placeholder: "e.g. maths, history, economics, art, writing",
  },
  "How do you like to spend your time?": {
    placeholder: "e.g. reading, writing, socialsing, gaming, cooking",
  },
  "Which of your skills are you most proud of?": {
    placeholder: "e.g. my ability to talk to anyone",
  },
  "Do you want to go to university?": {
    placeholder: "yes/no",
  },
  "Do you like working with others or by yourself?": {
    placeholder: "e.g. working with others, working by myself",
  },
  "Do you see yourself doing manual labor or mental labor?": {
    placeholder: "e.g. manual labor, mental labor",
  },
  "Are you a routine person or a spontaneous person?": {
    placeholder: "e.g. routine, spontaneous",
  },
};

// "Are you a routine person or a spontaneous person?": {
//   placeholder: "",
// },
// "Do you like working with others or by yourself?": {
//   placeholder: "",
// },
// "Which of your skills are you most proud of?": {
//   placeholder: "",
// },
// "Do you plan to go to university?": {
//   placeholder: "",
// },
// "Which of your strengths do you enjoy the most?": {
//   placeholder: "",
// },

window.questionAnswered = (event) => {
  const questionElem = document.querySelector(BODY);
  const answer = document.querySelector(`${TEXT_ENTRY} input`).value;
  QUESTIONS[questionElem.textContent].answer = answer;

  questionElem.innerHTML = "";
  const te = document.querySelector(TEXT_ENTRY);
  te.classList.add("invisible");
  nextStep();
};

window.checkAnswer = (event) => {
  const inputElem = document.querySelector("#text-entry input");
  const submitButton = document.querySelector("#submit");
  if (inputElem.value.length == 0) {
    submitButton.disabled = true;
  } else {
    submitButton.disabled = false;
  }
};

async function getResults() {
  // Show the loader
  document.querySelector(LOADING).classList.remove("invisible");

  let prompt =
    "Pretend to be the most incredibly knowledgeable and thoughtful career coach who really cares about helping people find their ikigai. Ikigai is the perfect balance between what you are good at, what you love, what the world needs, and what you can be paid for." +
    "Note, just because someone enjoys being social doesn't mean that they necessarily want to be a social media manager." +
    "Keep in mind which are the most in-demand careers as well." +
    'If someone doesn\'t provide enough useful information in the answers, respond with "Sorry that was not enough information to give you a personalised response, the more you put into giving me the correct answers, the more you will get out of it" ' +
    "Keeping this in mind, evaluate the answers to the following career questions. What career options should I consider? Please provide the top 10 suggestions and why I might be interested.";

  for (const [question, val] of Object.entries(QUESTIONS)) {
    prompt += "Coach: " + question + "\n";
    prompt += "Student: " + val.answer + "\n";
  }
  prompt +=
    "Coach: OK, great. Here are some suggestions for careers you might want to explore, sensible next steps for each, and the amount of additional education required:\n";
  console.log("prompt", prompt);
  const body = {
    model: "text-davinci-003",
    prompt,
    temperature: 0.01,
    max_tokens: 1024,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  };

  const token = "sk-1nls7yIhgEZ9lLcuaD7xT3Blb";
  const token2 = "aakFJTjeF6Pk7rkHTP5JrqPMx";
  const url = "https://api.openai.com/v1/completions";

  const response = await fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}${token2.slice(2)}`,
    },
    body: JSON.stringify(body),
  });
  const data = await response.json();
  document.querySelector(LOADING).classList.add("invisible");
  typeText(data["choices"][0].text, BODY);
}

// Intro
const STEPS = [() => typeText("Find your path", TITLE)];

// Add in the questions
for (const question of Object.keys(QUESTIONS)) {
  STEPS.push(() => typeText(question, BODY));
  STEPS.push(() => {
    const div = document.querySelector(TEXT_ENTRY);
    div.classList.remove("invisible");
    const inputElem = document.querySelector("#text-entry input");
    inputElem.value = "";
    inputElem.placeholder = QUESTIONS[question].placeholder;
    inputElem.focus();
    inputElem.select();
  });
}
STEPS.push(getResults);

let step = 0;

const nextStep = () => {
  if (step < STEPS.length) {
    STEPS[step]();
    step += 1;
  }
};

addEventListener("load", nextStep);

const jokes = [
  "I quit my position as a scuba diving instructor the first day at my job.\n Deep down, I realized it wasn’t for me.",
  "I went for the job interview and the interviewer said they are looking for somebody who is responsible....I said 'I'm your guy!'They asked why...\n'Well at my old job if something went wrong, something went missing or somebody got hurt, they always said I was responsible'",
  "Why did the electrician choose a career in the power industry?\n He wanted to light up the world.",
  "Why did the lawyer choose a career in the legal field?\n He wanted to make a case for himself.",
];

const jokeElement = document.querySelector(".fancy-text.text-4xl");

const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
jokeElement.innerText = randomJoke;

const inputField = document.querySelector("input");
const continueButton = document.querySelector("#submit");

inputField.addEventListener("keyup", function (event) {
  if (event.keyCode === 13) {
    continueButton.click();
  }
});
