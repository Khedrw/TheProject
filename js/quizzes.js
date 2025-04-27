import { initQuizzes } from './storage.js';

const initialData = [
    {
        title: "JavaScript Basics",
        questions: [
            { question: "typeof null?", options: ["object", "null", "undefined"], answer: "object" },
            { question: "Declare variable keyword?", options: ["var", "let", "const"], answer: "const" },
            { question: "What is NaN==NaN?", options: ["true", "false"], answer: "false" }
        ]
    },
    {
        title: "HTML & CSS",
        questions: [
            { question: "HTML stands for?", options: ["HyperText Markup Language", "…"], answer: "HyperText Markup Language" },
            { question: "Change text color in CSS?", options: ["color", "font-color"], answer: "color" },
            { question: "Space between border and content?", options: ["margin", "padding"], answer: "padding" }
        ]
    },
    {
        title: "Algorithms",
        questions: [
            { question: "Common sorting algorithm?", options: ["Quick Sort", "Bubble Sort"], answer: "Quick Sort" },
            { question: "Binary search complexity?", options: ["O(log n)", "O(n)"], answer: "O(log n)" },
            { question: "Shortest path algorithm?", options: ["Dijkstra", "DFS"], answer: "Dijkstra" }
        ]
    }
];

initQuizzes(initialData);
console.log('Quizzes initialized'); 
