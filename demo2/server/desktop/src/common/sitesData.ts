export interface ISitesData {
    serverRelativeUrl: string;
    title: string;
    questions: IQuestionData[];
}

export interface IQuestionData {
    title?: string;
    answer?: string;
    id: number;
}
