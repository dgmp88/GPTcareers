DEBUG = true;

TEXT_ENTRY = "#text-entry";
TITLE = "#title";
BODY = "#body";

function typeText(text, elemId) {
  console.log("Typeing", text, elemId);
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
    placeholder: "e.g. reading, adventure sports, writing, gaming, cooking",
    answer: "reading, adventure sports, writing, gaming, cooking",
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
  const question = document.querySelector(BODY).textContent;
  const answer = document.querySelector(`${TEXT_ENTRY} input`).value;
  QUESTIONS[question] = answer;

  const te = document.querySelector(TEXT_ENTRY);
  te.classList.add("invisible");
  nextStep();
}

function checkAnswer(event) {
  console.log(event.target.value);

  const inputElem = document.querySelector("#text-entry input");
  const submitButton = document.querySelector("#submit");
  if (inputElem.value.length == 0) {
    submitButton.disabled = true;
  } else {
    submitButton.disabled = false;
  }
}

async function getResults() {
  let prompt =
    "Conversation between a fantastic career coach and a high school student.\n";

  for ([question, val] of Object.entries(QUESTIONS)) {
    prompt += "Coach: " + question + "\n";
    prompt += "Student: " + val.answer + "\n";
  }
  prompt +=
    "Coach: OK, great. Here are 3 suggestions for careers you might want to explore, sensible next steps for each, and the amount of additional education required:\n";

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
