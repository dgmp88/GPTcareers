export const start =
	'Pretend to be an incredibly knowledgeable and thoughtful career coach ' +
	'who is evaluating my answers to the following career questions. ' +
	'What career options should I consider? Please provide the top 10 suggestions and why I might be interested. ' +
	"Note, just because someone enjoys being social doesn't mean that they necessarily want to be a social media manager.  " +
	'Keep in mind which are the most in-demand careers as well.\n';

const questions = [
	'What do you enjoy learning about?',
	'How do you like to spend your time?',
	'Do you prefer manual labor or mental labor?',
	'Are you a routine person or a spontaneous person?',
	'Do you like working with others or by yourself?',
	'Which of your skills are you most proud of?',
	'Do you plan to go to university?',
	'Which of your strengths do you enjoy the most?',
	'Do you see yourself doing work indoors or outdoors?',
	'What are your priorities in life?',
	'Where in your life do you find meaning?',
	'What does success mean to you?',
	'What do you want to do more of?',
	'What motivates you?'
];

export const finish =
	'Coach: OK, great. Here are 3 suggestions for careers you might want to explore, sensible next steps for each, and the amount of additional education required:\n';

export const getNextQuestion = (): string => {
	const q = questions.shift();
	if (q === undefined) {
		return '';
	}
	return q;
};
