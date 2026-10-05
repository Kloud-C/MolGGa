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
  "assets/js/travel-role-data.js",
  "assets/js/romance-style-data.js",
  "assets/js/fantasy-class-data.js",
  "assets/js/fantasy-shop-data.js",
  "assets/js/night-train-data.js",
  "assets/js/rest-style-data.js",
  "assets/js/hobby-discovery-data.js"
]) {
  vm.runInNewContext(read(file), runtime, { timeout: 1000, filename: file });
}

const archetypes = runtime.window.MOA_ARCHETYPE_TESTS;
const exactLimit = 2_000_000;
const sampleSize = 2_000_000;
let unreachableFindings = 0;
let inconclusiveSampleZeroes = 0;
let distributionFloorFindings = 0;
let distributionBalanceFindings = 0;
const minimumResultShare = 0.03;

function stableTieIndex(contentId, answerIndexes, candidateCount) {
  const pattern = `${contentId}:${Array.from(answerIndexes).join(",")}`;
  let hash = 0x811c9dc5;
  for (let index = 0; index < pattern.length; index += 1) {
    hash ^= pattern.charCodeAt(index);
    hash = Math.imul(hash, 0x01000193);
  }
  return (hash >>> 0) % candidateCount;
}

function tally(name, questions, resultIds, scoreAnswers, { awardLists, maxTieRate, minShare, maxShare } = {}) {
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
    const tieIndex = stableTieIndex(name, answers, winners.length);
    const winner = winners[tieIndex];
    counts.set(winner, (counts.get(winner) || 0) + 1);
  }

  const absent = [...counts].filter(([, count]) => count === 0).map(([id]) => id);
  let provenUnreachable = [];
  if (awardLists) {
    const pointsFor = (entries, resultId = null) => entries.reduce((total, entry) => {
      const id = typeof entry === "string" ? entry : entry.id;
      const weight = typeof entry === "string" ? 1 : Number(entry.weight);
      return total + (resultId === null || resultId === id ? weight : 0);
    }, 0);
    const minimumTotalPoints = awardLists.reduce((total, choices) => total + Math.min(...choices.map((entries) => pointsFor(entries))), 0);
    const minimumPossibleWinnerScore = Math.ceil(minimumTotalPoints / resultIds.length);
    provenUnreachable = resultIds.filter((id) => {
      const maximumScore = awardLists.reduce((total, choices) => total + Math.max(...choices.map((entries) => pointsFor(entries, id))), 0);
      return maximumScore < minimumPossibleWinnerScore;
    });
  }
  const mode = exact ? "exact" : `sample ${runs.toLocaleString("en-US")}`;
  console.log(`\n${name}: ${mode} · answer combinations ${total.toLocaleString("en-US")} · tied ${((tiedResponses / runs) * 100).toFixed(3)}% (ties resolved deterministically from the answer pattern)`);
  for (const [id, count] of counts) {
    console.log(`  ${id.padEnd(22)} ${(count / runs * 100).toFixed(3)}% (${count.toLocaleString("en-US")}/${runs.toLocaleString("en-US")})`);
  }
  const nonzeroShares = [...counts.values()].filter((count) => count > 0);
  if (nonzeroShares.length) console.log(`  observed range         ${(Math.min(...nonzeroShares) / runs * 100).toFixed(3)}%–${(Math.max(...nonzeroShares) / runs * 100).toFixed(3)}%`);
  const tieRate = tiedResponses / runs;
  if (Number.isFinite(maxTieRate) && tieRate > maxTieRate) {
    distributionBalanceFindings += 1;
    console.log(`  TIE RATE ABOVE LIMIT   ${(tieRate * 100).toFixed(3)}% > ${(maxTieRate * 100).toFixed(3)}%`);
  }
  if (Number.isFinite(minShare) && Number.isFinite(maxShare)) {
    for (const [id, count] of counts) {
      const share = count / runs;
      if (share < minShare || share > maxShare) {
        distributionBalanceFindings += 1;
        console.log(`  OUTSIDE BALANCE RANGE  ${id} ${(share * 100).toFixed(3)}% (expected ${(minShare * 100).toFixed(1)}%–${(maxShare * 100).toFixed(1)}%)`);
      }
    }
  }
  const belowMinimum = [...counts].filter(([, count]) => count / runs < minimumResultShare);
  if (belowMinimum.length) {
    distributionFloorFindings += belowMinimum.length;
    console.log(`  BELOW 3% FLOOR         ${belowMinimum.map(([id, count]) => `${id} ${(count / runs * 100).toFixed(3)}%`).join(", ")}`);
  }
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

const animalQuestions = readRadioQuestions("ko/animal-test.html", "q", 10)
  .map((choices) => choices.map((ids) => ids.map((id, index) => ({ id, weight: index === 0 ? 2 : 1 }))));
const app = read("assets/js/app.js");
const animalBlock = app.match(/const animalForm = document\.querySelector\("#animal-quiz"\);[\s\S]*?const profiles = \{([\s\S]*?)\n    \};/);
if (!animalBlock) throw new Error("Could not locate animal result profiles in app.js");
const animalIds = [...animalBlock[1].matchAll(/^\s{6}([a-z]+): \{/gm)].map((match) => match[1]);
tally("animal-test", animalQuestions, animalIds, (answers) => {
  const scores = Object.fromEntries(animalIds.map((id) => [id, 0]));
  answers.forEach((answer, index) => animalQuestions[index][answer].forEach(({ id, weight }) => { if (id in scores) scores[id] += weight; }));
  const high = Math.max(...Object.values(scores));
  return animalIds.filter((id) => scores[id] === high);
}, { awardLists: animalQuestions });

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
  const resultIds = Object.keys(config.profiles);
  const unknownScores = new Set();
  const opportunities = Object.fromEntries(resultIds.map((resultId) => [resultId, 0]));
  for (const question of config.questions) for (const choice of question.choices) {
    for (const entry of choice.scores) {
      const scoreId = typeof entry === "string" ? entry : entry.id;
      if (!Object.hasOwn(config.profiles, scoreId)) unknownScores.add(scoreId);
      if (typeof entry !== "string" && (!Number.isFinite(entry.weight) || entry.weight <= 0)) throw new Error(`${id}: invalid score weight for ${scoreId}`);
      opportunities[scoreId] += (typeof entry === "string" ? 1 : entry.weight) / question.choices.length;
    }
  }
  if (unknownScores.size) throw new Error(`${id}: scoring references missing profiles: ${[...unknownScores].join(", ")}`);
  const opportunityValues = Object.values(opportunities).filter((value) => value > 0);
  const averageOpportunity = opportunityValues.reduce((total, value) => total + value, 0) / opportunityValues.length;
  const scoreMultipliers = Object.fromEntries(Object.entries(opportunities).map(([resultId, value]) => [
    resultId,
    config.balanceResultExposure && value > 0 ? Math.round(1_000_000 * Math.pow(averageOpportunity / value, 0.95)) : 1
  ]));
  const questions = config.questions.map((question) => question.choices.map((choice) => choice.scores.map((entry) => {
    const scoreId = typeof entry === "string" ? entry : entry.id;
    const weight = typeof entry === "string" ? 1 : entry.weight;
    return { id: scoreId, weight: weight * scoreMultipliers[scoreId] };
  })));
  tally(id, questions, resultIds, (answers) => {
    const scores = Object.fromEntries(resultIds.map((resultId) => [resultId, 0]));
    answers.forEach((answer, questionIndex) => {
      for (const entry of questions[questionIndex][answer]) {
        scores[entry.id] += entry.weight;
      }
    });
    const high = Math.max(...Object.values(scores));
    return resultIds.filter((resultId) => scores[resultId] === high);
  }, {
    awardLists: questions,
    ...(id === "teto-egen" ? { maxTieRate: 0.05, minShare: 0.08, maxShare: 0.17 } : {})
  });
}

console.log(`\nDistribution audit complete. Below 3%: ${distributionFloorFindings}; distribution balance findings: ${distributionBalanceFindings}; proven/exhaustive unreachable results: ${unreachableFindings}; inconclusive sampled zeroes: ${inconclusiveSampleZeroes}.`);
if (unreachableFindings || distributionFloorFindings || distributionBalanceFindings) process.exitCode = 1;
