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
      window.setTimeout(next, DEBUG ? 0 : 6);
    } else {
      nextStep();
    }
  };
  next();
}
const QUESTIONS = {
  "What do you enjoy learning about?": {
    placeholder: "",
  },
  "How do you like to spend your time?": {
    placeholder: "",
  },
  "Do you prefer manual labor or mental labor?": {
    placeholder: "",
  },
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
};

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
    "Pretend to be an incredibly knowledgeable and thoughtful career coach " +
    "who is evaluating my answers to the following career questions. " +
    "What career options should I consider? Please provide the top 10 suggestions and why I might be interested. " +
    "Note, just because someone enjoys being social doesn't mean that they necessarily want to be a social media manager.  " +
    "Keep in mind which are the most in-demand careers as well.\n";

  for (const [question, val] of Object.entries(QUESTIONS)) {
    prompt += "Coach: " + question + "\n";
    prompt += "Student: " + val.answer + "\n";
  }
  prompt +=
    "Coach: OK, great. Here are 3 suggestions for careers you might want to explore, sensible next steps for each, and the amount of additional education required:\n";

  const url = import.meta.env.VITE_API_URL;
  console.log("request");

  const response = await fetch(`${url}/api/chatgpt`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    }),
  });

  console.log("response ", response);

  const data = await response.json();
  console.log("data", data);
  document.querySelector(LOADING).classList.add("invisible");
  typeText(data.choices[0].message.content, BODY);
  // typeText(data["choices"][0].text, BODY);
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
