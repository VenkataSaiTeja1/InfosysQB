import React, { useState, useMemo } from "react";
import { Search, ChevronDown, CheckCircle2, Circle, BookOpen, Target, Layers, Code2, Puzzle, Type, PenLine, Calculator, X } from "lucide-react";

/* ============================================================
   DATA — Infosys Off-Campus 2026 Question Bank
   Vignan's Lara Institute of Technology & Science
   ============================================================ */

const SECTIONS = [
  {
    id: "logical",
    label: "Logical Ability",
    meta: "15 Qs · 25 min · Cutoff ~9-11 correct",
    icon: Layers,
    accent: "#1F3864",
    tips: "Sectional cutoff is independent — don't let a strong Quant score compensate. Cryptarithmetic and Data Sufficiency now recur almost every drive.",
    questions: [
      {
        q: "Six friends A, B, C, D, E, F sit in a closed circle facing the centre. E is to the left of D. C is between A and B. F is between E and A. Who is to the left of B?",
        type: "mcq",
        options: ["A", "C", "D", "E"],
        answer: "C",
        solution: "Fixing the arrangement that satisfies all three clues simultaneously (E-D, C between A & B, F between E & A) places C immediately to the left of B. Draw the circle and place clues one at a time — start with the most restrictive (C between A and B) before adding the rest."
      },
      {
        q: "Using the same seating as above, who sits to the right of C?",
        type: "mcq",
        options: ["A", "B", "D", "F"],
        answer: "A",
        solution: "From the fixed arrangement, A sits immediately to the right of C. Tip: once you've drawn one valid circular arrangement satisfying every clue, all follow-up 'who is left/right of X' questions are direct reads off the diagram — don't re-derive from scratch each time."
      },
      {
        q: "Six persons A, B, C, D, E, F sit around a table facing the centre. A is opposite B. C is to the left of D and to the right of E. F is two seats from A. Who is opposite C?",
        type: "short",
        answer: "D",
        solution: "Fix A and B opposite each other first (this halves the search space). The clue 'C left of D and right of E' forces the order E-C-D consecutively. Placing F two seats from A resolves the last ambiguity, landing D directly opposite C."
      },
      {
        q: "Pointing to a photograph, Rekha said, 'She is the daughter of my grandfather's only son.' How is the girl related to Rekha?",
        type: "short",
        answer: "Sister",
        solution: "Grandfather's only son = Rekha's father (since he's the only son). The daughter of Rekha's father is Rekha's sister."
      },
      {
        q: "In a certain code, WATER is written as YCVGT. How is MONEY written in that code?",
        type: "short",
        answer: "OQPGA",
        solution: "Each letter shifts +2: W→Y, A→C, T→V, E→G, R→T. Apply the same +2 shift to M-O-N-E-Y: M→O, O→Q, N→P, E→G, Y→A → OQPGA."
      },
      {
        q: "Find the next term: A, C, F, J, O, ?",
        type: "short",
        answer: "U",
        solution: "Alphabet positions: A=1, C=3, F=6, J=10, O=15 — differences are +2, +3, +4, +5. Next difference is +6, so 15+6=21st letter = U."
      },
      {
        q: "Statements: All cats are dogs. Some dogs are birds. Conclusion: Some birds are cats. Does the conclusion follow?",
        type: "mcq",
        options: ["Yes, it follows", "No, it doesn't follow"],
        answer: "No, it doesn't follow",
        solution: "'Some dogs are birds' only guarantees overlap between dogs and birds — it says nothing about which dogs. There's no guarantee that overlap includes any cat, so the conclusion is invalid. Classic syllogism trap: don't chain two 'some' statements through a shared middle term."
      },
      {
        q: "Statements: All pens are books. Some books are tables. Conclusions: I. Some tables are pens. II. Some books are pens.",
        type: "mcq",
        options: ["Only I follows", "Only II follows", "Both follow", "Neither follows"],
        answer: "Only II follows",
        solution: "'All pens are books' validly converts to 'Some books are pens' — so II follows. 'Some books are tables' never connects pens to tables, so I does not follow."
      },
      {
        q: "If today is Wednesday, what day will it be 87 days from now?",
        type: "short",
        answer: "Saturday",
        solution: "87 mod 7 = 3. Wednesday + 3 days = Saturday."
      },
      {
        q: "What is the angle between the hour and minute hands at 3:15?",
        type: "short",
        answer: "7.5°",
        solution: "Minute hand at 15 min = 90° from 12. Hour hand at 3h15m = (3×60+15)/60 × 30° = 97.5°. Difference = 97.5 − 90 = 7.5°."
      },
      {
        q: "A cube is painted on all six faces and then cut into 64 equal smaller cubes. How many small cubes have exactly one face painted?",
        type: "short",
        answer: "24",
        solution: "64 small cubes means the cube is cut into a 4×4×4 grid (n=4). Cubes with exactly one painted face sit at the centre of each face: 6 faces × (n−2)² = 6 × 2² = 24."
      },
      {
        q: "You have 3 mislabeled boxes: 'Apples', 'Oranges', and 'Apples & Oranges'. Every label is wrong. You may open exactly one box and draw one fruit from it. Which box do you open to correctly relabel all three?",
        type: "short",
        answer: "Open the box labeled 'Apples & Oranges'",
        solution: "Since every label is wrong, that box cannot contain a mix — it holds only one fruit type. Drawing from it tells you its true contents, and because the remaining two labels are also both wrong, the rest follow by elimination."
      },
      {
        q: "Two cards are drawn from a standard 52-card deck without replacement. What is the probability that both are of the same suit?",
        type: "short",
        answer: "4/17",
        solution: "First card fixes a suit; 12 of the remaining 51 cards share that suit → 12/51 = 4/17 ≈ 0.235. (A commonly circulated version of this question states 3/17 — that's incorrect; verify with C(52,2) in the denominator: 4×C(13,2)/C(52,2) = 312/1326 = 4/17.)"
      },
      {
        q: "A person moves: 3 km east, 4 km north, 1 km west, 2 km south, starting from the origin. What is the final position and straight-line distance from the origin?",
        type: "short",
        answer: "(2, 2); distance = 2√2 ≈ 2.83 km",
        solution: "Track cumulative coordinates: (3,0) → (3,4) → (2,4) → (2,2). Distance = √(2²+2²) = √8 = 2√2."
      },
      {
        q: "Count the numbers from 1 to 100 that are divisible by 2 or 3, but not by 5.",
        type: "short",
        answer: "54",
        solution: "Divisible by 2: 50. By 3: 33. By both (6): 16. Union (2 or 3) = 50+33−16 = 67. Now remove those in this union also divisible by 5: divisible by 10 = 10, by 15 = 6, by 30 = 3 → union with 5 = 10+6−3 = 13. Final = 67 − 13 = 54."
      },
    ],
  },
  {
    id: "quant",
    label: "Quantitative Aptitude",
    meta: "10 Qs · 35 min · Cutoff ~6-8 correct",
    icon: Calculator,
    accent: "#8A5A00",
    tips: "Officially the 'Mathematical Ability Test' for 2026. Speed matters more than depth — every problem here is solvable in under 90 seconds with the right shortcut.",
    questions: [
      {
        q: "A and B can do a piece of work in 12 and 20 days respectively. They work together for 4 days, then A leaves. How many more days will B take to finish the remaining work?",
        type: "short",
        answer: "9 1/3 days",
        solution: "A's rate = 1/12, B's rate = 1/20. Combined = 1/12+1/20 = 8/60 = 2/15/day. Work done in 4 days = 8/15. Remaining = 7/15. B alone takes (7/15)÷(1/20) = 140/15 = 28/3 = 9⅓ days."
      },
      {
        q: "A shopkeeper marks up the price by 25% and then gives successive discounts of 10% and 8%. If the cost price is ₹800, find the final selling price.",
        type: "short",
        answer: "₹828",
        solution: "MP = 800×1.25 = 1000. After 10% off: 900. After 8% off: 900×0.92 = 828."
      },
      {
        q: "The sum of three consecutive even numbers is 222. Find the numbers and their product.",
        type: "short",
        answer: "72, 74, 76; product = 4,04,928",
        solution: "Let numbers be x, x+2, x+4. 3x+6=222 → x=72. Numbers: 72, 74, 76. Product = 72×74×76 = 4,04,928."
      },
      {
        q: "A student scored 65, 70, 75, 80 in four tests. What is the minimum score needed in the fifth test for an average of at least 75?",
        type: "short",
        answer: "85",
        solution: "Required total = 75×5 = 375. Sum of four scores = 290. Needed = 375−290 = 85."
      },
      {
        q: "Solve for x: 3^(2x+1) = 243",
        type: "short",
        answer: "x = 2",
        solution: "243 = 3⁵ → 2x+1 = 5 → x = 2."
      },
      {
        q: "A fair die is rolled twice. What is the probability that the sum of the outcomes is divisible by 3?",
        type: "short",
        answer: "1/3",
        solution: "Total outcomes = 36. Sums divisible by 3 (3, 6, 9, 12) occur in 12 outcomes → 12/36 = 1/3."
      },
      {
        q: "A GP has first term 3 and common ratio 2. Find the 8th term and the sum of the first 8 terms.",
        type: "short",
        answer: "8th term = 384; Sum = 765",
        solution: "a₈ = 3×2⁷ = 384. Sum = 3×(2⁸−1)/(2−1) = 3×255 = 765."
      },
      {
        q: "Find the LCM and HCF of 18 and 24.",
        type: "short",
        answer: "LCM = 72, HCF = 6",
        solution: "18 = 2×3², 24 = 2³×3. LCM uses max powers: 2³×3² = 72. HCF uses min powers: 2×3 = 6."
      },
      {
        q: "An item is marked ₹2000 with a 15% discount, followed by 18% GST on the discounted price. Find the final price.",
        type: "short",
        answer: "₹2006",
        solution: "After discount: 2000×0.85 = 1700. GST = 1700×0.18 = 306. Final = 1700+306 = 2006."
      },
      {
        q: "A three-digit number, when its digits are reversed, decreases by 198. The digits sum to 18. Find the number.",
        type: "short",
        answer: "765",
        solution: "Let the number be 100a+10b+c. Reversed: 100c+10b+a. Difference = 99(a−c) = 198 → a−c = 2. With a+b+c=18, try a=7, c=5 → b=6. Number = 765 (check: 765−567=198 ✓)."
      },
      {
        q: "Find the simple interest on ₹12,000 for 2 years at 7.5% per annum.",
        type: "short",
        answer: "₹1,800",
        solution: "SI = P×R×T/100 = 12000×7.5×2/100 = 1,800."
      },
      {
        q: "Solve x²−5x+6=0 and evaluate 1/x + 1/(x−2) for the valid root.",
        type: "short",
        answer: "4/3",
        solution: "Roots: x=2, x=3. x=2 makes 1/(x−2) undefined, so use x=3: 1/3 + 1/1 = 4/3."
      },
      {
        q: "Two pipes fill a tank in 12 hours and 15 hours respectively. How long will they take to fill it together?",
        type: "short",
        answer: "6⅔ hours",
        solution: "Combined rate = 1/12+1/15 = 9/60 = 3/20 per hour. Time = 20/3 = 6⅔ hours."
      },
      {
        q: "Find the next term: 2, 6, 12, 20, 30, ?",
        type: "short",
        answer: "42",
        solution: "This is n(n+1): 1×2, 2×3, 3×4, 4×5, 5×6, 6×7=42. (Differences: 4,6,8,10,12.)"
      },
      {
        q: "A train travels 60 km in 1.2 hours, then 90 km in 1.5 hours. Find the average speed for the entire 150 km journey.",
        type: "short",
        answer: "≈ 55.56 km/h",
        solution: "Total distance = 150 km. Total time = 1.2+1.5 = 2.7 h. Average speed = 150/2.7 ≈ 55.56 km/h. (Note: average speed here is total distance ÷ total time, not the average of the two speeds.)"
      },
      {
        q: "A bag has green, red, and blue balls in the ratio 2:3:5, totaling 100 balls. How many red balls are there?",
        type: "short",
        answer: "30",
        solution: "Total ratio parts = 10. Each part = 100/10 = 10. Red = 3 parts = 30."
      },
      {
        q: "How many ways can 5 distinct books be arranged on a shelf if two specific books must not be adjacent?",
        type: "short",
        answer: "72",
        solution: "Total arrangements = 5! = 120. Arrangements with the two books adjacent: treat as one block → 4!×2! = 48. Not adjacent = 120−48 = 72."
      },
      {
        q: "A 10% solution is diluted with water to make a 5% solution with a final volume of 200 L. How much of the original 10% solution and how much water were used?",
        type: "short",
        answer: "100 L solution, 100 L water",
        solution: "Let X = solution volume, Y = water. X+Y=200. Solute is conserved: 0.10X = 0.05×200 = 10 → X=100, so Y=100."
      },
      {
        q: "The LCM of two numbers is 180 and their HCF is 12. If one number is 36, find the other.",
        type: "short",
        answer: "60",
        solution: "Product of two numbers = LCM × HCF = 180×12 = 2160. Other number = 2160/36 = 60."
      },
      {
        q: "A town's population grows by 10% every year. If the current population is 10,000, find the population after 2 years.",
        type: "short",
        answer: "12,100",
        solution: "10,000 × 1.10² = 10,000 × 1.21 = 12,100."
      },
    ],
  },
  {
    id: "verbal",
    label: "Verbal Ability",
    meta: "20 Qs · 20 min · Cutoff ~15-17 correct",
    icon: Type,
    accent: "#2E5A3C",
    tips: "Highest question count of any section — a small daily vocabulary + grammar drill pays off more here than anywhere else.",
    questions: [
      {
        q: "Choose the correct sentence: 'She invited John and I' or 'She invited John and me'.",
        type: "short",
        answer: "She invited John and me.",
        solution: "'Invited' is a verb needing an object pronoun — 'me', not the subject pronoun 'I'."
      },
      {
        q: "Give a one-word substitute for: 'a person who works voluntarily for no payment'.",
        type: "short",
        answer: "Volunteer",
        solution: "Standard one-word substitution — direct definitional match."
      },
      {
        q: "Spot the error: 'Neither the manager nor the employees was aware of the new policy.'",
        type: "short",
        answer: "'was' should be 'were'",
        solution: "With 'neither...nor', the verb agrees with the nearer subject — here 'employees' (plural) — so 'were' is correct."
      },
      {
        q: "Fill in the blank: 'She is very good ___ painting.'",
        type: "mcq",
        options: ["in", "at", "with", "on"],
        answer: "at",
        solution: "'Good at' is the standard collocation for skill/ability."
      },
      {
        q: "Give the antonym of 'transparent'.",
        type: "short",
        answer: "Opaque",
        solution: "Direct opposite in meaning."
      },
      {
        q: "Correct the sentence: 'Each of the players have a coach.'",
        type: "short",
        answer: "Each of the players has a coach.",
        solution: "'Each' is grammatically singular regardless of the plural noun that follows 'of' — always takes a singular verb."
      },
      {
        q: "Give a synonym for 'eloquent'.",
        type: "short",
        answer: "Articulate",
        solution: "Both describe fluent, persuasive expression."
      },
      {
        q: "Convert to passive voice: 'They will announce the results tomorrow.'",
        type: "short",
        answer: "The results will be announced tomorrow.",
        solution: "Future simple passive: will be + past participle."
      },
      {
        q: "Fill in the correct preposition: 'He depends ___ his parents.'",
        type: "short",
        answer: "on",
        solution: "'Depend on' is the fixed prepositional phrase."
      },
      {
        q: "Choose the more formal option: 'She is taller than I' or 'She is taller than me'.",
        type: "short",
        answer: "She is taller than I (am).",
        solution: "Formal/prescriptive grammar treats 'than' as introducing a clause with an implied verb ('than I am'), requiring the subject pronoun 'I'."
      },
      {
        q: "Fill in the blank: 'I am looking forward ___ hearing from you.'",
        type: "short",
        answer: "to",
        solution: "'Look forward to' is followed by a gerund (to + -ing), not the infinitive 'to hear'."
      },
      {
        q: "Should you use 'less' or 'fewer' for countable nouns like 'people'?",
        type: "short",
        answer: "Fewer",
        solution: "'Fewer' is used with countable nouns; 'less' is used with uncountable nouns (e.g., less water)."
      },
      {
        q: "Give a synonym for 'lucid'.",
        type: "short",
        answer: "Clear",
        solution: "'Lucid' means clear and easily understood."
      },
      {
        q: "Reading Comprehension: \"Automation is reshaping entry-level roles across the IT services industry. While routine coding and testing tasks are increasingly handled by AI-assisted tools, employers report a growing premium on skills that automation cannot easily replicate — problem framing, client communication, and cross-functional collaboration.\" According to the passage, what do employers increasingly value?",
        type: "mcq",
        options: ["Speed of coding", "Skills automation cannot easily replicate", "Knowledge of many languages", "Willingness to work overtime"],
        answer: "Skills automation cannot easily replicate",
        solution: "The passage states this directly — employers report a 'growing premium on skills that automation cannot easily replicate.'"
      },
      {
        q: "Arrange in logical order: P. This made the region a hub for early trade. Q. The river provided fertile soil for agriculture. R. Ancient settlements grew along the riverbank for this reason. S. Surplus crops were exchanged with neighbouring settlements.",
        type: "short",
        answer: "Q-R-S-P",
        solution: "Cause (fertile soil) → effect (settlements grew) → consequence (surplus traded) → outcome (trade hub). Each sentence's logical connector points to the next."
      },
      {
        q: "Analogy: DOCTOR : HOSPITAL :: TEACHER : ?",
        type: "mcq",
        options: ["Blackboard", "Student", "School", "Book"],
        answer: "School",
        solution: "The relationship is 'person : workplace'. A doctor works at a hospital; a teacher works at a school."
      },
      {
        q: "Choose the correct article usage: 'He is ___ honest man.'",
        type: "short",
        answer: "an",
        solution: "Article choice follows sound, not spelling — 'honest' begins with a silent 'h' (vowel sound), so 'an' is correct."
      },
      {
        q: "Correct the sentence: 'She didn't went to school.'",
        type: "short",
        answer: "She didn't go to school.",
        solution: "The auxiliary 'did' already carries the past tense — the main verb must stay in base form."
      },
      {
        q: "Choose the correctly formed sentence: (A) 'Not only he is smart but also hardworking.' (B) 'He is not only smart but also hardworking.'",
        type: "short",
        answer: "(B)",
        solution: "The correlative 'not only...but also' needs parallel structure right after the shared verb 'is' — both 'smart' and 'hardworking' must follow it directly."
      },
      {
        q: "Identify the error: 'Each of the students are required to submit forms.'",
        type: "short",
        answer: "'are' should be 'is'",
        solution: "'Each' is always singular: 'Each of the students is required...'"
      },
    ],
  },
  {
    id: "pseudocode",
    label: "Pseudo Code",
    meta: "5 Qs · 10 min · Cutoff ~3-4 correct",
    icon: Code2,
    accent: "#7A3B69",
    tips: "You trace logic, you don't write code. Practice reading loops and recursion by hand — speed comes from not needing to mentally 'run' every iteration.",
    questions: [
      {
        q: "What is the output?\nsum = 0\nfor i = 1 to 5\n    sum = sum + i * 2\nend for\nprint(sum)",
        type: "code",
        answer: "30",
        solution: "sum = 2×(1+2+3+4+5) = 2×15 = 30."
      },
      {
        q: "What does this print?\narr = [4, 8, 15, 16, 23, 42]\ncount = 0\nfor i = 0 to length(arr)-1\n    if arr[i] mod 2 == 0\n        count = count + 1\n    end if\nend for\nprint(count)",
        type: "code",
        answer: "4",
        solution: "Even entries in the array: 4, 8, 16, 42 — a total of 4."
      },
      {
        q: "What value does fact(4) return?\nfunction fact(n)\n    if n <= 1\n        return 1\n    else\n        return n * fact(n-1)\n    end if\nend function",
        type: "code",
        answer: "24",
        solution: "fact(4) = 4×3×2×1 = 24 — standard recursive factorial."
      },
      {
        q: "What is printed?\ns = \"INFOSYS\"\nrev = \"\"\nfor i = length(s)-1 downto 0\n    rev = rev + s[i]\nend for\nprint(rev)",
        type: "code",
        answer: "SYSOFNI",
        solution: "The loop appends characters from the end of the string backward, reversing it."
      },
      {
        q: "This pseudo code is meant to find the largest number in an array but has a bug. Identify it.\nmax = 0\nfor i = 0 to length(arr)-1\n    if arr[i] > max\n        max = arr[i]\n    end if\nend for",
        type: "code",
        answer: "Initializing max = 0 fails for all-negative arrays.",
        solution: "If every element is negative, none will ever exceed 0, so max wrongly stays 0. Fix: initialize max = arr[0] before the loop."
      },
      {
        q: "Which data structure is best suited for implementing 'undo' functionality?",
        type: "short",
        answer: "Stack",
        solution: "Undo needs last-in-first-out (LIFO) access — the most recent action should be reversed first."
      },
      {
        q: "What is the time complexity of binary search on n sorted elements?",
        type: "short",
        answer: "O(log n)",
        solution: "Binary search halves the search space with every comparison."
      },
      {
        q: "A queue holds [1, 2, 3, 4]. After enqueue(5), then two dequeue operations, what remains?",
        type: "short",
        answer: "[3, 4, 5]",
        solution: "After enqueue(5): [1,2,3,4,5]. Two dequeues remove from the front (1, then 2), leaving [3,4,5]."
      },
      {
        q: "Which algorithm finds the shortest path in a weighted graph with no negative edge weights?",
        type: "short",
        answer: "Dijkstra's algorithm",
        solution: "Dijkstra's greedy relaxation approach guarantees correctness only when all edge weights are non-negative."
      },
      {
        q: "What is the amortized time complexity of appending an element to a dynamic array (e.g., ArrayList/Vector)?",
        type: "short",
        answer: "O(1) amortized",
        solution: "Occasional resizing is expensive, but averaged over many appends, the cost per append is constant."
      },
      {
        q: "What does it mean for a sorting algorithm to be 'stable'? Give an example.",
        type: "short",
        answer: "Preserves the relative order of equal elements; e.g., merge sort.",
        solution: "Stability matters when sorting by one key but needing to preserve original order for ties on that key (e.g., sorting by score after already sorting by name)."
      },
      {
        q: "Output of 2**3**2 in Python — what is operator precedence here?",
        type: "code",
        answer: "512",
        solution: "Exponentiation is right-associative in Python: evaluate 3**2 first = 9, then 2**9 = 512."
      },
      {
        q: "What is the key difference between DFS and BFS traversal?",
        type: "short",
        answer: "DFS explores deep paths before backtracking; BFS explores level by level.",
        solution: "DFS typically uses a stack (or recursion); BFS uses a queue."
      },
    ],
  },
  {
    id: "puzzle",
    label: "Puzzle Solving",
    meta: "4 Qs · 10 min · Cutoff ~3-4 correct",
    icon: Puzzle,
    accent: "#B23A2E",
    tips: "Small section but high-leverage — a focused set of ~15-20 classic puzzles is enough to comfortably clear this cutoff. Don't over-invest prep time here.",
    questions: [
      {
        q: "A frog is at the bottom of a 30 ft well. Each day it climbs 3 ft but slips back 2 ft at night. On which day does it reach the top?",
        type: "short",
        answer: "Day 28",
        solution: "Net progress is 1 ft/day, except the final day (no slip-back once it's out). It reaches 27 ft by the end of Day 27, then climbs the remaining 3 ft and escapes on Day 28."
      },
      {
        q: "You have 8 identical-looking balls, one of which is heavier. Using a balance scale, can you find the heavy ball in exactly 2 weighings?",
        type: "short",
        answer: "Yes",
        solution: "Weigh 3 vs 3. If equal, the heavy ball is among the remaining 2 — weigh those against each other. If unequal, take the heavier group of 3 and weigh 1 vs 1 (the third is heavy if they balance)."
      },
      {
        q: "In 12 hours, how many times do the hour and minute hands of a clock overlap?",
        type: "short",
        answer: "11 times",
        solution: "The hands coincide every 12/11 hours ≈ 65.45 minutes, giving 11 overlaps in a 12-hour period (not 12, since the 12:00 overlap is shared with the start of the next cycle)."
      },
      {
        q: "Four people must cross a bridge at night with one torch. Crossing times are 1, 2, 5, and 10 minutes; at most 2 can cross at once, at the pace of the slower person, and the torch must be walked back each time. What is the minimum total time?",
        type: "short",
        answer: "17 minutes",
        solution: "1&2 cross (2 min) → 1 returns (1 min) → 5&10 cross (10 min) → 2 returns (2 min) → 1&2 cross (2 min). Total = 2+1+10+2+2 = 17. Key insight: send the two slowest together, not one at a time."
      },
      {
        q: "In a 3×3 magic square using numbers 1-9 (each row, column, and diagonal sums to 15), what must the centre number be?",
        type: "short",
        answer: "5",
        solution: "The centre of any 3×3 magic square using 1-9 is always the middle value of the set, 5 — it's the only number that can appear in 4 different sums (2 diagonals + middle row + middle column)."
      },
      {
        q: "Find the next term: 2, 6, 12, 20, 30, ?",
        type: "short",
        answer: "42",
        solution: "Pattern n(n+1): 1×2, 2×3, 3×4... 6×7 = 42."
      },
      {
        q: "9 coins look identical but one is lighter than the rest. Using a balance scale, can you find it in 2 weighings?",
        type: "short",
        answer: "Yes",
        solution: "Split into 3 groups of 3. Weigh two groups: if balanced, the light coin is in the untested group; otherwise it's in the lighter pan. Repeat the same 3-way split on the identified group of 3 to isolate the coin in one more weighing."
      },
      {
        q: "You have exactly 6 matchsticks. Arrange them to form 4 equilateral triangles.",
        type: "short",
        answer: "Build a tetrahedron (3D)",
        solution: "A regular tetrahedron has exactly 6 edges and 4 triangular faces — the puzzle only works by stepping out of 2D."
      },
      {
        q: "There are 3 switches outside a room, each connected to one of 3 bulbs inside. You may enter the room only once. How do you determine which switch controls which bulb?",
        type: "short",
        answer: "Use heat as a third signal",
        solution: "Turn switch 1 on for a few minutes, then off. Turn switch 2 on and leave it on, then enter the room: the bulb that's lit → switch 2; the bulb that's off but warm → switch 1; the bulb that's off and cold → switch 3."
      },
      {
        q: "How many adjacent swaps are needed to reverse the sequence 1..9 into 9..1?",
        type: "short",
        answer: "36",
        solution: "This equals the number of inversions in the fully reversed sequence of 9 elements: C(9,2) = 36. Each adjacent swap fixes exactly one inversion."
      },
      {
        q: "Find two consecutive prime numbers that sum to 100.",
        type: "short",
        answer: "47 and 53",
        solution: "47 and 53 are both prime, and no prime lies between them (48-52 are all composite), making them consecutive primes. 47+53 = 100. (A commonly circulated version of this question claims no such pair exists — that's incorrect.)"
      },
      {
        q: "If 3 cats catch 3 mice in 3 minutes, how many cats are needed to catch 100 mice in 100 minutes?",
        type: "short",
        answer: "3 cats",
        solution: "The rate is 1 cat : 1 mouse per 3 minutes, independent of scale — the ratio of cats to the 'mice per equal time' stays constant, so 3 cats suffice for the 100/100 case too."
      },
    ],
  },
  {
    id: "grammar",
    label: "English Grammar",
    meta: "5 Qs · 10 min · Cutoff: unpublished",
    icon: BookOpen,
    accent: "#3C5A7A",
    tips: "Short section, fast marks — these are single-concept MCQs, not passages. A quick daily 10-question drill covers the whole syllabus within a week.",
    questions: [
      {
        q: "Identify the error: 'Each of the students are required to submit forms.'",
        type: "short",
        answer: "'are' should be 'is'",
        solution: "Each of the students IS required... — 'each' always takes a singular verb."
      },
      {
        q: "Choose the correct modal for prohibition: 'You ___ not enter.'",
        type: "short",
        answer: "must",
        solution: "'Must not' expresses prohibition/a rule; 'may not' would express a possibility of not being allowed, which is softer."
      },
      {
        q: "Add the correct question tag: 'They have finished, ___?'",
        type: "short",
        answer: "haven't they?",
        solution: "Present perfect statement → negative tag with the same auxiliary, 'have' → 'haven't'."
      },
      {
        q: "What is the plural of 'criterion'?",
        type: "short",
        answer: "Criteria",
        solution: "Greek-origin noun — irregular plural 'criteria', not 'criterions'."
      },
      {
        q: "Correct: 'You ___ you you were in my position, you would understand.' Fill in the correct conditional form: 'If I ___ you, I would apologise.'",
        type: "short",
        answer: "were",
        solution: "Second conditional (hypothetical present) uses the subjunctive 'were' for all subjects, not 'was'."
      },
      {
        q: "Fix the sentence: 'He is one of the best player.'",
        type: "short",
        answer: "He is one of the best players.",
        solution: "'One of the + plural noun' — the group being compared must be plural even though 'one' is singular."
      },
      {
        q: "Choose the correct comparative: 'This road is ___ than that one.' (wide)",
        type: "short",
        answer: "wider",
        solution: "One-syllable adjective → add '-er' for the comparative."
      },
      {
        q: "Should 'data' take a singular or plural verb in formal usage?",
        type: "short",
        answer: "Plural in strict formal usage ('data are'), though 'data is' is now widely accepted informally.",
        solution: "'Data' is technically the plural of 'datum'. Formal/academic writing often still uses 'data are'; everyday and business usage increasingly treats it as singular."
      },
      {
        q: "By the time you arrive, I ___ the meeting. (finish)",
        type: "short",
        answer: "will have finished",
        solution: "An action completed before a future point in time uses the future perfect tense."
      },
      {
        q: "Convert to passive: 'Someone stole my bike.'",
        type: "short",
        answer: "My bike was stolen.",
        solution: "Simple past passive: was/were + past participle. The unknown agent ('someone') is simply dropped."
      },
    ],
  },
  {
    id: "writing",
    label: "English Writing",
    meta: "1 Q · 10 min · 120-150 words",
    icon: PenLine,
    accent: "#5A4A2E",
    tips: "Scored on structure and grammar, not just word count. Train a fixed 3-part structure: position → 2 justifying points → balanced conclusion. This scores far more consistently under a 10-minute limit than free-flow writing.",
    questions: [
      {
        q: "Prompt: 'Do you think Artificial Intelligence will create more jobs than it eliminates? Justify your view in 120-150 words.'",
        type: "essay",
        answer: "Model answer (147 words)",
        solution: "Artificial Intelligence will likely create more jobs than it eliminates, though the transition will be uneven. While AI automates routine tasks such as data entry and basic customer support, it simultaneously generates demand for roles that didn't exist a decade ago — AI trainers, prompt engineers, and human-AI workflow designers. History supports this pattern: industrialization and computerization both displaced specific jobs while expanding overall employment by creating new industries.\n\nHowever, the benefit is not automatic. Workers in easily automated roles need reskilling support, and job creation must keep pace with displacement. Companies and governments share responsibility for this transition through training programs and phased automation.\n\nIn conclusion, AI's net effect on employment will likely be positive, provided reskilling keeps pace with automation. The real challenge isn't the total number of jobs, but ensuring displaced workers can move into the roles being created."
      },
      {
        q: "Prompt: 'What role does teamwork play in achieving organizational goals?'",
        type: "essay",
        answer: "Model answer (128 words)",
        solution: "Teamwork plays a vital role in achieving organizational goals by combining diverse skills and perspectives toward a shared purpose. When individuals collaborate effectively, problems get solved faster and decisions improve, since no single viewpoint dominates. Well-coordinated teams share responsibility openly and adapt to challenges more efficiently than individuals working in isolation.\n\nBeyond output, teamwork builds trust and a positive work culture — it reduces burnout and increases job satisfaction, since challenges are shared rather than carried alone. Leaders strengthen this by setting clear goals and recognizing individual contributions within the team effort.\n\nUltimately, strong teamwork aligns individual effort with an organization's larger vision. It is not just a soft skill — it is a direct driver of consistent, long-term organizational success."
      },
      {
        q: "Prompt: 'How important are communication skills in technical roles?'",
        type: "essay",
        answer: "Model answer (132 words)",
        solution: "Communication skills are essential in technical roles because raw technical ability only creates value once it's understood by others. During code reviews, clear communication turns feedback into better-quality code rather than friction. Cross-team collaboration depends on explaining technical concepts to non-technical stakeholders — managers, clients — so that project goals stay aligned.\n\nCommunication also strongly influences interview outcomes: clarity, confidence, and structured answers often decide hiring results as much as technical correctness does. This makes it a skill worth deliberately practicing, not something assumed to develop on its own.\n\nRegular presentations, technical writing, and mock interviews are practical ways to build this skill. Ultimately, pairing technical depth with clear communication is what turns a good engineer into an effective team member and, eventually, a strong technical leader."
      },
    ],
  },
];

const CUTOFF_TABLE = [
  { section: "Logical Ability", qs: 15, time: "25 min", cutoff: "~9-11 correct (75-80%ile)" },
  { section: "Quantitative Aptitude", qs: 10, time: "35 min", cutoff: "~6-8 correct (70-80%ile)" },
  { section: "Verbal Ability", qs: 20, time: "20 min", cutoff: "~15-17 correct (70-80%ile)" },
  { section: "Pseudo Code", qs: 5, time: "10 min", cutoff: "~3-4 correct (70-80%ile)" },
  { section: "Puzzle Solving", qs: 4, time: "10 min", cutoff: "~3-4 correct (70-80%ile)" },
  { section: "English Grammar", qs: 5, time: "10 min", cutoff: "Unpublished — treat as ~70%ile" },
  { section: "English Writing", qs: 1, time: "10 min", cutoff: "Qualitatively scored (structure, grammar, relevance)" },
];

const GENERAL_INSTRUCTIONS = [
  "No negative marking — but each section has its own independent cutoff. A strong score in one section cannot make up for a weak score in another, so every section must individually clear its cutoff.",
  "Section-wise time limits are strictly enforced — you cannot carry over unused time from one section to the next.",
  "Total test duration across all 7 sections is roughly 120 minutes; sections typically run in the fixed order shown below and cannot be reordered.",
  "Attempt every question — since there's no negative marking, an educated guess is always better than leaving a question blank.",
  "Candidates must clear all sectional cutoffs to be shortlisted for the next round (Technical + HR Interview).",
];

const BONUS_TOPICS = [
  "Is remote work more productive than office work?",
  "Should social media platforms be responsible for misinformation?",
  "What role does innovation play in solving climate change?",
  "Is a four-day work week beneficial for productivity?",
  "How has technology changed graduate job preparation?",
  "What are the ethical concerns of AI in education?",
  "How do internships improve employability?",
  "What is the impact of remote work on young professionals?",
];

/* ============================================================
   COMPONENT
   ============================================================ */

export default function InfosysQuestionBank({ onLogout }) {
  const [activeId, setActiveId] = useState(SECTIONS[0].id);
  const [search, setSearch] = useState("");
  const [openIdx, setOpenIdx] = useState(null);
  const [done, setDone] = useState({});

  const active = SECTIONS.find((s) => s.id === activeId);

  const filtered = useMemo(() => {
    if (!search.trim()) return active.questions;
    const term = search.toLowerCase();
    return active.questions.filter(
      (item) =>
        item.q.toLowerCase().includes(term) ||
        String(item.answer).toLowerCase().includes(term)
    );
  }, [active, search]);

  const totalQs = SECTIONS.reduce((sum, s) => sum + s.questions.length, 0);
  const doneCount = Object.values(done).filter(Boolean).length;

  const toggleDone = (key, e) => {
    e.stopPropagation();
    setDone((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }} className="min-h-screen bg-[#F7F5F0] text-[#1B1B1B]">
      {/* Header */}
      <div className="bg-[#1F3864] text-white">
        <div className="max-w-5xl mx-auto px-6 py-6 flex items-start justify-between gap-4">
          <div>
            <p className="text-[11px] tracking-[0.2em] uppercase text-[#C9B98A] font-sans mb-1">
              Vignan's Lara Institute of Technology &amp; Science
            </p>
            <h1 className="text-3xl md:text-4xl font-bold leading-tight">
              Infosys Off-Campus 2026
            </h1>
            <p className="text-[#D6DCEB] mt-1 font-sans text-sm">
              Complete Model Question Bank — 7 Sections, {totalQs}+ Questions
            </p>
          </div>

          <button
            type="button"
            onClick={onLogout}
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/20"
          >
            <X size={14} />
            Logout
          </button>
        </div>
      </div>

      {/* Progress bar */}
      <div className="max-w-5xl mx-auto px-6 pt-5">
        <div className="flex items-center justify-between text-xs font-sans text-[#5A5346] mb-1">
          <span>Practice progress</span>
          <span>{doneCount} / {totalQs} marked done</span>
        </div>
        <div className="h-1.5 w-full bg-[#E3DFD3] rounded-full overflow-hidden">
          <div
            className="h-full bg-[#B7862C] transition-all duration-500"
            style={{ width: `${totalQs ? (doneCount / totalQs) * 100 : 0}%` }}
          />
        </div>
      </div>

      {/* Section-wise cutoff & instructions */}
      <div className="max-w-5xl mx-auto px-6 mt-7">
        <div className="bg-white rounded-lg border border-[#E3DFD3] overflow-hidden">
          <div className="px-4 py-3 border-b border-[#E3DFD3]" style={{ backgroundColor: "#1F386408" }}>
            <h2 className="font-sans text-sm font-bold text-[#1F3864] tracking-wide uppercase">
              Section-wise Cutoff &amp; Instructions
            </h2>
            <p className="font-sans text-[12px] text-[#6B6455] mt-0.5">
              Read this before you start practicing — every section below must be cleared independently.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left font-sans text-[12.5px]">
              <thead>
                <tr className="text-[#6B6455] border-b border-[#E3DFD3]">
                  <th className="px-4 py-2 font-semibold">Section</th>
                  <th className="px-4 py-2 font-semibold">Questions</th>
                  <th className="px-4 py-2 font-semibold">Time</th>
                  <th className="px-4 py-2 font-semibold">Cutoff to Clear</th>
                </tr>
              </thead>
              <tbody>
                {CUTOFF_TABLE.map((row, i) => (
                  <tr key={row.section} className={i !== CUTOFF_TABLE.length - 1 ? "border-b border-[#F0EEE6]" : ""}>
                    <td className="px-4 py-2 font-semibold text-[#2A2A2A]">{row.section}</td>
                    <td className="px-4 py-2 text-[#5A5346]">{row.qs}</td>
                    <td className="px-4 py-2 text-[#5A5346]">{row.time}</td>
                    <td className="px-4 py-2 text-[#5A5346]">{row.cutoff}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="px-4 py-3.5 bg-[#FAF9F5] border-t border-[#E3DFD3]">
            <ul className="space-y-1.5">
              {GENERAL_INSTRUCTIONS.map((line, i) => (
                <li key={i} className="font-sans text-[12.5px] text-[#5A5346] leading-relaxed flex gap-2">
                  <span className="text-[#B7862C] shrink-0">•</span>
                  {line}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Section tabs */}
      <div className="max-w-5xl mx-auto px-6 mt-6">
        <div className="flex flex-wrap gap-2">
          {SECTIONS.map((s) => {
            const Icon = s.icon;
            const isActive = s.id === activeId;
            return (
              <button
                key={s.id}
                onClick={() => {
                  setActiveId(s.id);
                  setSearch("");
                  setOpenIdx(null);
                }}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-md text-sm font-sans border transition-colors ${
                  isActive
                    ? "text-white border-transparent"
                    : "bg-white text-[#4A4536] border-[#E3DFD3] hover:border-[#B7862C]"
                }`}
                style={isActive ? { backgroundColor: s.accent } : undefined}
              >
                <Icon size={15} />
                {s.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Active section header */}
      <div className="max-w-5xl mx-auto px-6 mt-6">
        <div className="flex items-start justify-between flex-wrap gap-3 border-b border-[#E3DFD3] pb-4">
          <div>
            <h2 className="text-xl font-bold" style={{ color: active.accent }}>
              {active.label}
            </h2>
            <p className="text-sm font-sans text-[#6B6455] mt-0.5">{active.meta}</p>
          </div>
          <div className="relative w-full sm:w-64">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9B9483]" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search this section..."
              className="w-full pl-8 pr-8 py-2 text-sm font-sans rounded-md border border-[#E3DFD3] bg-white focus:outline-none focus:ring-2 focus:ring-[#B7862C]"
            />
            {search && (
              <button onClick={() => setSearch("")} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#9B9483]">
                <X size={14} />
              </button>
            )}
          </div>
        </div>
        <p className="font-sans text-[13px] text-[#6B6455] mt-3 italic flex items-start gap-2">
          <Target size={14} className="mt-0.5 shrink-0" style={{ color: active.accent }} />
          {active.tips}
        </p>
      </div>

      {/* Question list */}
      <div className="max-w-5xl mx-auto px-6 py-6 space-y-3">
        {filtered.length === 0 && (
          <p className="font-sans text-sm text-[#9B9483] py-10 text-center">No questions match "{search}".</p>
        )}
        {filtered.map((item, idx) => {
          const key = `${active.id}-${idx}`;
          const isOpen = openIdx === key;
          const isDone = !!done[key];
          return (
            <div
              key={key}
              className="bg-white rounded-lg border border-[#E3DFD3] overflow-hidden"
            >
              <div
                role="button"
                tabIndex={0}
                onClick={() => setOpenIdx(isOpen ? null : key)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setOpenIdx(isOpen ? null : key);
                  }
                }}
                className="w-full flex items-start gap-3 text-left px-4 py-3.5 cursor-pointer"
              >
                <button
                  onClick={(e) => toggleDone(key, e)}
                  className="mt-0.5 shrink-0"
                  aria-label="Mark done"
                >
                  {isDone ? (
                    <CheckCircle2 size={18} style={{ color: active.accent }} />
                  ) : (
                    <Circle size={18} className="text-[#C9C3B2]" />
                  )}
                </button>
                <div className="flex-1 min-w-0">
                  <p className={`font-sans text-[13px] whitespace-pre-line ${isDone ? "text-[#9B9483] line-through" : "text-[#2A2A2A]"}`}>
                    <span className="font-semibold mr-1.5" style={{ color: active.accent }}>
                      Q{idx + 1}.
                    </span>
                    {item.q}
                  </p>
                  {item.type === "mcq" && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {item.options.map((opt) => (
                        <span
                          key={opt}
                          className="font-sans text-[12px] px-2 py-0.5 rounded border border-[#E3DFD3] text-[#6B6455]"
                        >
                          {opt}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <ChevronDown
                  size={16}
                  className={`shrink-0 mt-1 text-[#9B9483] transition-transform ${isOpen ? "rotate-180" : ""}`}
                />
              </div>

              {isOpen && (
                <div className="px-4 pb-4 pt-1 border-t border-[#F0EEE6]">
                  <div
                    className="font-sans text-[13px] font-semibold mb-1.5 px-2.5 py-1 rounded inline-block"
                    style={{ backgroundColor: `${active.accent}14`, color: active.accent }}
                  >
                    Answer: {item.answer}
                  </div>
                  <p className="font-sans text-[13px] text-[#5A5346] leading-relaxed whitespace-pre-line">
                    {item.solution}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Bonus writing topics — only shown on writing tab */}
      {active.id === "writing" && (
        <div className="max-w-5xl mx-auto px-6 pb-10">
          <h3 className="font-sans text-sm font-semibold text-[#4A4536] mb-2">
            Additional practice prompts (for mock timed drills)
          </h3>
          <div className="grid sm:grid-cols-2 gap-2">
            {BONUS_TOPICS.map((t) => (
              <div
                key={t}
                className="font-sans text-[13px] text-[#5A5346] bg-white border border-[#E3DFD3] rounded-md px-3 py-2"
              >
                {t}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="max-w-5xl mx-auto px-6 pb-8 pt-2 border-t border-[#E3DFD3] font-sans text-[11px] text-[#9B9483]">
        Prepared for B.Tech CSE Placement Preparation · Vignan's Lara Institute of Technology &amp; Science
      </div>
    </div>
  );
}
