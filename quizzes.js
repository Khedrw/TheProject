const ArrayOfQuizzes = [
    {
        title: "JavaScript Basics Quiz",
        questions: [
            {
                question: "What is the output of 'console.log(typeof null)' in JavaScript?",
                options: ["object", "null", "undefined", "number"],
                answer: "object"
            },
            {
                question: "Which of the following keywords can be used to declare a variable in JavaScript?",
                options: ["var", "let", "const", "All of the above"],
                answer: "const"
            },
            {
                question: "What is the output of executing the following code in JavaScript? < console.log(typeof null); >",
                options: ["null", "object", "number", "undefined"],
                answer: "object"
            }
        ]
    },
    {
        title: "HTML & CSS Quiz",
        questions: [
            {
                question: "What does HTML stand for?",
                options: [
                    "HyperText Markup Language",
                    "Hyper Trainer Markup Language",
                    "HyperText Making Language",
                    "Hyperlink Markup Language"
                ],
                answer: "HyperText Markup Language"
            },
            {
                question: "Which CSS property is used to change the text color of an element?",
                options: [
                    "font-color",
                    "text-color",
                    "color",
                    "foreground-color"
                ],
                answer: "color"
            },
            {
                question: "Which CSS property is used to set the spacing between the content and the border of an element?",
                options: [
                    "margin",
                    "padding",
                    "color",
                    "foreground-color"
                ],
                answer: "padding"
            }
        ]
    },
    {
        title: "Algorithms Quiz",
        questions: [
            {
                question: "Which of the following is a common sorting algorithm?",
                options: [
                    "Binary Search",
                    "Quick Sort",
                    "Breadth First Search",
                    "Depth First Search"
                ],
                answer: "Quick Sort"
            },
            {
                question: "What is the Big O notation of a binary search algorithm?",
                options: [
                    "O(1)",
                    "O(n)",
                    "O(log n)",
                    "O(n log n)"
                ],
                answer: "O(log n)"
            },
            {
                question: "Which algorithm is used to find the shortest path in a graph?",
                options: [
                    "Bubble Sort",
                    "Depth First Search",
                    "Binary Search",
                    "Dijkstra's Algorithm"
                ],
                answer: "Dijkstra's Algorithm"
            }
        ]
    }
];

// Save the quizzes data to localStorage
localStorage.setItem("quizzes", JSON.stringify(ArrayOfQuizzes));
console.log("Programming quizzes have been saved in localStorage");

// To retrieve the data when needed, you can use the following code:
// const storedQuizzes = JSON.parse(localStorage.getItem("quizzes"));
// console.log(storedQuizzes);