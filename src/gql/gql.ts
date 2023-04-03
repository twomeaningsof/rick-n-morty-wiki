/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel-plugin for production.
 */
const documents = {
    "\n  fragment CharacterCard_CardFragment on Character {\n    id\n    image\n    name\n    status\n  }\n": types.CharacterCard_CardFragmentFragmentDoc,
    "\n  fragment EpisodeCard_CardFragment on Episode {\n    id\n    name\n    air_date\n    episode\n  }\n": types.EpisodeCard_CardFragmentFragmentDoc,
    "\n  fragment CharactersList_QueryFragment on Characters {\n    info {\n      next\n    }\n    results {\n      id\n      ...CharacterCard_CardFragment\n    }\n  }\n": types.CharactersList_QueryFragmentFragmentDoc,
    "\n  fragment EpisodesList_QueryFragment on Episodes {\n    info {\n      next\n    }\n    results {\n      id\n      ...EpisodeCard_CardFragment\n    }\n  }\n": types.EpisodesList_QueryFragmentFragmentDoc,
    "\n  query GetCharacter_Query($id: ID!) {\n    character(id: $id) {\n      id\n      name\n      status\n      species\n      gender\n      location {\n        id\n        name\n      }\n      image\n      episode {\n        id\n        name\n        episode\n      }\n    }\n  }\n": types.GetCharacter_QueryDocument,
    "\n  query GetCharacters_Query($page: Int, $name: String, $gender: String, $status: String) {\n    characters(page: $page, filter: { name: $name, gender: $gender, status: $status }) {\n      info {\n        pages\n        next\n      }\n      results {\n        id\n      }\n      ...CharactersList_QueryFragment\n    }\n  }\n": types.GetCharacters_QueryDocument,
    "\n  query GetEpisode_Query($id: ID!) {\n    episode(id: $id) {\n      id\n      name\n      air_date\n      episode\n      characters {\n        ...CharacterCard_CardFragment\n      }\n    }\n  }\n": types.GetEpisode_QueryDocument,
    "\n  query GetEpisodes_Query($page: Int, $name: String) {\n    episodes(page: $page, filter: { name: $name }) {\n      info {\n        count\n        pages\n        next\n      }\n      results {\n        id\n      }\n      ...EpisodesList_QueryFragment\n    }\n  }\n": types.GetEpisodes_QueryDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment CharacterCard_CardFragment on Character {\n    id\n    image\n    name\n    status\n  }\n"): (typeof documents)["\n  fragment CharacterCard_CardFragment on Character {\n    id\n    image\n    name\n    status\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment EpisodeCard_CardFragment on Episode {\n    id\n    name\n    air_date\n    episode\n  }\n"): (typeof documents)["\n  fragment EpisodeCard_CardFragment on Episode {\n    id\n    name\n    air_date\n    episode\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment CharactersList_QueryFragment on Characters {\n    info {\n      next\n    }\n    results {\n      id\n      ...CharacterCard_CardFragment\n    }\n  }\n"): (typeof documents)["\n  fragment CharactersList_QueryFragment on Characters {\n    info {\n      next\n    }\n    results {\n      id\n      ...CharacterCard_CardFragment\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment EpisodesList_QueryFragment on Episodes {\n    info {\n      next\n    }\n    results {\n      id\n      ...EpisodeCard_CardFragment\n    }\n  }\n"): (typeof documents)["\n  fragment EpisodesList_QueryFragment on Episodes {\n    info {\n      next\n    }\n    results {\n      id\n      ...EpisodeCard_CardFragment\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetCharacter_Query($id: ID!) {\n    character(id: $id) {\n      id\n      name\n      status\n      species\n      gender\n      location {\n        id\n        name\n      }\n      image\n      episode {\n        id\n        name\n        episode\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetCharacter_Query($id: ID!) {\n    character(id: $id) {\n      id\n      name\n      status\n      species\n      gender\n      location {\n        id\n        name\n      }\n      image\n      episode {\n        id\n        name\n        episode\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetCharacters_Query($page: Int, $name: String, $gender: String, $status: String) {\n    characters(page: $page, filter: { name: $name, gender: $gender, status: $status }) {\n      info {\n        pages\n        next\n      }\n      results {\n        id\n      }\n      ...CharactersList_QueryFragment\n    }\n  }\n"): (typeof documents)["\n  query GetCharacters_Query($page: Int, $name: String, $gender: String, $status: String) {\n    characters(page: $page, filter: { name: $name, gender: $gender, status: $status }) {\n      info {\n        pages\n        next\n      }\n      results {\n        id\n      }\n      ...CharactersList_QueryFragment\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetEpisode_Query($id: ID!) {\n    episode(id: $id) {\n      id\n      name\n      air_date\n      episode\n      characters {\n        ...CharacterCard_CardFragment\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetEpisode_Query($id: ID!) {\n    episode(id: $id) {\n      id\n      name\n      air_date\n      episode\n      characters {\n        ...CharacterCard_CardFragment\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetEpisodes_Query($page: Int, $name: String) {\n    episodes(page: $page, filter: { name: $name }) {\n      info {\n        count\n        pages\n        next\n      }\n      results {\n        id\n      }\n      ...EpisodesList_QueryFragment\n    }\n  }\n"): (typeof documents)["\n  query GetEpisodes_Query($page: Int, $name: String) {\n    episodes(page: $page, filter: { name: $name }) {\n      info {\n        count\n        pages\n        next\n      }\n      results {\n        id\n      }\n      ...EpisodesList_QueryFragment\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;