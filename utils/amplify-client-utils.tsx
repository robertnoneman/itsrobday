"use client";

import outputs from "@/amplify_outputs.json";
import { Amplify } from "aws-amplify";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";

Amplify.configure(outputs);

// Amplify.configure({
//   API: {
//     GraphQL: {
//       endpoint: 'https://sab3y5oosvhr3k727zy4uid6n4.appsync-api.us-east-1.amazonaws.com/graphql',
//       region: 'us-east-1',
//       defaultAuthMode: 'apiKey',
//       apiKey: 'da2-njctzdtuwvb23e2fwp2qk5srta'
//     }
//   }
// });

export const client = generateClient<Schema>();