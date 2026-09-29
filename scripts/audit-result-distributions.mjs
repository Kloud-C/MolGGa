import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const read = (relative) => fs.readFileSync(path.join(root, relative), "utf8");
const runtime = { window: {} };

for (const file of [
  "assets/js/teto-egen-data.js",
  "assets/js/attachment-data.js",
  "assets/js/past-life-data.js",
  "assets/js/spending-habits-data.js",
  "assets/js/travel-role-data.js"
]) {
  vm.runInNewContext(read(file), runtime, { timeout: 1000, filename: file });
}

const archetypes = runtime.window.MOA_ARCHETYPE_TESTS;
const exactLimit = 2_000_000;
const sampleSize = 2_000_000;
let unreachableFindings = 0;
let inconclusiveSampleZeroes = 0;

function tally(name, questions, resultIds, scoreAnswers, { randomTie = false, awardLists } = {}) {
  const total = questions.reduce((count, choices) => count * choices.length, 1);
  const exact = total <= exactLimit;
  const runs = exact ? total : sampleSize;
  const counts = new Map(resultIds.map((id) => [id, 0]));
  let tiedResponses = 0;
  let seed = 0x4d4f4c47;
  const random = () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let value = seed;
    value = Math.imul(value ^ value >>> 15, value | 1);
    value ^= value + Math.imul(value ^ value >>> 7, value | 61);
    return ((value ^ value >>> 14) >>> 0) / 4294967296;
  };
  const answers = new Uint32Array(questions.length);

  for (let run = 0; run < runs; run += 1) {
    if (exact) {
      let remainder = run;
      for (let index = questions.length - 1; index >= 0; index -= 1) {
        answers[index] = remainder % questions[index].length;
        remainder = Math.floor(remainder / questions[index].length);
      }
    } else {
      for (let index = 0; index < questions.length; index += 1) {
        answers[index] = Math.floor(random() * questions[index].length);
      }
    }

    const winners = scoreAnswers(answers);
    if (winners.length > 1) tiedResponses += 1;
    if (randomTie && winners.length > 1) {
      const share = 1 / winners.length;
      for (const id of winners) counts.set(id, (counts.get(id) || 0) + share);
      continue;
    }
    let tieIndex = 0;
    if (!randomTie) {
      for (let index = 0; index < answers.length; index += 1) {
        tieIndex = (tieIndex * questions[index].length + answers[index]) % winners.length;
      }
    } else if (winners.length > 1) {
      tieIndex = Math.floor(random() * winners.length);
    }
    const winner = winners[tieIndex];
    counts.set(winner, (counts.get(winner) || 0) + 1);
  }

  const absent = [...counts].filter(([, count]) => count === 0).map(([id]) => id);
  let provenUnreachable = [];
  if (awardLists) {
    const minimumTotalPoints = awardLists.reduce((total, choices) => total + Math.min(...choices.map((ids) => ids.length)), 0);
    const minimumPossibleWinnerScore = Math.ceil(minimumTotalPoints / resultIds.length);
    provenUnreachable = resultIds.filter((id) => {
      const maximumScore = awardLists.reduce((total, choices) => total + Math.max(...choices.map((ids) => ids.filter((scoreId) => scoreId === id).length)), 0);
      return maximumScore < minimumPossibleWinnerScore;
    });
  }
  const mode = exact ? "exact" : `sample ${runs.toLocaleString("en-US")}`;
  console.log(`\n${name}: ${mode} · answer combinations ${total.toLocaleString("en-US")} · tied ${((tiedResponses / runs) * 100).toFixed(3)}%${randomTie ? " (random ties split evenly for expected share)" : ""}`);
  for (const [id, count] of counts) {
    console.log(`  ${id.padEnd(22)} ${(count / runs * 100).toFixed(3)}% (${count.toLocaleString("en-US")}/${runs.toLocaleString("en-US")})`);
  }
  const nonzeroShares = [...counts.values()].filter((count) => count > 0);
  if (nonzeroShares.length) console.log(`  observed range         ${(Math.min(...nonzeroShares) / runs * 100).toFixed(3)}%–${(Math.max(...nonzeroShares) / runs * 100).toFixed(3)}%`);
  if (absent.length) {
    const proven = absent.filter((id) => provenUnreachable.includes(id));
    const inconclusive = absent.filter((id) => !provenUnreachable.includes(id));
    if (proven.length) {
      unreachableFindings += proven.length;
      console.log(`  PROVEN UNREACHABLE (score upper bound): ${proven.join(", ")}`);
    }
    if (inconclusive.length && exact) {
      unreachableFindings += inconclusive.length;
      console.log(`  NOT REACHABLE (exhaustive): ${inconclusive.join(", ")}`);
    } else if (inconclusive.length) {
      inconclusiveSampleZeroes += inconclusive.length;
      console.log(`  not observed in sample (not proof of unreachable): ${inconclusive.join(", ")}`);
    }
  }
  const provenButSampled = provenUnreachable.filter((id) => !absent.includes(id));
  if (provenButSampled.length) {
    unreachableFindings += provenButSampled.length;
    console.log(`  PROVEN UNREACHABLE (score upper bound): ${provenButSampled.join(", ")}`);
  }
}

function extractAttributes(tag) {
  return Object.fromEntries([...tag.matchAll(/([\w:-]+)\s*=\s*["']([^"']*)["']/g)].map(([, key, value]) => [key.toLowerCase(), value]));
}

function readRadioQuestions(page, prefix, questionCount) {
  const html = read(page);
  const questions = Array.from({ length: questionCount }, () => []);
  for (const tagMatch of html.matchAll(/<input\b[^>]*>/gi)) {
    const attributes = extractAttributes(tagMatch[0]);
    const match = attributes.name?.match(new RegExp(`^${prefix}(\\d+)$`));
    if (!match || !attributes.value) continue;
    questions[Number(match[1]) - 1]?.push(attributes.value.split(","));
  }
  return questions;
}

const animalQuestions = readRadioQuestions("ko/animal-test.html", "q", 10);
const app = read("assets/js/app.js");
const animalBlock = app.match(/const animalForm = document\.querySelector\("#animal-quiz"\);[\s\S]*?const profiles = \{([\s\S]*?)\n    \};/);
if (!animalBlock) throw new Error("Could not locate animal result profiles in app.js");
const animalIds = [...animalBlock[1].matchAll(/^\s{6}([a-z]+): \{/gm)].map((match) => match[1]);
tally("animal-test", animalQuestions, animalIds, (answers) => {
  const scores = Object.fromEntries(animalIds.map((id) => [id, 0]));
  answers.forEach((answer, index) => animalQuestions[index][answer].forEach((id) => { if (id in scores) scores[id] += 1; }));
  const high = Math.max(...Object.values(scores));
  return animalIds.filter((id) => scores[id] === high);
}, { randomTie: true, awardLists: animalQuestions });

const mbtiHtml = read("ko/mbti.html");
const mbtiQuestions = ["ei", "sn", "tf", "jp"].flatMap((axis) => Array.from({ length: 5 }, (_, index) => {
  const values = [...new Set([...mbtiHtml.matchAll(new RegExp(`<input\\b[^>]*name=["']${axis}${index + 1}["'][^>]*value=["']([^"']+)["']`, "gi"))].map((match) => match[1]))];
  if (values.length !== 2) throw new Error(`MBTI ${axis}${index + 1} should have two distinct answers`);
  return values;
}));
const mbtiIds = ["E", "I"].flatMap((ei) => ["S", "N"].flatMap((sn) => ["T", "F"].flatMap((tf) => ["J", "P"].map((jp) => ei + sn + tf + jp))));
tally("mbti", mbtiQuestions, mbtiIds, (answers) => {
  let offset = 0;
  let result = "";
  for (const [axisIndex, first] of ["E", "S", "T", "J"].entries()) {
    const axisAnswers = answers.slice(offset, offset + 5);
    const countFirst = axisAnswers.reduce((count, answer, index) => count + Number(mbtiQuestions[offset + index][answer] === first), 0);
    result += countFirst >= 3 ? first : ["I", "N", "F", "P"][axisIndex];
    offset += 5;
  }
  return [result];
});

for (const [id, config] of Object.entries(archetypes)) {
  const questions = config.questions.map((question) => question.choices);
  const resultIds = Object.keys(config.profiles);
  const unknownScores = new Set();
  for (const question of config.questions) for (const choice of question.choices) {
    for (const scoreId of choice.scores) if (!Object.hasOwn(config.profiles, scoreId)) unknownScores.add(scoreId);
  }
  if (unknownScores.size) throw new Error(`${id}: scoring references missing profiles: ${[...unknownScores].join(", ")}`);
  tally(id, questions, resultIds, (answers) => {
    const scores = Object.fromEntries(resultIds.map((resultId) => [resultId, 0]));
    answers.forEach((answer, questionIndex) => {
      for (const profileId of config.questions[questionIndex].choices[answer].scores) scores[profileId] += 1;
    });
    const high = Math.max(...Object.values(scores));
    return resultIds.filter((resultId) => scores[resultId] === high);
  }, { awardLists: config.questions.map((question) => question.choices.map((choice) => choice.scores)) });
}

console.log(`\nDistribution audit complete. Proven/exhaustive unreachable results: ${unreachableFindings}; inconclusive sampled zeroes: ${inconclusiveSampleZeroes}.`);
if (unreachableFindings) process.exitCode = 1;
