/**
 * Add the schema to the schema index file
 */
import { AnswersType } from ".";
import { injectLine } from "../utils/inject-line";
import { prettierFile } from "../utils/prettier-file";
import { formatName } from "./format-name";
import { write } from "./get-args";
import { getPageQuerySnippet } from "./templates/page-query";

const fs = require("fs");

export function injectPageQuery(answers: Pick<AnswersType, "dialogName">) {
  let { schemaName } = formatName(answers.dialogName);

  const filePath = `${__dirname}/../../queries/page.query.ts`;
  let lines = fs.readFileSync(filePath).toString().split("\n");

  let needle = "dialogs {";

  lines = injectLine({
    addition: getPageQuerySnippet({ schemaName }),
    lines,
    needle,
    offset: 1,
  });

  lines = lines.join("\n");

  if (write) {
    fs.writeFileSync(filePath, lines);
    prettierFile(filePath);
  }
  return lines;
}
