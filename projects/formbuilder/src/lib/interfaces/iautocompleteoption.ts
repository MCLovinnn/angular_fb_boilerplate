export interface IAutoCompleteOptions {
    showAsObject?: {
        KeyToSave: string | null
    };
    groupBy?: boolean;
    technical?: boolean;
    apiEndpoint?: URL;
    entriesPerPage?: number;
    searchAfterNthCharacter?: number;
    loadAfterPercentscrolled?: number;
}
