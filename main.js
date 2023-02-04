const DEBUG = true;

const TEXT_ENTRY = "#text-entry";
const TITLE = "#title";
const BODY = "#body";
const LOADING = "#loading";

function typeText(text, elemId) {
  console.log("Typing", text, elemId);
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
  "What are your hobbies?": {
    placeholder: "e.g. reading, writing, gaming, cooking",
    answer: "reading, writing, gaming, cooking",
  },
  "What are your biggest strengths?": {
    placeholder: "e.g. maths, people skills, drawing, writing",
    answer: "maths, people skills",
  },
  "Do you want to go to university?": {
    placeholder: "yes/no",
    answer: "no",
  },
};

function questionAnswered(event) {
  const questionElem = document.querySelector(BODY);
  const answer = document.querySelector(`${TEXT_ENTRY} input`).value;
  QUESTIONS[questionElem.textContent].answer = answer;

  questionElem.innerHTML = "";
  const te = document.querySelector(TEXT_ENTRY);
  te.classList.add("invisible");
  nextStep();
}

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
    "Conversation between a fantastic career coach and a high school student.\n";

  for (const [question, val] of Object.entries(QUESTIONS)) {
    prompt += "Coach: " + question + "\n";
    console.log(val);
    prompt += "Student: " + val.answer + "\n";
  }
  prompt +=
    "Coach: OK, great. Here are 3 suggestions for careers you might want to explore, sensible next steps for each, and the amount of additional education required:\n";
  console.log("prompt", prompt);
  const body = {
    model: "text-davinci-003",
    prompt,
    temperature: 0.1,
    max_tokens: 256,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  };

  const token = "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";
  const url = "https://api.openai.com/v1/completions";

  const response = await fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
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
