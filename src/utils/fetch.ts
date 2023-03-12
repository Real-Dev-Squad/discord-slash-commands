import { RequestInfo, RequestInit } from "node-fetch";

const _importDynamic = new Function("modulePath", "return import(modulePath)");

export const fetch = async function (url: RequestInfo, init?: RequestInit) {
  const { default: fetch } = await _importDynamic("node-fetch");
  return fetch(url, init);
};
