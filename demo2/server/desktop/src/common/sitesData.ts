export interface ISitesData {
    serverRelativeUrl: string;
    title: string;
    id: string;
    questions: IQuestionData[];
}

export interface IQuestionData {
    title?: string;
    answer?: string;
    id: number;
}
