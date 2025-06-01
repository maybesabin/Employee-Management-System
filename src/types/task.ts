export type Task = {
    title: string;
    description: string;
    date: string;
    isCompleted: boolean;
    userEmail: string;
    isFailed: null | true;
}