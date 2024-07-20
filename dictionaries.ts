import "server-only";

const dictionaries = {
    ko: () => import("./locales/ko.json").then((module) => module.default),
};

export const getDictionary = async (locale: "ko") =>
    dictionaries[locale]();