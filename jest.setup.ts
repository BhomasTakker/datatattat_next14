import "@testing-library/jest-dom";
import "./mock/mongo";
import "./mock/node-module-mock";
import "./mock/next";
import "./mock/next-auth";
import "./mock/at-proto";
import "./mock/services";

import { TextEncoder, TextDecoder } from "util";

Object.assign(global, { TextDecoder, TextEncoder });
