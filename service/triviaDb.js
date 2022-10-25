const fetch = require("node-fetch");

module.exports = {
    getQuestions: async (parameters) => {
        return new Promise((resolve, reject) => {
            if (parameters.numberOfQuestions === undefined || parameters.numberOfQuestions > 50) {
                reject("A Maximum of 50 Questions can be retrieved per call.")
            } else {

                if (parameters.difficulty === 'easy' || parameters.difficulty === 'medium' || parameters.difficulty === 'hard') {
                    parameters.difficulty = '&difficulty=easy'
                } else {
                    parameters.difficulty = ''
                }
                if (parameters.categories === undefined || parameters.categories === 'any') {
                    parameters.categories = ''
                } else {
                    parameters.categories = '&category=' + parameters.categories
                }
                const url = `https://opentdb.com/api.php?amount=${parameters.numberOfQuestions}${parameters.categories}${parameters.difficulty}&type=multiple`;
                fetch(url)
                    .then(res => res.json())
                    .then(results => {
                        if (results.response_code === 1) {
                            reject("Server error")
                        } else
                            resolve(results.results)
                    })
                    .catch(err => {
                        reject(err)
                    });
            }
        })
    },
    getCategories: async () => {
        return new Promise((resolve, reject) => {
            fetch('https://opentdb.com/api_category.php')
                .then(res => res.json())
                .then(results => {
                    resolve([{ id: 0, name: "Any Category" }, ...results.trivia_categories])
                })
                .catch(err => {
                    reject(err)
                });
        })
    },
    getDifficulty: () => {
        return ["any", "easy", "medium", "hard"]
    }
}