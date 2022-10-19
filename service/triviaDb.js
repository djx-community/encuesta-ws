const fetch = require("node-fetch");

module.exports = {
    getQuestions: async (parameters) => {
        return new Promise((resolve, reject) => {
            if (parameters.NumberOfQuestions > 50) {
                reject("A Maximum of 50 Questions can be retrieved per call.")
            }
            if (parameters.difficulty != 'easy' && parameters.difficulty != 'medium' && parameters.difficulty != 'hard') {
                reject("difficulty parameter must be easy,medium or hard")
            }
            const url = `https://opentdb.com/api.php?amount=${parameters.NumberOfQuestions}&category=${parameters.category}&difficulty=${parameters.difficulty}&type=multiple`;
            fetch(url)
                .then(res => res.json())
                .then(results => {
                    if (results.response_code == 1) {
                        reject("Server error")
                    }
                    console.log(results.results);
                    resolve(results.results)
                })
                .catch(err => {
                    console.log(err);
                });
        })
    },
    getCategories: async () => {
        try {
            let response = await fetch('https://opentdb.com/api_category.php')
            return [{ value: 0, name: "Any Category" }, ...response.json()];
        }
        catch (err) {
            console.log(err.message)
        }
    },
    getDifficulty: () => {
        return ["any", "easy", "medium", "hard"]
    }
}