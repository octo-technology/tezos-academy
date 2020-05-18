import { data as pascalDataAddresses } from "../Chapters/Pascal/ChapterAddresses";
import { data as pascalDataBuiltIns } from "../Chapters/Pascal/ChapterBuiltIns";
import { data as pascalDataConditionals } from "../Chapters/Pascal/ChapterConditionals";
import { data as pascalDataFunctions } from "../Chapters/Pascal/ChapterFunctions";
import { data as pascalDataInteractions } from "../Chapters/Pascal/ChapterInteractions";
import { data as pascalDataLists } from "../Chapters/Pascal/ChapterLists";
import { data as pascalDataLoops } from "../Chapters/Pascal/ChapterLoops";
import { data as pascalDataMainFunction } from "../Chapters/Pascal/ChapterMainFunction";
import { data as pascalDataMaps } from "../Chapters/Pascal/ChapterMaps";
import { data as pascalDataMath } from "../Chapters/Pascal/ChapterMath";
import { data as pascalDataOption } from "../Chapters/Pascal/ChapterOption";
import { data as pascalDataRecords } from "../Chapters/Pascal/ChapterRecords";
import { data as pascalDataStrings } from "../Chapters/Pascal/ChapterStrings";
import { data as pascalDataTimestamps } from "../Chapters/Pascal/ChapterTimestamps";
import { data as pascalDataTransactions } from "../Chapters/Pascal/ChapterTransactions";
import { data as pascalDataTuples } from "../Chapters/Pascal/ChapterTuples";
import { data as pascalDataTypes } from "../Chapters/Pascal/ChapterTypes";
import { data as pascalDataVariables } from "../Chapters/Pascal/ChapterVariables";
import { data as pascalDataVariant } from "../Chapters/Pascal/ChapterVariant";

import { data as camelDataAddresses } from "../Chapters/Camel/ChapterAddresses";
import { data as camelDataBuiltIns } from "../Chapters/Camel/ChapterBuiltIns";
import { data as camelDataConditionals } from "../Chapters/Camel/ChapterConditionals";
import { data as camelDataFunctions } from "../Chapters/Camel/ChapterFunctions";
import { data as camelDataInteractions } from "../Chapters/Camel/ChapterInteractions";
import { data as camelDataLists } from "../Chapters/Camel/ChapterLists";
import { data as camelDataLoops } from "../Chapters/Camel/ChapterLoops";
import { data as camelDataMainFunction } from "../Chapters/Camel/ChapterMainFunction";
import { data as camelDataMaps } from "../Chapters/Camel/ChapterMaps";
import { data as camelDataMath } from "../Chapters/Camel/ChapterMath";
import { data as camelDataOption } from "../Chapters/Camel/ChapterOption";
import { data as camelDataRecords } from "../Chapters/Camel/ChapterRecords";
import { data as camelDataStrings } from "../Chapters/Camel/ChapterStrings";
import { data as camelDataTimestamps } from "../Chapters/Camel/ChapterTimestamps";
import { data as camelDataTransactions } from "../Chapters/Camel/ChapterTransactions";
import { data as camelDataTuples } from "../Chapters/Camel/ChapterTuples";
import { data as camelDataTypes } from "../Chapters/Camel/ChapterTypes";
import { data as camelDataVariables } from "../Chapters/Camel/ChapterVariables";
import { data as camelDataVariant } from "../Chapters/Camel/ChapterVariant";

import { data as reasonDataAddresses } from "../Chapters/Reason/ChapterAddresses";
import { data as reasonDataBuiltIns } from "../Chapters/Reason/ChapterBuiltIns";
import { data as reasonDataConditionals } from "../Chapters/Reason/ChapterConditionals";
import { data as reasonDataFunctions } from "../Chapters/Reason/ChapterFunctions";
import { data as reasonDataInteractions } from "../Chapters/Reason/ChapterInteractions";
import { data as reasonDataLists } from "../Chapters/Reason/ChapterLists";
import { data as reasonDataLoops } from "../Chapters/Reason/ChapterLoops";
import { data as reasonDataMainFunction } from "../Chapters/Reason/ChapterMainFunction";
import { data as reasonDataMaps } from "../Chapters/Reason/ChapterMaps";
import { data as reasonDataMath } from "../Chapters/Reason/ChapterMath";
import { data as reasonDataOption } from "../Chapters/Reason/ChapterOption";
import { data as reasonDataRecords } from "../Chapters/Reason/ChapterRecords";
import { data as reasonDataStrings } from "../Chapters/Reason/ChapterStrings";
import { data as reasonDataTimestamps } from "../Chapters/Reason/ChapterTimestamps";
import { data as reasonDataTransactions } from "../Chapters/Reason/ChapterTransactions";
import { data as reasonDataTuples } from "../Chapters/Reason/ChapterTuples";
import { data as reasonDataTypes } from "../Chapters/Reason/ChapterTypes";
import { data as reasonDataVariables } from "../Chapters/Reason/ChapterVariables";
import { data as reasonDataVariant } from "../Chapters/Reason/ChapterVariant";

export const chapterData = [
  {
    pathname: "/pascal/chapter-about",
    name: "1 - About",
    data: { course: undefined, exercise: undefined, solution: undefined },
  },
  { pathname: "/pascal/chapter-types", name: "2 - Types", data: pascalDataTypes },
  { pathname: "/pascal/chapter-variables", name: "3 - Variables", data: pascalDataVariables },
  { pathname: "/pascal/chapter-math", name: "4 - Math", data: pascalDataMath },
  { pathname: "/pascal/chapter-strings", name: "5 - Strings", data: pascalDataStrings },
  { pathname: "/pascal/chapter-functions", name: "6 - Functions", data: pascalDataFunctions },
  { pathname: "/pascal/chapter-conditionals", name: "7 - Conditionals", data: pascalDataConditionals },
  { pathname: "/pascal/chapter-tuples", name: "8 - Tuples", data: pascalDataTuples },
  { pathname: "/pascal/chapter-records", name: "9 - Records", data: pascalDataRecords },
  { pathname: "/pascal/chapter-maps", name: "10 - Maps", data: pascalDataMaps },
  { pathname: "/pascal/chapter-lists", name: "11 - Lists", data: pascalDataLists },
  { pathname: "/pascal/chapter-variants", name: "12 - Variants", data: pascalDataVariant },
  { pathname: "/pascal/chapter-main-function", name: "13 - Main function", data: pascalDataMainFunction },
  { pathname: "/pascal/chapter-loops", name: "14 - Loops", data: pascalDataLoops },
  { pathname: "/pascal/chapter-addresses", name: "15 - Addresses", data: pascalDataAddresses },
  { pathname: "/pascal/chapter-built-ins", name: "16 - Built-ins", data: pascalDataBuiltIns },
  { pathname: "/pascal/chapter-transactions", name: "17 - Transactions", data: pascalDataTransactions },
  { pathname: "/pascal/chapter-timestamps", name: "18 - Timestamps", data: pascalDataTimestamps },
  { pathname: "/pascal/chapter-option", name: "19 - Option", data: pascalDataOption },
  { pathname: "/pascal/chapter-interactions", name: "20 - Interactions", data: pascalDataInteractions },

  {
    pathname: "/camel/chapter-about",
    name: "1 - About",
    data: { course: undefined, exercise: undefined, solution: undefined },
  },
  { pathname: "/camel/chapter-types", name: "2 - Types", data: camelDataTypes },
  { pathname: "/camel/chapter-variables", name: "3 - variables", data: camelDataVariables },
  { pathname: "/camel/chapter-math", name: "4 - Math", data: camelDataMath },
  { pathname: "/camel/chapter-strings", name: "5 - Strings", data: camelDataStrings },
  { pathname: "/camel/chapter-functions", name: "6 - Functions", data: camelDataFunctions },
  { pathname: "/camel/chapter-conditionals", name: "7 - Conditionals", data: camelDataConditionals },
  { pathname: "/camel/chapter-tuples", name: "8 - Tuples", data: camelDataTuples },
  { pathname: "/camel/chapter-records", name: "9 - Records", data: camelDataRecords },
  { pathname: "/camel/chapter-maps", name: "10 - Maps", data: camelDataMaps },
  { pathname: "/camel/chapter-lists", name: "11 - Lists", data: camelDataLists },
  { pathname: "/camel/chapter-variants", name: "12 - Variants", data: camelDataVariant },
  { pathname: "/camel/chapter-main-function", name: "13 - Main function", data: camelDataMainFunction },
  { pathname: "/camel/chapter-loops", name: "14 - Loops", data: camelDataLoops },
  { pathname: "/camel/chapter-addresses", name: "15 - Addresses", data: camelDataAddresses },
  { pathname: "/camel/chapter-built-ins", name: "16 - Built-ins", data: camelDataBuiltIns },
  { pathname: "/camel/chapter-transactions", name: "17 - Transactions", data: camelDataTransactions },
  { pathname: "/camel/chapter-timestamps", name: "18 - Timestamps", data: camelDataTimestamps },
  { pathname: "/camel/chapter-option", name: "19 - Option", data: camelDataOption },
  { pathname: "/camel/chapter-interactions", name: "20 - Interactions", data: camelDataInteractions },

  {
    pathname: "/reason/chapter-about",
    name: "1 - About",
    data: { course: undefined, exercise: undefined, solution: undefined },
  },
  { pathname: "/reason/chapter-types", name: "2 - Types", data: reasonDataTypes },
  { pathname: "/reason/chapter-variables", name: "3 - variables", data: reasonDataVariables },
  { pathname: "/reason/chapter-math", name: "4 - Math", data: reasonDataMath },
  { pathname: "/reason/chapter-strings", name: "5 - Strings", data: reasonDataStrings },
  { pathname: "/reason/chapter-functions", name: "6 - Functions", data: reasonDataFunctions },
  { pathname: "/reason/chapter-conditionals", name: "7 - Conditionals", data: reasonDataConditionals },
  { pathname: "/reason/chapter-tuples", name: "8 - Tuples", data: reasonDataTuples },
  { pathname: "/reason/chapter-records", name: "9 - Records", data: reasonDataRecords },
  { pathname: "/reason/chapter-maps", name: "10 - Maps", data: reasonDataMaps },
  { pathname: "/reason/chapter-lists", name: "11 - Lists", data: reasonDataLists },
  { pathname: "/reason/chapter-variants", name: "12 - Variants", data: reasonDataVariant },
  { pathname: "/reason/chapter-main-function", name: "13 - Main function", data: reasonDataMainFunction },
  { pathname: "/reason/chapter-loops", name: "14 - Loops", data: reasonDataLoops },
  { pathname: "/reason/chapter-addresses", name: "15 - Addresses", data: reasonDataAddresses },
  { pathname: "/reason/chapter-built-ins", name: "16 - Built-ins", data: reasonDataBuiltIns },
  { pathname: "/reason/chapter-transactions", name: "17 - Transactions", data: reasonDataTransactions },
  { pathname: "/reason/chapter-timestamps", name: "18 - Timestamps", data: reasonDataTimestamps },
  { pathname: "/reason/chapter-option", name: "19 - Option", data: reasonDataOption },
  { pathname: "/reason/chapter-interactions", name: "20 - Interactions", data: reasonDataInteractions },
];
