export interface IAutoCompleteOptions {
    showAsObject?: {
        KeyToSave: string | null
    };
    groupBy?: boolean;
    apiEndpoint?: URL;
    entriesPerPage?: number;
    searchAfterNthCharacter?: number;
    loadAfterPercentscrolled?: number;
}
