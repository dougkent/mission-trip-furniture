export interface SearchableStringFilterInput {
    ne?: string;
    gt?: string;
    lt?: string;
    gte?: string;
    lte?: string;
    eq?: string;
    match?: string;
    matchPhrase?: string;
    matchPhrasePrefix?: string;
    multiMatch?: string;
    exists?: Boolean;
    wildcard?: string;
    regexp?: string;
}
